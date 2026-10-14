// Idempotent writes for products and collections. Products are saved with productSet keyed by handle,
// collections are looked up by handle before they are created, and both are published to the Online Store.
import { assertNoUserErrors } from './user-errors.js';

const ONLINE_STORE = 'Online Store';

// The catalog title of the Online Store publication looks like "Channel Catalog 123 for Online Store".
const isOnlineStore = (title) => title === ONLINE_STORE || (title ?? '').endsWith(` for ${ONLINE_STORE}`);

const PUBLICATIONS = `#graphql
  query Publications {
    publications(first: 20) {
      nodes {
        id
        catalog {
          title
        }
      }
    }
  }
`;

const PRODUCT_SET = `#graphql
  mutation SaveProduct($input: ProductSetInput!, $identifier: ProductSetIdentifiers) {
    productSet(input: $input, identifier: $identifier, synchronous: true) {
      product {
        id
        handle
      }
      userErrors {
        field
        message
        code
      }
    }
  }
`;

const PRODUCT_BY_HANDLE = `#graphql
  query ProductByHandle($handle: String!) {
    productByIdentifier(identifier: { handle: $handle }) {
      id
    }
  }
`;

const COLLECTION_BY_HANDLE = `#graphql
  query CollectionByHandle($handle: String!) {
    collectionByIdentifier(identifier: { handle: $handle }) {
      id
    }
  }
`;

const CREATE_COLLECTION = `#graphql
  mutation CreateCollection($collection: CollectionCreateInput!) {
    collectionCreate(collection: $collection) {
      collection {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const IS_PUBLISHED = `#graphql
  query IsPublished($id: ID!, $publicationId: ID!) {
    node(id: $id) {
      ... on Product {
        publishedOnPublication(publicationId: $publicationId)
      }
      ... on Collection {
        publishedOnPublication(publicationId: $publicationId)
      }
    }
  }
`;

const PUBLISH = `#graphql
  mutation Publish($id: ID!, $publicationId: ID!) {
    publishablePublish(id: $id, input: [{ publicationId: $publicationId }]) {
      userErrors {
        field
        message
      }
    }
  }
`;

export async function findOnlineStorePublication(client) {
  const { publications } = await client.graphql(PUBLICATIONS);
  const found = publications.nodes.find(({ catalog }) => isOnlineStore(catalog?.title));
  if (!found) throw new Error(`No "${ONLINE_STORE}" publication found. Check the write_publications scope.`);
  return found.id;
}

/** Publishes a product or collection unless it already is. Returns true when it was published now. */
export async function publish(client, id, publicationId) {
  const { node } = await client.graphql(IS_PUBLISHED, { id, publicationId });
  if (node?.publishedOnPublication) return false;
  const { publishablePublish } = await client.graphql(PUBLISH, { id, publicationId });
  assertNoUserErrors(`Publishing ${id}`, publishablePublish.userErrors);
  return true;
}

/** productSet input for one product from products.csv. */
export function productSetInput(product) {
  return {
    handle: product.handle,
    title: product.title,
    descriptionHtml: product.descriptionHtml,
    vendor: product.vendor,
    productType: product.productType,
    tags: product.tags,
    status: product.status,
    seo: product.seo,
    productOptions: [
      {
        name: product.optionName,
        position: 1,
        values: product.variants.map(({ optionValue }) => ({ name: optionValue })),
      },
    ],
    variants: product.variants.map((variant, index) => ({
      position: index + 1,
      optionValues: [{ optionName: product.optionName, name: variant.optionValue }],
      sku: variant.sku,
      price: variant.price,
      taxable: variant.taxable,
      inventoryPolicy: 'DENY',
      inventoryItem: {
        tracked: variant.tracked,
        requiresShipping: variant.requiresShipping,
        measurement: { weight: { value: variant.grams, unit: 'GRAMS' } },
      },
    })),
  };
}

/** Creates or updates one product and publishes it when the CSV says so. */
export async function saveProduct(client, product, publicationId) {
  const { productByIdentifier: existing } = await client.graphql(PRODUCT_BY_HANDLE, { handle: product.handle });
  const { productSet } = await client.graphql(PRODUCT_SET, {
    input: productSetInput(product),
    identifier: { handle: product.handle },
  });
  assertNoUserErrors(`Saving product "${product.handle}"`, productSet.userErrors);

  const published = product.published ? await publish(client, productSet.product.id, publicationId) : false;
  return { id: productSet.product.id, status: existing ? 'updated' : 'created', published };
}

/**
 * One conditions source: product type equals, or product tagged with, the collection's condition.
 * Uses the collections model with sources; the legacy ruleSet input is deprecated.
 * https://shopify.dev/docs/apps/build/product-merchandising/products-and-collections/use-new-collections-model
 */
export function collectionSource(collection) {
  const condition =
    collection.column === 'TYPE'
      ? { productType: { relation: 'EQUALS', values: [collection.condition], matchType: 'ANY' } }
      : { productTag: { relation: 'TAGGED_WITH', values: [collection.condition], matchType: 'ANY' } };
  return {
    source: {
      title: collection.title,
      targetType: 'PRODUCTS',
      inclusion: { matchType: 'ALL', conditions: [condition] },
    },
  };
}

/** Creates an automated collection when no collection with the handle exists, then publishes it. */
export async function ensureCollection(client, collection, publicationId) {
  const { collectionByIdentifier: existing } = await client.graphql(COLLECTION_BY_HANDLE, {
    handle: collection.handle,
  });
  let id = existing?.id;

  if (!id) {
    const { collectionCreate } = await client.graphql(CREATE_COLLECTION, {
      collection: {
        handle: collection.handle,
        title: collection.title,
        descriptionHtml: `<p>${collection.description}</p>`,
        sources: [collectionSource(collection)],
      },
    });
    assertNoUserErrors(`Creating collection "${collection.handle}"`, collectionCreate.userErrors);
    id = collectionCreate.collection.id;
  }

  const published = await publish(client, id, publicationId);
  return { id, status: existing ? 'exists' : 'created', published };
}
