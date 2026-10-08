// Idempotent image upload. Product images are matched by alt text: an image with the planned alt that is not FAILED
// counts as present. Missing images go stagedUploadsCreate -> PUT -> productUpdate(media), then each variant is
// pointed at its image with productVariantsBulkUpdate once the media is READY.
// Hero images go to Content > Files with fileCreate, matched by file name.
import { assertNoUserErrors } from './user-errors.js';

const PRODUCT_MEDIA = `#graphql
  query ProductMedia($handle: String!) {
    productByIdentifier(identifier: { handle: $handle }) {
      id
      media(first: 50) {
        nodes {
          id
          alt
          status
          mediaContentType
        }
      }
      variants(first: 50) {
        nodes {
          id
          sku
          media(first: 1) {
            nodes {
              id
            }
          }
        }
      }
    }
  }
`;

const STAGED_UPLOAD = `#graphql
  mutation StagedUpload($input: [StagedUploadInput!]!) {
    stagedUploadsCreate(input: $input) {
      stagedTargets {
        url
        resourceUrl
        parameters {
          name
          value
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const ATTACH_MEDIA = `#graphql
  mutation AttachMedia($product: ProductUpdateInput!, $media: [CreateMediaInput!]) {
    productUpdate(product: $product, media: $media) {
      product {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const SET_VARIANT_MEDIA = `#graphql
  mutation SetVariantMedia($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
    productVariantsBulkUpdate(productId: $productId, variants: $variants) {
      userErrors {
        field
        message
      }
    }
  }
`;

const DELETE_FILES = `#graphql
  mutation DeleteFiles($fileIds: [ID!]!) {
    fileDelete(fileIds: $fileIds) {
      deletedFileIds
      userErrors {
        field
        message
      }
    }
  }
`;

const FILES = `#graphql
  query Files($after: String) {
    files(first: 100, after: $after) {
      nodes {
        ... on MediaImage {
          id
          alt
          fileStatus
          image {
            url
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const CREATE_FILES = `#graphql
  mutation CreateFiles($files: [FileCreateInput!]!) {
    fileCreate(files: $files) {
      files {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const defaultSleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Uploads the files to staged targets and returns their resource URLs, in order. */
async function stageFiles(client, files, fetchImpl) {
  const { stagedUploadsCreate } = await client.graphql(STAGED_UPLOAD, {
    input: files.map(({ filename }) => ({ filename, mimeType: 'image/jpeg', resource: 'IMAGE', httpMethod: 'PUT' })),
  });
  assertNoUserErrors('Preparing the uploads', stagedUploadsCreate.userErrors);

  const urls = [];
  for (const [index, target] of stagedUploadsCreate.stagedTargets.entries()) {
    // The returned parameters are sent as headers, as the PUT upload requires.
    const headers = Object.fromEntries(target.parameters.map(({ name, value }) => [name, value]));
    const response = await fetchImpl(target.url, { method: 'PUT', headers, body: files[index].bytes });
    if (!response.ok) {
      throw new Error(`Uploading ${files[index].filename} failed with HTTP ${response.status}.`);
    }
    urls.push(target.resourceUrl);
  }
  return urls;
}

const imagesOf = (product) => product.media.nodes.filter(({ mediaContentType }) => mediaContentType === 'IMAGE');

/**
 * Makes the product's images match the plan and points every variant at its image.
 * @param {object[]} entries  image plan entries for this product (filename, alt, sku)
 * @returns {Promise<{status: string, note?: string}>}
 *   statuses: missing-product, uploaded, unchanged, processing, failed
 */
export async function syncProductImages({
  client,
  handle,
  entries,
  readImage,
  fetchImpl = fetch,
  sleep = defaultSleep,
  attempts = 20,
  delayMs = 3000,
}) {
  let { productByIdentifier: product } = await client.graphql(PRODUCT_MEDIA, { handle });
  if (!product) return { status: 'missing-product' };

  // A FAILED image is never worth keeping; it is removed and uploaded again.
  const failed = imagesOf(product).filter(
    ({ status, alt }) => status === 'FAILED' && entries.some((entry) => entry.alt === alt),
  );
  if (failed.length > 0) {
    const { fileDelete } = await client.graphql(DELETE_FILES, { fileIds: failed.map(({ id }) => id) });
    assertNoUserErrors(`Deleting failed images of "${handle}"`, fileDelete.userErrors);
  }

  const present = new Set(
    imagesOf(product)
      .filter(({ status }) => status !== 'FAILED')
      .map(({ alt }) => alt),
  );
  const missing = entries.filter(({ alt }) => !present.has(alt));

  if (missing.length > 0) {
    const files = [];
    for (const entry of missing) files.push({ filename: entry.filename, bytes: await readImage(entry.filename) });
    const urls = await stageFiles(client, files, fetchImpl);
    const { productUpdate } = await client.graphql(ATTACH_MEDIA, {
      product: { id: product.id },
      media: missing.map((entry, index) => ({
        originalSource: urls[index],
        alt: entry.alt,
        mediaContentType: 'IMAGE',
      })),
    });
    assertNoUserErrors(`Attaching images to "${handle}"`, productUpdate.userErrors);
  }

  // Variants can only reference media that is READY, so wait for processing.
  const byAlt = new Map();
  for (let attempt = 1; ; attempt += 1) {
    ({ productByIdentifier: product } = await client.graphql(PRODUCT_MEDIA, { handle }));
    byAlt.clear();
    for (const media of imagesOf(product))
      if (media.status !== 'FAILED' || !byAlt.has(media.alt)) byAlt.set(media.alt, media);

    const states = entries.map(({ alt }) => byAlt.get(alt)?.status);
    if (states.some((state) => state === 'FAILED')) {
      return { status: 'failed', note: 'Shopify could not process an image; the next run uploads it again' };
    }
    if (states.every((state) => state === 'READY')) break;
    if (attempt === attempts) return { status: 'processing', note: 'still processing; run the seed again later' };
    await sleep(delayMs);
  }

  const updates = [];
  for (const entry of entries) {
    const variant = product.variants.nodes.find(({ sku }) => sku === entry.sku);
    if (!variant) throw new Error(`"${handle}" has no variant with SKU ${entry.sku}.`);
    const mediaId = byAlt.get(entry.alt).id;
    if (variant.media.nodes[0]?.id !== mediaId) updates.push({ id: variant.id, mediaId });
  }
  if (updates.length > 0) {
    const { productVariantsBulkUpdate } = await client.graphql(SET_VARIANT_MEDIA, {
      productId: product.id,
      variants: updates,
    });
    assertNoUserErrors(`Linking variant images of "${handle}"`, productVariantsBulkUpdate.userErrors);
  }

  return { status: missing.length > 0 || updates.length > 0 ? 'uploaded' : 'unchanged' };
}

const fileNameOf = (url) => {
  try {
    return decodeURIComponent(new URL(url).pathname.split('/').pop());
  } catch {
    return null;
  }
};

/** All image files in Content > Files, keyed by file name. */
export async function listFiles(client) {
  const byName = new Map();
  let after = null;
  do {
    const { files } = await client.graphql(FILES, { after });
    for (const file of files.nodes) {
      const name = file.image?.url ? fileNameOf(file.image.url) : null;
      if (name) byName.set(name, file);
    }
    after = files.pageInfo.hasNextPage ? files.pageInfo.endCursor : null;
  } while (after);
  return byName;
}

/**
 * Uploads images that are not in a product (the hero images) to Content > Files, once.
 * @returns {Promise<Array<{filename: string, status: 'exists'|'uploaded'}>>}
 */
export async function syncFiles({ client, entries, readImage, fetchImpl = fetch }) {
  const existing = await listFiles(client);
  const missing = entries.filter(({ filename }) => existing.get(filename)?.fileStatus !== 'READY');
  const results = entries
    .filter((entry) => !missing.includes(entry))
    .map(({ filename }) => ({ filename, status: 'exists' }));
  if (missing.length === 0) return results;

  const files = [];
  for (const entry of missing) files.push({ filename: entry.filename, bytes: await readImage(entry.filename) });
  const urls = await stageFiles(client, files, fetchImpl);
  const { fileCreate } = await client.graphql(CREATE_FILES, {
    files: missing.map((entry, index) => ({
      originalSource: urls[index],
      filename: entry.filename,
      alt: entry.alt,
      contentType: 'IMAGE',
      duplicateResolutionMode: 'REPLACE',
    })),
  });
  assertNoUserErrors('Creating files', fileCreate.userErrors);
  return [...results, ...missing.map(({ filename }) => ({ filename, status: 'uploaded' }))];
}
