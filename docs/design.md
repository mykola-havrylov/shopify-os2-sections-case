# Design system

The theme's look is defined once, as design tokens, and every section, block and snippet uses those tokens instead of
its own values. The style guide template (`templates/page.styleguide.json`) renders every token and shared component in
all four color schemes; assign it to a page to review the system in the theme editor or on the storefront.

## Principles

- **Space first.** Generous whitespace between and inside sections; spacing always comes from the spacing scale.
- **One accent.** Terracotta is the only accent color. It is used for the primary button and the Accent scheme, not
  for decoration.
- **Serif headings, plain text.** Cormorant for headings from `h0` to `h3`, Work Sans for running text, small headings,
  labels, prices and controls.
- **No decorative borders or shadows.** Images sit on the surface color. Borders exist only where they carry meaning:
  form control boundaries, the secondary button and thin dividers.
- **Calm commerce.** Nothing creates pressure or invents social proof (see [Rejected patterns](#rejected-patterns)).

## Tokens

Settings-driven tokens are output by `snippets/css-variables.liquid`; the rest live in `assets/critical.css`.

### Spacing and layout

| Token                   | Value                                | Used for                                                 |
| ----------------------- | ------------------------------------ | -------------------------------------------------------- |
| `--space-1`             | 0.25rem (4px)                        | Tight gaps: title to price, arrow nudge, badge           |
| `--space-2`             | 0.5rem (8px)                         | Label to control, icon to text, control padding          |
| `--space-3`             | 1rem (16px)                          | Default block gap, image to text in a card               |
| `--space-4`             | 1.5rem (24px)                        | Gap between blocks in a section                          |
| `--space-5`             | 2.5rem (40px)                        | Grid gutter on desktop, small section padding            |
| `--space-6`             | 4rem (64px)                          | Section padding                                          |
| `--space-7`             | 6rem (96px)                          | Large section padding                                    |
| `--grid-gutter`         | `--space-3` / `--space-5` from 750px | Gap in card grids                                        |
| `--text-measure`        | 65ch                                 | Running text, narrow content columns, forms              |
| `--text-measure-narrow` | 45ch                                 | Short text blocks                                        |
| `--control-height`      | 2.75rem (44px)                       | Minimum height of buttons and form controls              |
| `--page-width`          | Theme setting                        | Maximum content width                                    |
| `--page-margin`         | Theme setting                        | Minimum side margin                                      |
| `--section-spacing`     | Theme setting                        | Vertical space between sections (half above, half below) |

The `group` block's gap and padding and the `rich-text` section's vertical padding are selects of these steps, not free
pixel values. Breakpoints: 750px for layout (grids, gutters, media ratios) and 1024px for the header, where the
mobile menu drawer gives way to the inline menu.

### Typography

| Token                    | Value         | Used for                                           |
| ------------------------ | ------------- | -------------------------------------------------- |
| `--font-heading--family` | Theme setting | `h0`–`h3`                                          |
| `--font-body--family`    | Theme setting | Text, `h4`, card titles, buttons, labels, controls |
| `--line-height-tight`    | 1.15          | Headings `h0`–`h3`                                 |
| `--line-height-snug`     | 1.3           | `h4`, buttons, labels, controls, eyebrow, badge    |
| `--line-height-body`     | 1.6           | Running text                                       |
| `--letter-spacing-tight` | -0.01em       | Headings `h0`–`h3`                                 |
| `--letter-spacing-caps`  | 0.08em        | Uppercase text: eyebrow, badge                     |

| Class           | Size                                          | Font       |
| --------------- | --------------------------------------------- | ---------- |
| `.h0`           | 2.75rem → 4.5rem (fluid)                      | Heading    |
| `h1`, `.h1`     | 2.25rem → 3.25rem (fluid)                     | Heading    |
| `h2`, `.h2`     | 1.75rem → 2.5rem (fluid)                      | Heading    |
| `h3`, `.h3`     | 1.375rem → 1.75rem (fluid)                    | Heading    |
| `h4`, `.h4`     | 1.125rem                                      | Body, bold |
| `.text-large`   | 1.125em                                       | Body       |
| `.text-small`   | 0.875em                                       | Body       |
| `.text-eyebrow` | 0.8125em, uppercase, tracked, secondary color | Body       |

Heading sizes scale with the "Heading size" theme setting.

### Media

| Token             | Value                    | Used for                               |
| ----------------- | ------------------------ | -------------------------------------- |
| `--ratio-product` | 4 / 5                    | Product images in cards, gallery, cart |
| `--ratio-tile`    | 4 / 5                    | Collection tiles                       |
| `--ratio-hero`    | 4 / 5, 16 / 9 from 750px | Hero images (mobile and desktop files) |

`snippets/image.liquid` crops to a ratio with `ratio: 'product' | 'tile' | 'hero'`. Every image frame has the scheme's
surface color behind it and the global corner radius; full-bleed images reset the radius.

### Color, radius, focus and motion

Each color scheme sets `--color-background`, `--color-foreground`, `--color-muted`, `--color-border`,
`--color-surface`, `--color-button`, `--color-button-hover` (the button color darkened by 8%),
`--color-button-label` and `--color-secondary-button-label`. `--radius` (theme setting) applies to buttons, controls,
badges and images. The focus ring is `--focus-ring-width` of the foreground color at `--focus-ring-offset`. Motion uses
`--motion-duration` and `--motion-easing`, both off for reduced motion.

`--icon-stroke-width` (1.5) sets the stroke of every line icon.

## Components

| Class                              | Where                   | Notes                                                                                                                                                                   |
| ---------------------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.button`, `.button--secondary`    | `assets/critical.css`   | Primary is the scheme's button color; secondary is outlined.                                                                                                            |
| `.link-arrow`                      | `assets/components.css` | Underlined bold link with a trailing arrow icon.                                                                                                                        |
| `.divider`                         | `assets/components.css` | `hr` with a 1px line in the border color.                                                                                                                               |
| `.field`, `.input`, `.select`      | `assets/components.css` | Label above the control; boundary in the secondary color.                                                                                                               |
| `.quantity`                        | `assets/components.css` | Minus button, number input, plus button.                                                                                                                                |
| `.badge`                           | `assets/components.css` | Only for "Sold out".                                                                                                                                                    |
| `.product-card`                    | `assets/components.css` | 4:5 image on surface, title and price under it; the whole card is the link; hover zooms the image inside its frame and underlines the title, without moving the layout. |
| `.icon` (`snippets/icon.liquid`)   | Snippet stylesheet      | Inline SVG, `currentColor`, 1.25em by default.                                                                                                                          |
| `snippets/product-card.liquid`     | Uses `.product-card`    | Card markup for collection grids and product rows.                                                                                                                      |
| `snippets/price.liquid`            | Snippet stylesheet      | Price; "From" for varying prices; compare-at price struck through.                                                                                                      |
| `snippets/cart-icon-bubble.liquid` | Snippet stylesheet      | Cart link with item count; also rendered as a section for the Cart API.                                                                                                 |
| `snippets/quantity-input.liquid`   | Uses `.quantity`        | Labelled number input; minus and plus buttons only with JavaScript.                                                                                                     |

Icons: `cart`, `account`, `close`, `menu`, `minus`, `plus`, `arrow-right`, `chevron-down`, `hand`, `flame`, `leaf`,
`package`, `refresh`.

## Color schemes

| Scheme  | Background | Use it for                                                                |
| ------- | ---------- | ------------------------------------------------------------------------- |
| Base    | `#F6F1EA`  | Default for pages, header, product grids, cart drawer.                    |
| Surface | `#EDE5DA`  | A calm band that separates a section from the ones around it.             |
| Inverse | `#2B2622`  | Footer and one strong statement per page at most.                         |
| Accent  | `#9A5B3C`  | Rarely: one short promotional band. Never next to another Accent section. |

## Contrast

WCAG 2.1 contrast ratios computed from the scheme values in `config/settings_data.json`. Text needs 4.5:1; the button
fill against the section background and form control boundaries need 3:1. Hover colors are the computed
`--color-button-hover` values.

| Pair                                        | Base  | Surface | Inverse | Accent |
| ------------------------------------------- | ----- | ------- | ------- | ------ |
| Text on background                          | 13.32 | 11.99   | 13.32   | 5.34   |
| Secondary text on background (also eyebrow) | 5.08  | 4.57    | 8.26    | 4.75   |
| Primary button label on button              | 5.34  | 5.34    | 13.32   | 14.97  |
| Primary button label on hover               | 7.25  | 7.25    | 11.28   | 12.55  |
| Secondary button label on background        | 13.32 | 11.99   | 13.32   | 5.34   |
| Secondary button on hover (inverted)        | 13.32 | 11.99   | 13.32   | 5.34   |
| Badge text on badge                         | 13.32 | 11.99   | 13.32   | 5.34   |
| Button fill against background (3:1)        | 4.75  | 4.27    | 13.32   | 5.34   |
| Hover fill against background (3:1)         | 6.45  | 5.81    | 11.28   | 4.48   |
| Control boundary against background (3:1)   | 5.08  | 4.57    | 8.26    | 4.75   |
| Focus ring against background (3:1)         | 13.32 | 11.99   | 13.32   | 5.34   |

Text is never placed on the surface color directly; the surface sits behind images and the badge frame. The border
color is used only for decorative dividers, which need no minimum contrast.

## Rejected patterns

- No countdown timers.
- No "N people are viewing" or similar live-activity counters.
- No "only N left" stock pressure.
- No invented ratings or reviews; the store has no reviews app, so no stars anywhere.
- No discount badges; the only badge is "Sold out".
- No pop-ups.
- No auto-playing carousels.
