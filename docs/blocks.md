# Theme blocks

Shared theme blocks live in `blocks/`. Sections and blocks list the exact block types they accept instead of
`@theme`, so the theme editor's block picker only offers blocks that make sense in that place. Every block has a
`{% doc %}` header and `{{ block.shopify_attributes }}` on its wrapper; every merchant-facing block has at least one
preset. Colors, fonts, radius and spacing come from the global design tokens ([design.md](design.md)); no block
hardcodes a color.

| Block                  | Settings                                                                                            | Renders nothing when | Accepted by                                                                      |
| ---------------------- | --------------------------------------------------------------------------------------------------- | -------------------- | -------------------------------------------------------------------------------- |
| `heading`              | Text (inline rich text), heading level H1–H4, size, alignment                                       | Text is empty        | `group`, `rich-text`, `hero-banner`, `feature-banner`; static in `faq-accordion` |
| `text`                 | Rich text, size (eyebrow, small, body, large), maximum width, alignment, muted color                | Text is empty        | `group`, `rich-text`, `hero-banner`, `feature-banner`                            |
| `button`               | Label, link, new tab, style (primary, secondary, link with arrow)                                   | Label or link empty¹ | `group`, `rich-text`, `hero-banner`, `feature-banner`                            |
| `group`                | Row or column, alignment, gap and padding from the spacing scale; holds `heading`, `text`, `button` | —                    | `rich-text`, `feature-banner`                                                    |
| `list`                 | Holds `_list-item` blocks; renders a `<ul>`                                                         | —                    | `feature-banner`                                                                 |
| `_list-item`           | Icon (none or one of the theme icons), title, text                                                  | Title and text empty | `list`                                                                           |
| `_faq-item`            | Question, answer (rich text)                                                                        | —                    | `faq-accordion`                                                                  |
| `_collection-card`     | Collection, image (optional), label (optional)                                                      | No collection³       | `collection-grid`                                                                |
| `_styleguide-specimen` | Specimen (product cards, form controls, icons), products                                            | —                    | `rich-text`²                                                                     |

¹ In the theme editor an incomplete button is shown as disabled, so it can still be selected and fixed.

² Private and without presets, so it never appears in the block picker; only the style guide template places it.

³ In the theme editor a card without a collection shows a placeholder, so it can still be selected.

## Presets

| Block     | Preset  | Content                                                               |
| --------- | ------- | --------------------------------------------------------------------- |
| `heading` | Heading | "Made by hand, for every day", H2, medium                             |
| `text`    | Text    | One sentence about the studio                                         |
| `button`  | Button  | "Shop now", links to all products                                     |
| `group`   | Column  | Heading and text, 16px gap                                            |
| `group`   | Buttons | A primary and a secondary button in a row, 16px gap                   |
| `list`    | List    | Three items: hand, flame and leaf icons with a title and a short text |

## Heading sizes

The heading level (`h1`–`h4`) is chosen for the document outline; the size is chosen for the look. The sizes map to
the shared `.h0`–`.h4` classes in `assets/critical.css` and scale with the "Heading size" theme setting. "Extra small"
(`.h4`) uses the body font in bold; the other sizes use the heading font.

## Text sizes

"Eyebrow" is a small uppercase label with letter spacing in the secondary text color, meant for a short line above a
heading. Small, body and large are running text. Maximum width "Normal" is `--text-measure` (65ch), "Narrow" is 45ch.

## Group spacing

Gap and padding are steps of the spacing scale: none, 4, 8, 16, 24, 40 or 64px (`--space-1` to `--space-6`). Padding
starts at 8px.

## Sections that accept theme blocks

The sections, their block lists, settings and presets are in [sections.md](sections.md).
