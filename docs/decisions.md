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

## 6. Design tokens

Global decisions live in theme settings and reach the CSS as custom properties in `snippets/css-variables.liquid`;
component-specific values stay inside each block's or section's `{% stylesheet %}`.

- Colors: a [`color_scheme_group`](https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings#color_scheme_group)
  with four schemes (Base, Surface, Inverse, Accent). Each scheme becomes a `.color-<id>` class, and the first one is
  also applied to `:root`, so sections only need to add the class of the scheme they use. Every text and button pair in
  every scheme meets WCAG 2.1 AA (4.5:1 for text, 3:1 for the button against its background); the secondary text color
  was darkened from `#8A7F73` (3.5:1) to `#6E655C` (5.1:1) to get there.
- Fonts: two `font_picker` settings from the
  [Shopify font library](https://shopify.dev/docs/storefronts/themes/architecture/settings/fonts#available-fonts),
  Cormorant (`cormorant_n6`) for headings and Work Sans (`work_sans_n4`) for text, loaded with `font_face` and
  `font-display: swap`; only the body font is preloaded. No external font requests.
- Heading level and heading size are separate settings, so the document outline does not depend on the look.
- Focus ring and reduced motion are not settings: the ring is always visible on keyboard focus, and
  `prefers-reduced-motion` always turns animations off, whatever the "Animations" setting says.

## 7. Spacing scale instead of free pixel values

Date: 2026-10-09.

Spacing is a seven-step rem scale (`--space-1` … `--space-7`: 4, 8, 16, 24, 40, 64, 96px) in `assets/critical.css`.
The `group` block's gap and padding and the `rich-text` section's vertical padding are `select` settings of these
steps instead of `range` settings in pixels, so every layout lines up on the same rhythm and a merchant can't pick an
off-scale value. The scale is not a theme setting: changing it would change every component at once, which is a
design decision, not a merchant one. The global "Section spacing" setting stays as it was. Only values used by at least
two components became tokens (spacing, line length, grid gutter, control height, line heights, letter spacings, media
ratios); everything else stays inside the component's own stylesheet.

## 8. Small headings use the body font

Date: 2026-10-09.

Cormorant was checked in the browser at the sizes used for `h4` (20px) and product card titles (16px). Its small
x-height makes those sizes look smaller and lighter than the Work Sans text next to them (a 16px card title looked no
larger than the 14px price under it). A heavier weight from the font library (`cormorant_n7`; the family has
`n3`–`n7`, see [available fonts](https://shopify.dev/docs/storefronts/themes/architecture/settings/fonts#available-fonts))
does not change the x-height, so it was not used. Instead `h4`/`.h4` (now 18px) and card titles use the body font:
`h4` in bold, card titles in regular. `h0`–`h3` keep Cormorant, where it reads well.

## 9. Line icons from Lucide

Date: 2026-10-09.

`snippets/icon.liquid` renders twelve icons as inline SVG, with paths copied from
[Lucide](https://lucide.dev) `lucide-static` v1.54.0 (ISC; six of the icons are derived from Feather, MIT). One open
set gives a consistent stroke style for both UI icons and the themed feature icons; inline SVG with `currentColor`
needs no extra request and follows the color scheme. The stroke width is 1.5 instead of Lucide's 2, to match the light
typography. Licence texts are in [third-party-assets.md](third-party-assets.md).

The header still uses Skeleton's `icon-account.svg` and `icon-cart.svg`: the account icon carries
`slot="signed-out-avatar"` for the `shopify-account` component, so the swap is not a clean one-line change. It is done
when the header is rewritten.

## 10. Surface color in every scheme and a derived button hover

Date: 2026-10-09.

The color schemes gained a `surface` color: the background behind images and image placeholders. A scheme needs its
own surface, because the Surface scheme's background is the Base scheme's surface, and a placeholder of the same color
as its section would be invisible. Values: Base `#EDE5DA`, Surface `#E3D9CC`, Inverse `#38312C`, Accent `#8A5034`.

The primary button's hover color was `color-mix(button 85%, foreground)`. In the Inverse and Accent schemes the button
and the foreground are the same color, so the hover changed nothing. The hover is now `--color-button-hover`, the
button color darkened by 8% with the [`color_darken`](https://shopify.dev/docs/api/liquid/filters/color_darken) filter
in `snippets/css-variables.liquid`; label contrast stays above 7:1 in every scheme (see [design.md](design.md#contrast)).

## 11. `rich-text` as a utility section, and the style guide

Date: 2026-10-09.

`sections/rich-text.liquid` holds headings, text, buttons and groups in one column, in any color scheme. It is a
utility for text pages (About) and the style guide, not one of the showcase sections. It accepts `group`, `heading`,
`text` and `button` by explicit type. The "Link with arrow" style was added to the `button` block instead of a new
link block, because a link and a button share every setting.

The style guide (`templates/page.styleguide.json`) needs product cards, form controls and icons, which no
merchant-facing block renders. They come from one private block, `_styleguide-specimen`, with no presets: a theme
block without presets is not offered in the block picker
([theme blocks quick start](https://shopify.dev/docs/storefronts/themes/architecture/blocks/theme-blocks/quick-start)),
so it can only be placed by the template. The block uses `"tag": null`
([block schema](https://shopify.dev/docs/storefronts/themes/architecture/blocks/theme-blocks/schema)) so that its own
element, not Shopify's `shopify-block` wrapper, is the flex item of the section and can stretch to the full width.

## 12. Header, footer and collection page

Date: 2026-10-09.

- **Mobile menu on `<details>`.** Below 1024px the main menu is a `<details>` drawer, so it opens and closes without
  JavaScript. `assets/header-menu.js` (a `header-menu` custom element, loaded as a module) only adds closing with
  Escape and returns focus to the toggle. From 1024px the same menu is an inline list; below that the six menu items and the icons don't fit one
  line on tablets. One menu level is rendered;
  the store's main menu has no nested links.
- **Account.** The header uses the
  [`shopify-account`](https://shopify.dev/docs/storefronts/themes/customer-engagement/account-component) component,
  visible on mobile and desktop. The signed-out avatar is the theme's `account` icon placed in the component's
  `signed-out-avatar` slot; the component gives its button the accessible name. Skeleton's `icon-account.svg` and
  `icon-cart.svg` were removed.
- **Cart link for bundled section rendering.** `snippets/cart-icon-bubble.liquid` is rendered by the header inside
  `#cart-icon-bubble` and by `sections/cart-icon-bubble.liquid`. The section is not placed in any template; the
  [Section Rendering API](https://shopify.dev/docs/storefronts/themes/best-practices/performance/use-section-rendering-api)
  renders a static section by its file name, so the Cart API can return `cart-icon-bubble` with every cart change
  while Liquid stays the only source of the markup.
- **Collection page.** `sections/main-collection.liquid` replaces Skeleton's `collection` section: title, product
  count, description, a 2-column (mobile) / 3- or 4-column grid of `product-card`, numbered pagination and an empty
  state. Sorting and filtering are out of scope. The first row of images loads eagerly and only the first image gets
  `fetchpriority="high"`, as the likely LCP element on mobile and desktop.
- **Skip link and `<main>`.** The layout starts with a "Skip to content" link to `<main id="MainContent">`.

## 13. `.shopifyignore` for temporary files

Date: 2026-10-09.

Tools such as `sed -i` and editors write temporary files next to the file they change (`sections/sedAbC123`, `*.swp`,
`*~`). `shopify theme dev` watches the theme folders, tries to upload such a file and fails ("Must have a .liquid file
extension"), after which the dev server shows an upload error page. `.shopifyignore` excludes extension-less files and
common temporary extensions from every Shopify CLI command
([Shopify CLI for themes](https://shopify.dev/docs/storefronts/themes/tools/cli#excluding-files-from-shopify-cli)).
Every real theme file has an extension, so nothing the theme needs is excluded.
