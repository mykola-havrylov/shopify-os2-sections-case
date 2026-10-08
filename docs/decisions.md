# Decisions

## 1. Skeleton at a pinned commit, not Dawn and not Skeleton `main`

Date: 2026-10-08.

**Decision.** The theme is based on [Shopify/skeleton-theme](https://github.com/Shopify/skeleton-theme) at commit
`a4f32d3` (2026-02-26), copied into the repository without Skeleton's git history.

**Why not Dawn.** Skeleton is the reference theme that Shopify's own tooling starts new themes from
([Create a theme](https://shopify.dev/docs/storefronts/themes/getting-started/create): `shopify theme init` clones
Skeleton). It is minimal, so header, footer, collection, product and cart are written for this project instead of
replacing existing Dawn components. Its licence terms are the same kind of grant as Dawn's (see
[third-party-assets.md](third-party-assets.md)).

**Why not Skeleton `main`.** On 2026-10-01 Skeleton `main` moved to a block-first model (commit `a7a655e`, "Port
rc-v2.0.0 with updated block composition syntax"). That branch has no `sections/` folder and no JSON templates, uses
`templates/*.liquid` composed with the `{% block %}` tag, and its `AGENTS.md` forbids sections, `{% stylesheet %}` and
schema presets. `{% block %}` and `{% partial %}` belong to the Liquid July '26 developer preview
([changelog](https://shopify.dev/changelog/developer-preview-liquid-block-and-partial-tags),
[developer preview](https://shopify.dev/docs/storefronts/themes/getting-started/developer-preview)); they are not
generally available and need a preview-enabled store. This project is about Online Store 2.0: sections, JSON templates,
theme blocks and Theme Editor control, so the last commit of Skeleton that has them is used.

**Consequences.**

- `shopify theme init` is not used, because it clones `main`.
- The pinned commit never moves automatically; Skeleton-derived files are listed in
  [third-party-assets.md](third-party-assets.md).
- Liquid preview tags are not used anywhere in the theme.

## 2. Theme Check configuration

`.theme-check.yml` is kept as shipped by Skeleton (`extends: theme-check:recommended`). No checks are disabled.

## 3. Theme Check in CI without the GitHub Checks token

The `shopify/theme-check-action@v2` step runs without its optional `token` input. With `token` set (and
`checks: write` granted), the action created a check run and then failed with `HttpError: Not Found` while updating it,
before reporting any Theme Check result. Without `token` the action only runs `shopify theme check` and fails the job on
errors; the only difference is that no GitHub check annotations are posted. See the action's
[configuration](https://github.com/Shopify/theme-check-action#configuration).

## 4. Demo catalog without inventory tracking

`data/products.csv` leaves `Inventory tracker` blank, which means inventory isn't tracked
([product CSV reference](https://help.shopify.com/en/manual/products/import-export/using-csv)), and the seed script
writes the same as `inventoryItem.tracked: false`. Every variant stays purchasable, which the cart states in the
storefront rely on.

## 5. Catalog loaded through the Admin API

The demo catalog is created by `scripts/seed-catalog.js` instead of a manual CSV import, so the store can be rebuilt
from the repository in one command and checked with `npm run catalog:verify`.

- Authentication: a Dev Dashboard app with the
  [client credentials grant](https://shopify.dev/docs/apps/build/authentication-authorization/access-tokens/client-credentials-grant).
  It works only for stores in the same organization as the app, which is the case for this demo store. The token lives
  in memory only.
- Admin GraphQL API pinned to `2026-07`; the client fails if Shopify serves a different version.
- Products: [`productSet`](https://shopify.dev/docs/api/admin-graphql/2026-07/mutations/productSet) keyed by handle, so a
  repeat run updates instead of duplicating. `files` is not sent, so existing media stays untouched.
- Images: staged uploads, attached to the product, then linked to their variant with
  [`productVariantsBulkUpdate`](https://shopify.dev/docs/api/admin-graphql/2026-07/mutations/productVariantsBulkUpdate)
  once the media is ready ([manage media](https://shopify.dev/docs/apps/build/product-merchandising/products-and-collections/manage-media)).
  Hero images go to Content → Files with `fileCreate`.
- Collections: `collectionCreate` with a conditions source (product type or tag), because the `ruleSet` input is
  deprecated in favour of
  [sources](https://shopify.dev/docs/apps/build/product-merchandising/products-and-collections/use-new-collections-model).
- Menus stay manual: the app has no `write_online_store_navigation` scope, and two menus are quicker to make by hand.
