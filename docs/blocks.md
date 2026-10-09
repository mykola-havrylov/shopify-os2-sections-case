# Theme blocks

Shared theme blocks live in `blocks/`. Sections and blocks list the exact block types they accept instead of
`@theme`, so the theme editor's block picker only offers blocks that make sense in that place. Every block has a
`{% doc %}` header, at least one preset, and `{{ block.shopify_attributes }}` on its wrapper. Colors, fonts, radius and
spacing come from the global design tokens; no block hardcodes a color.

| Block     | Settings                                                                  | Renders nothing when | Accepted by |
| --------- | ------------------------------------------------------------------------- | -------------------- | ----------- |
| `heading` | Text (inline rich text), heading level H1–H4, size, alignment             | Text is empty        | `group`     |
| `text`    | Rich text, size, maximum width, alignment, secondary text color           | Text is empty        | `group`     |
| `button`  | Label, link, new tab, primary or secondary style                          | Label or link empty¹ | `group`     |
| `group`   | Row or column, alignment, gap, padding; holds `heading`, `text`, `button` | —                    | —           |

¹ In the theme editor an incomplete button is shown as disabled, so it can still be selected and fixed.

## Presets

| Block     | Preset  | Content                                   |
| --------- | ------- | ----------------------------------------- |
| `heading` | Heading | "Made by hand, for every day", H2, medium |
| `text`    | Text    | One sentence about the studio             |
| `button`  | Button  | "Shop now", links to all products         |
| `group`   | Column  | Heading and text                          |
| `group`   | Buttons | A primary and a secondary button in a row |

## Heading sizes

The heading level (`h1`–`h4`) is chosen for the document outline; the size is chosen for the look. The sizes map to
the shared `.h0`–`.h4` classes in `assets/critical.css` and scale with the "Heading size" theme setting.
