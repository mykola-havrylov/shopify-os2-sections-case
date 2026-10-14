# Demo catalog

A fictional store, **Hearth & Clay**: hand-made stoneware mugs, bowls, plates and vases.

[`products.csv`](products.csv) follows the column layout of Shopify's
[sample product CSV](https://help.shopify.com/csv/product_template.csv) (61 columns, same names and order). It is the single source of the catalog: `scripts/seed-catalog.js` creates the
products, images and collections from it through the Admin API (see [Loading the catalog](#loading-the-catalog)), and the
same file can be imported by hand through Products → Import.

## Brand

Hearth & Clay is a small studio making everyday stoneware: matte glazes in three colours, forms that stack, and
nothing decorative that gets in the way of use. The tone is calm and plain: short sentences, no superlatives.

## Products

14 products, 28 variants. Prices in the store currency, Status `Active`, published to the online store.

| Type  | Products                                                             | Options                      |
| ----- | -------------------------------------------------------------------- | ---------------------------- |
| Mug   | Stoneware Mug, Espresso Cup Pair, Tall Latte Mug, Handleless Tea Cup | Glaze (Oat, Moss, Charcoal)  |
| Bowl  | Pasta Bowl, Cereal Bowl, Serving Bowl                                | Glaze, or Size for the large |
| Plate | Dinner Plate, Side Plate, Serving Platter, Four-Piece Dinner Set     | Glaze                        |
| Vase  | Bud Vase, Ridge Vase, Pinch Pot                                      | Glaze, or Height             |

Products with one variant use `Title` / `Default Title`, as Shopify's own exports do. Tag `new` is set on four
products (Stoneware Mug, Handleless Tea Cup, Side Plate, Ridge Vase).

**Inventory is not tracked.** `Inventory tracker` is blank for every variant, so no variant can show "Sold out" in the
demo. After import, check one variant of each product: Inventory → "Track quantity" must be off.

**Not filled on purpose:** product images and alt text (added by hand), `Product category` (taxonomy values are
chosen in the admin), and the Google Shopping columns.

## Collections

Automated collections, created by the seed script.

| Collection   | Handle         | Condition                        |
| ------------ | -------------- | -------------------------------- |
| Mugs         | `mugs`         | Product type is equal to `Mug`   |
| Bowls        | `bowls`        | Product type is equal to `Bowl`  |
| Plates       | `plates`       | Product type is equal to `Plate` |
| Vases        | `vases`        | Product type is equal to `Vase`  |
| New arrivals | `new-arrivals` | Product tag is equal to `new`    |

## Menus

| Menu (handle)           | Items                                                          |
| ----------------------- | -------------------------------------------------------------- |
| Main menu (`main-menu`) | Mugs, Bowls, Plates, Vases, New arrivals (link to collections) |
| Footer menu (`footer`)  | Search, Cart                                                   |

## Images

All images are AI-generated. [`images/brief.md`](images/brief.md) holds the shared style and one prompt per image,
[`images/prompts.json`](images/prompts.json) the same data in machine-readable form (file name, SKU, alt text, prompt,
edit prompt).

- 30 images: one per variant (28, 1600x2000 px, 4:5) plus a desktop hero (2400x1350 px, 16:9) and a mobile hero
  (1200x1500 px, 4:5).
- Seamless warm off-white backdrop, soft daylight from the left, one object centred, no text, logos, people or props.
- Variants of one product are made by editing the first image, so only the glaze changes.
- Alt text describes the object and the glaze, for example "Oat-glazed stoneware mug".

## Art direction

Warm studio.

- **Palette:** background `#F6F1EA` (warm off-white), text `#2B2622`, accent `#9A5B3C` (terracotta), muted
  `#8A7F73`, surface `#EDE5DA`.
- **Typography:** a serif for headings and a clean sans for text. Candidates to confirm in the theme editor's font
  picker: Cormorant or Newsreader for headings, Work Sans for body (Work Sans is already used by Skeleton).
- **Photography:** warm daylight, soft shadows, slightly muted colour.
- **Character:** handmade, domestic, unhurried.

Text on background must reach 4.5:1.

## Loading the catalog

Needs a Dev Dashboard app in the same organization as the store, with the scopes `write_products`, `write_files` and
`write_publications`, and its credentials in `.env` (see `.env.example`). The token is requested with the
[client credentials grant](https://shopify.dev/docs/apps/build/authentication-authorization/access-tokens/client-credentials-grant)
and kept in memory only.

| Command                                   | What it does                                                                                     |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `npm run catalog:seed:dry-run`            | Offline: checks `products.csv` against `prompts.json` and every image file (JPEG, size, weight). |
| `npm run catalog:seed`                    | Creates or updates products, variant images, collections and hero files; safe to run again.      |
| `npm run catalog:seed -- --only <handle>` | One product only.                                                                                |
| `npm run catalog:seed -- --skip-images`   | Products and collections without images.                                                         |
| `npm run catalog:verify`                  | Read-only: compares the store with the catalog and lists every difference.                       |

Products are matched by handle, images by alt text and hero files by file name, so a repeat run does not create
duplicates. Menus are created by hand in the admin (Content → Menus).
