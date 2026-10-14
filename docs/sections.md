# Sections

The theme has four content sections and one utility section (`rich-text`) that a merchant can add to any JSON template, and the page sections that the
store's templates use. The content sections accept theme blocks by explicit type ([blocks.md](blocks.md)); none of
them accepts `@theme`, and only `feature-banner` accepts app blocks. A content section without blocks renders nothing
on the storefront and a selectable placeholder in the theme editor
([decisions.md](decisions.md#24-empty-sections-render-nothing)).

## Content sections

| Section           | Blocks                                                       | Merchant controls                                                                                                                       | Preset                                                                                   |
| ----------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `hero-banner`     | `heading`, `text`, `button` (max 6)                          | Image, mobile image, height (full screen, medium, adapt to image), overlay opacity, content position (3×3), content width, color scheme | Heading, text, a primary and a secondary button                                          |
| `collection-grid` | `_collection-card` (max 8)                                   | Heading, columns on desktop (2–4), image ratio, label position (on image, below image), product count, mobile layout, color scheme      | Heading and four empty collection cards                                                  |
| `feature-banner`  | `heading`, `text`, `button`, `group`, `list`, `@app` (max 6) | Image, image side, image ratio, layout (page width, full width), vertical alignment, color scheme                                       | "Image left" and "Image right": eyebrow, heading, text, a three-item list, a link button |
| `faq-accordion`   | `_faq-item` (max 16); static `heading`                       | Open the first question, one open at a time, content width, color scheme                                                                | Heading and three questions                                                              |
| `rich-text`       | `group`, `heading`, `text`, `button`                         | Color scheme, content width, alignment, vertical padding                                                                                | Heading, text and a button                                                               |

### Hero banner

A full-width image with a separate image for screens below 750px, and the content blocks on a 3×3 position grid. The
overlay is the color scheme's background at the chosen strength, full behind the content and fading towards the
opposite side, so the text stays readable while the image keeps its light. "Full screen" fills the window under the
header. As the first section of a template the image is the LCP element: eager, `fetchpriority="high"`.

### Collection grid

Up to eight collection cards in two to four columns from 750px; below 750px a two-column grid or a horizontal
scroll-snap row. A card takes its image from the block, then the collection, then the collection's first product. The
label sits on the image in a compact chip or under the image; the whole card is one link with one focus ring.

### Feature banner

An image on one side and content on the other. "Page width" keeps both in the page column; "Full width" runs the image
to the window edge. The `list` block holds feature items with an icon, a title and a short text. It is the only
section that accepts app blocks, rendered in the same flow as the theme blocks.

### FAQ accordion

Questions are native `<details>` elements, so they open and close with the keyboard and without JavaScript. With "One
open at a time" the items share a `name`, and supporting browsers close the others. The heading is a static block: it
can be edited or hidden, not removed.

### Rich text

A utility section for text content in one column: headings, text, buttons and groups of them. The About page is built
from it and the feature banner. Vertical padding defaults to the section spacing every section uses; 40, 64 or 96px
fit a section with its own background color.

## Page sections

| Section           | Template                               | Merchant controls                                           |
| ----------------- | -------------------------------------- | ----------------------------------------------------------- |
| `header`          | Header group                           | Logo, logo width, menu, customer account menu, color scheme |
| `footer`          | Footer group                           | Menu, payment icons, color scheme                           |
| `main-collection` | `collection.json`                      | Products per page, columns on desktop (3, 4)                |
| `main-product`    | `product.json`                         | —                                                           |
| `main-cart`       | `cart.json`                            | —                                                           |
| `page`            | `page.json` and other page templates   | —                                                           |
| `cart-drawer`     | Rendered once in `layout/theme.liquid` | —                                                           |

The header shows the menu inline from 1024px and in a `<details>` drawer below. The product page has a variant picker
with a native `<select>` fallback, a quantity field and the add-to-cart form, which opens the cart drawer
([cart-drawer.md](cart-drawer.md)). The cart page is one form posted to `/cart` and works without JavaScript.

`cart-icon-bubble`, `cart-live-region-text` and `cart-recommendations` have no settings and are not placed in
templates; the cart drawer requests them through the Section Rendering API.

## Templates

| Template               | Sections                                                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `index.json`           | `hero-banner`, `collection-grid`, `feature-banner`, `faq-accordion`                                                      |
| `product.json`         | `main-product`, `faq-accordion`                                                                                          |
| `page.about.json`      | `rich-text`, `feature-banner`, `rich-text`                                                                               |
| `page.process.json`    | `page`, `hero-banner`, `collection-grid`, `faq-accordion`, `feature-banner` with an app block; built in the theme editor |
| `page.styleguide.json` | `page` and one `rich-text` per color scheme with the type scale, buttons, form controls, product cards and icons         |
