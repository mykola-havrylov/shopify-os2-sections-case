// Creates or updates the demo catalog in the store: products and variants from data/products.csv, their images
// from data/images/, the automated collections, and the hero images in Content > Files.
//
// Usage:
//   node scripts/seed-catalog.js --dry-run        offline checks only, no credentials needed
//   node scripts/seed-catalog.js                  write to the store (reads .env)
// Options:
//   --only <handle>   one product (no collections, no hero files)
//   --skip-images     products and collections only
import { parseArgs } from 'node:util';
import { COLLECTIONS, loadImagePlan, loadProducts } from './src/catalog.js';
import { createClient, loadConfig } from './src/client.js';
import { loadEnv } from './src/env.js';
import { checkImages, readImage, validateImage } from './src/images.js';
import { syncFiles, syncProductImages } from './src/media.js';
import { ensureCollection, findOnlineStorePublication, saveProduct } from './src/store.js';

const { values: args } = parseArgs({
  options: {
    'dry-run': { type: 'boolean', default: false },
    'skip-images': { type: 'boolean', default: false },
    only: { type: 'string' },
  },
});

/** Every variant has exactly one planned image and every planned product image belongs to a variant. */
function planProblems(products, plan) {
  const problems = [];
  const productEntries = plan.filter(({ kind }) => kind === 'product');
  const skus = new Set(products.flatMap(({ variants }) => variants.map(({ sku }) => sku)));
  for (const sku of skus) {
    const count = productEntries.filter((entry) => entry.sku === sku).length;
    if (count !== 1) problems.push(`SKU ${sku}: ${count} planned images, expected 1`);
  }
  for (const entry of productEntries) {
    if (!skus.has(entry.sku)) problems.push(`${entry.filename}: SKU ${entry.sku} is not in products.csv`);
  }
  return problems;
}

const printRows = (rows) => {
  for (const { name, status, note } of rows) console.log(`  ${name.padEnd(28)} ${status}${note ? `  (${note})` : ''}`);
};

async function main() {
  let products = await loadProducts();
  const plan = await loadImagePlan();
  if (args.only) {
    products = products.filter(({ handle }) => handle === args.only);
    if (products.length === 0) throw new Error(`No product with handle "${args.only}" in products.csv.`);
  }

  const variantCount = products.reduce((sum, { variants }) => sum + variants.length, 0);
  console.log(`Catalog: ${products.length} products, ${variantCount} variants, ${COLLECTIONS.length} collections.`);

  const consistency = planProblems(products, args.only ? plan.filter((e) => e.handle === args.only) : plan);
  const images = await checkImages(plan);
  console.log(`Images: ${images.present}/${plan.length} present in data/images/.`);
  for (const problem of [...consistency, ...images.problems]) console.log(`  - ${problem}`);
  for (const name of images.unexpected) console.log(`  - unexpected file: ${name}`);

  if (args['dry-run']) {
    const ok = consistency.length === 0 && images.problems.length === 0 && images.unexpected.length === 0;
    console.log(ok ? 'Dry run: everything is ready to seed.' : 'Dry run: fix the problems above before seeding.');
    process.exitCode = ok ? 0 : 1;
    return;
  }
  if (consistency.length > 0) throw new Error('products.csv and prompts.json do not match; see above.');

  loadEnv();
  const client = createClient(loadConfig());
  const publicationId = await findOnlineStorePublication(client);
  const results = [];

  console.log('\nProducts:');
  for (const product of products) {
    const saved = await saveProduct(client, product, publicationId);
    const row = { name: product.handle, status: saved.status };

    if (!args['skip-images']) {
      const entries = plan.filter((entry) => entry.kind === 'product' && entry.handle === product.handle);
      const fileProblems = [];
      for (const entry of entries) {
        const bytes = await readImage(entry.filename).catch(() => null);
        fileProblems.push(...validateImage(entry, bytes));
      }
      if (fileProblems.length > 0) {
        row.status += ', images skipped';
        row.note = fileProblems.join('; ');
      } else {
        const media = await syncProductImages({ client, handle: product.handle, entries, readImage });
        row.status += `, images ${media.status}`;
        row.note = media.note;
      }
    }
    results.push(row);
    printRows([row]);
  }

  if (!args.only) {
    console.log('\nCollections:');
    for (const collection of COLLECTIONS) {
      const { status } = await ensureCollection(client, collection, publicationId);
      const row = { name: collection.handle, status };
      results.push(row);
      printRows([row]);
    }

    if (!args['skip-images']) {
      console.log('\nFiles:');
      const entries = plan.filter(({ kind }) => kind !== 'product');
      const ready = [];
      for (const entry of entries) {
        const bytes = await readImage(entry.filename).catch(() => null);
        const problems = validateImage(entry, bytes);
        if (problems.length === 0) ready.push(entry);
        else printRows([{ name: entry.filename, status: 'skipped', note: problems.join('; ') }]);
      }
      const files = await syncFiles({ client, entries: ready, readImage });
      printRows(files.map(({ filename, status }) => ({ name: filename, status })));
    }
  }

  const unfinished = results.filter(({ status }) => /skipped|failed|processing/.test(status));
  console.log(
    unfinished.length === 0
      ? '\nDone. Run npm run catalog:verify.'
      : `\nDone with ${unfinished.length} unfinished item(s); run the seed again once they are fixed.`,
  );
  process.exitCode = unfinished.length === 0 ? 0 : 1;
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
