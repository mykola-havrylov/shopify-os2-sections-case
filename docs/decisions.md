# Decisions

Each entry records a decision that is in force, the reason for it and what follows from it.

## Foundation

### 1. Skeleton at a pinned commit, not Dawn and not Skeleton `main`

**Decision.** The theme is based on [Shopify/skeleton-theme](https://github.com/Shopify/skeleton-theme) at commit
`a4f32d3` (2026-02-26), copied into the repository without Skeleton's git history.

**Why not Dawn.** Skeleton is the reference theme that Shopify's own tooling starts new themes from
([Create a theme](https://shopify.dev/docs/storefronts/themes/getting-started/create): `shopify theme init` clones
Skeleton). It is minimal, so header, footer, collection, product and cart are written for this project instead of
replacing existing Dawn components. Its licence is the same kind of grant as Dawn's (see
[third-party-assets.md](third-party-assets.md)).

**Why not Skeleton `main`.** From commit `a7a655e` (2026-10-01) Skeleton `main` is block-first: no `sections/` folder,
no JSON templates, `templates/*.liquid` composed with the `{% block %}` tag, and an `AGENTS.md` that forbids sections,
`{% stylesheet %}` and schema presets. `{% block %}` and `{% partial %}` belong to the Liquid July '26 developer
preview ([changelog](https://shopify.dev/changelog/developer-preview-liquid-block-and-partial-tags),
[developer preview](https://shopify.dev/docs/storefronts/themes/getting-started/developer-preview)); they are not
generally available and need a preview-enabled store. This project is about Online Store 2.0 — sections, JSON
templates, theme blocks and Theme Editor control — so it uses the last Skeleton commit that has them.

**Consequences.**

- `shopify theme init` is not used, because it clones `main`.
- The pinned commit never moves automatically; Skeleton-derived files are listed in
  [third-party-assets.md](third-party-assets.md).
- Liquid preview tags are not used anywhere in the theme.

### 2. Theme Check and CI

- `.theme-check.yml` extends `theme-check:recommended` with no checks disabled.
- CI runs `shopify/theme-check-action@v2` without its optional `token` input. With the token the action also posts a
  GitHub check run, which in this repository fails with `HttpError: Not Found` before any result is reported. Without
  it the action runs `shopify theme check` and fails the job on errors; only the check annotations are missing
  ([action configuration](https://github.com/Shopify/theme-check-action#configuration)).
- `.shopifyignore` excludes extension-less files and common temporary extensions (`*~`, `*.swp`, `*.tmp`, `*.bak`)
  from every Shopify CLI command
  ([Shopify CLI for themes](https://shopify.dev/docs/storefronts/themes/tools/cli#excluding-files-from-shopify-cli)).
  Editors and tools write such files next to the file they change, and `shopify theme dev` would try to upload them.
  Every real theme file has an extension.

## Demo catalog

### 3. No inventory tracking

`data/products.csv` leaves `Inventory tracker` blank, which means inventory isn't tracked
([product CSV reference](https://help.shopify.com/en/manual/products/import-export/using-csv)), and the seed script
writes the same as `inventoryItem.tracked: false`. Every variant stays purchasable, which the cart states in the
storefront rely on.

### 4. Catalog loaded through the Admin API

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
- Menus are created by hand: the app has no `write_online_store_navigation` scope, and two menus are quicker to make in
  the admin.

## Design system

### 5. Design tokens

Global decisions live in theme settings and reach the CSS as custom properties in `snippets/css-variables.liquid`;
values that do not depend on settings live in `assets/critical.css`; component-specific values stay inside each
block's or section's `{% stylesheet %}`. A value becomes a token only when at least two components use it.

- Heading level and heading size are separate settings, so the document outline does not depend on the look.
- Focus ring and reduced motion are not settings: the ring is always visible on keyboard focus, and
  `prefers-reduced-motion` always turns animations off, whatever the "Animations" setting says.

### 6. Color schemes

- A [`color_scheme_group`](https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings#color_scheme_group)
  with four schemes (Base, Surface, Inverse, Accent). Each scheme becomes a `.color-<id>` class, and the first one also
  applies to `:root`, so a section only adds the class of the scheme it uses.
- Every text and button pair in every scheme meets WCAG 2.1 AA (4.5:1 for text, 3:1 for the button fill and control
  boundaries); the computed table is in [design.md](design.md#contrast). For that reason the secondary text color is
  `#6E655C` (5.1:1 on Base), not the art direction's lighter `#8A7F73` (3.5:1).
- Each scheme has a `surface` color, the background behind images and image placeholders. It is per scheme because the
  Surface scheme's background equals the Base scheme's surface, and a placeholder in its own section's color would be
  invisible.
- The primary button hover is `--color-button-hover`, the button color darkened by 8% with the
  [`color_darken`](https://shopify.dev/docs/api/liquid/filters/color_darken) filter. Mixing the button with the
  foreground color would give no visible hover in Inverse and Accent, where the two are the same color.

### 7. Typography

- Two `font_picker` settings from the
  [Shopify font library](https://shopify.dev/docs/storefronts/themes/architecture/settings/fonts#available-fonts):
  Cormorant (`cormorant_n6`) for headings and Work Sans (`work_sans_n4`) for text, loaded with `font_face` and
  `font-display: swap`; only the body font is preloaded. No external font requests.
- `h0`–`h3` use Cormorant. `h4` (18px, bold) and product card titles use Work Sans: Cormorant's small x-height makes
  text at those sizes look smaller and lighter than the Work Sans next to it (a 16px card title reads no larger than
  the 14px price under it), and a heavier weight such as `cormorant_n7` does not change the x-height.

### 8. Spacing scale

Spacing is a seven-step rem scale (`--space-1` … `--space-7`: 4, 8, 16, 24, 40, 64, 96px) in `assets/critical.css`.
The `group` block's gap and padding and the `rich-text` section's vertical padding are `select` settings of these
steps, not pixel ranges, so every layout follows the same rhythm and a merchant can't pick an off-scale value. The scale
is not a theme setting: changing it would change every component at once, which is a design decision, not a merchant
one. Breakpoints are 750px for layout and 1024px for the header menu.

### 9. Line icons from Lucide

`snippets/icon.liquid` renders the theme's icons as inline SVG, with paths from [Lucide](https://lucide.dev)
`lucide-static` v1.54.0 (ISC; some icons derive from Feather, MIT). One open set gives a consistent stroke for UI icons
and themed feature icons; inline SVG with `currentColor` needs no extra request and follows the color scheme. The stroke
width is 1.5 instead of Lucide's 2, to match the light typography. Licence texts are in
[third-party-assets.md](third-party-assets.md).

## Sections and pages

### 10. `rich-text` utility section and the style guide

- `sections/rich-text.liquid` holds headings, text, buttons and groups in one column, in any color scheme. It serves
  text pages (About) and the style guide and is not one of the showcase sections. It accepts `group`, `heading`,
  `text` and `button` by explicit type.
- A text link with an arrow is a style of the `button` block, not a separate block, because a link and a button share
  every setting.
- The style guide (`templates/page.styleguide.json`) shows product cards, form controls and icons through one private
  block, `_styleguide-specimen`, with no presets: a theme block without presets is not offered in the block picker
  ([theme blocks quick start](https://shopify.dev/docs/storefronts/themes/architecture/blocks/theme-blocks/quick-start)),
  so only the template places it. The block uses `"tag": null`
  ([block schema](https://shopify.dev/docs/storefronts/themes/architecture/blocks/theme-blocks/schema)) so that its own
  element, not Shopify's `shopify-block` wrapper, is the flex item of the section and can stretch to the full width.

### 11. Header and footer

- **Mobile menu on `<details>`.** Below 1024px the main menu is a `<details>` drawer, so it opens and closes without
  JavaScript; at tablet widths the menu items and icons don't fit one line. `assets/header-menu.js` (a `header-menu`
  custom element, loaded as a module) adds closing with Escape and returns focus to the toggle. From 1024px the same
  menu is an inline list. One menu level is rendered; the store's main menu has no nested links.
- **Account.** The header uses the
  [`shopify-account`](https://shopify.dev/docs/storefronts/themes/customer-engagement/account-component) component,
  visible on mobile and desktop. The signed-out avatar is the theme's `account` icon in the component's
  `signed-out-avatar` slot; the component gives its button the accessible name.
- **Cart link for bundled section rendering.** `snippets/cart-icon-bubble.liquid` is rendered by the header inside
  `#cart-icon-bubble` and by `sections/cart-icon-bubble.liquid`. The section is not placed in any template; the
  [Section Rendering API](https://shopify.dev/docs/storefronts/themes/best-practices/performance/use-section-rendering-api)
  renders a static section by its file name, so the Cart API can return `cart-icon-bubble` with every cart change
  while Liquid stays the only source of the markup.
- **Skip link and `<main>`.** The layout starts with a "Skip to content" link to `<main id="MainContent">`.

### 12. Collection page

`sections/main-collection.liquid`: title, product count, description, a 2-column (mobile) / 3- or 4-column grid of
`product-card`, numbered pagination and an empty state. Sorting and filtering are out of scope. The first row of images
loads eagerly and only the first image gets `fetchpriority="high"`, as the likely LCP element on mobile and desktop.

### 13. Product page

- **Variant picker with progressive enhancement.** The variant is a `<select name="id">` that belongs to the product
  form, so the form adds the chosen variant without JavaScript. With JavaScript the options are radio buttons styled as
  named buttons; `assets/variant-picker.js` (`variant-picker` custom element) maps the chosen values to a variant,
  sets the select, and updates price, button state, gallery order and the `?variant=` URL. CSS decides which control
  shows with the `scripting` media feature ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/scripting)),
  so nothing jumps after load. The price HTML for each variant comes from `snippets/price.liquid` inside a JSON script,
  so Liquid stays the only source of price markup. Products with only the default variant render a hidden `id` input
  instead of the picker.
- **Quantity.** `snippets/quantity-input.liquid` is a labelled number input that works without JavaScript; the minus
  and plus buttons (`assets/quantity-input.js`) are hidden when scripting is off. The product page and the cart use
  the same snippet.
- **Gallery.** All product media in a 4:5 frame: a vertical stack beside the sticky product info from 750px, a
  horizontal scroll-snap row below. The selected variant's image comes first and is the only `fetchpriority="high"`
  image.
- **Scope.** No dynamic checkout buttons, no tabs and no materials or care block; the catalog has no data for the
  latter.

### 14. Cart page

One form posted to `/cart` ([cart template](https://shopify.dev/docs/storefronts/themes/architecture/templates/cart))
that works without JavaScript and is the fallback for the cart drawer: `updates[<line key>]` quantity fields, the order
note, an Update button (first in the form, so Enter updates) and a Check out button. Remove links use
`item.url_to_remove`. Line and cart-level discounts are listed when present.
