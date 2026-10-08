// Reads the demo catalog: products from data/products.csv (Shopify product CSV layout), the image plan from
// data/images/prompts.json and the automated collections defined below.
import { readFile } from 'node:fs/promises';

export const PRODUCTS_CSV = 'data/products.csv';
export const PROMPTS_JSON = 'data/images/prompts.json';
export const IMAGES_DIR = 'data/images';

/** Automated collections; conditions match the product type or tag set in products.csv. */
export const COLLECTIONS = [
  { handle: 'mugs', title: 'Mugs', column: 'TYPE', condition: 'Mug', description: 'Mugs and cups for every day.' },
  {
    handle: 'bowls',
    title: 'Bowls',
    column: 'TYPE',
    condition: 'Bowl',
    description: 'Bowls for breakfast, pasta and the table.',
  },
  { handle: 'plates', title: 'Plates', column: 'TYPE', condition: 'Plate', description: 'Plates, platters and sets.' },
  { handle: 'vases', title: 'Vases', column: 'TYPE', condition: 'Vase', description: 'Vases and small pots.' },
  {
    handle: 'new-arrivals',
    title: 'New arrivals',
    column: 'TAG',
    condition: 'new',
    description: 'The latest pieces from the studio.',
  },
];

/** RFC 4180 CSV: quoted fields, doubled quotes, commas and newlines inside quotes. */
export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') {
        field += '"';
        i += 1;
      } else if (char === '"') quoted = false;
      else field += char;
    } else if (char === '"') quoted = true;
    else if (char === ',') {
      row.push(field);
      field = '';
    } else if (char === '\n' || char === '\r') {
      if (char === '\r' && text[i + 1] === '\n') i += 1;
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else field += char;
  }
  if (field !== '' || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  const [header, ...records] = rows;
  return records
    .filter((record) => record.some((value) => value !== ''))
    .map((record) => {
      if (record.length !== header.length) {
        throw new Error(`CSV row has ${record.length} fields, the header has ${header.length}.`);
      }
      return Object.fromEntries(header.map((name, index) => [name, record[index]]));
    });
}

const bool = (value) => value.trim().toUpperCase() === 'TRUE';

/**
 * Groups CSV rows into products. The first row of a product carries the product fields; every row is a variant.
 * @returns {object[]} products with `variants`
 */
export function productsFromRows(rows) {
  const products = [];
  let current = null;

  for (const row of rows) {
    const handle = row['URL handle'];
    if (!handle) throw new Error('A CSV row has no URL handle.');

    if (row['Title']) {
      current = {
        handle,
        title: row['Title'],
        descriptionHtml: row['Description'],
        vendor: row['Vendor'],
        productType: row['Type'],
        tags: row['Tags']
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
        status: row['Status'].toUpperCase(),
        published: bool(row['Published on online store']),
        seo: { title: row['SEO title'], description: row['SEO description'] },
        optionName: row['Option1 name'],
        variants: [],
      };
      products.push(current);
    } else if (current?.handle !== handle) {
      throw new Error(`Variant row for "${handle}" does not follow its product row.`);
    }

    current.variants.push({
      optionValue: row['Option1 value'],
      sku: row['SKU'],
      price: row['Price'],
      taxable: bool(row['Charge tax']),
      tracked: row['Inventory tracker'].trim() !== '',
      requiresShipping: bool(row['Requires shipping']),
      grams: Number(row['Weight value (grams)']),
    });
  }
  return products;
}

export async function loadProducts(path = PRODUCTS_CSV) {
  return productsFromRows(parseCsv(await readFile(path, 'utf8')));
}

/** The image plan: one entry per variant image plus the hero images. */
export async function loadImagePlan(path = PROMPTS_JSON) {
  const { images } = JSON.parse(await readFile(path, 'utf8'));
  return images;
}

/** Handles a collection is expected to contain, from the CSV. */
export function expectedMembers(collection, products) {
  return products
    .filter((product) =>
      collection.column === 'TYPE'
        ? product.productType === collection.condition
        : product.tags.includes(collection.condition),
    )
    .map(({ handle }) => handle);
}
