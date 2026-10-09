# Third-party assets

## Skeleton theme

|             |                                                                                |
| ----------- | ------------------------------------------------------------------------------ |
| Source      | https://github.com/Shopify/skeleton-theme                                      |
| Commit      | `a4f32d3` ("Merge pull request #77 from Shopify/jb-add-customer-account-menu") |
| Commit date | 2026-02-26                                                                     |
| Imported    | 2026-10-08                                                                     |
| Licence     | Shopify theme licence, [LICENSE.md](../LICENSE.md) (kept verbatim)             |

The licence in `LICENSE.md` is an MIT-style grant limited to developing themes that integrate or interoperate with
Shopify. Skeleton's README shows an "MIT" badge, but `LICENSE.md` is the document that governs. Skeleton-derived files,
including modified ones, stay under `LICENSE.md`; the plain MIT [LICENSE](../LICENSE) covers only original work.

### Changes to Skeleton files

| File                             | Change                                                                                                           |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `.github/workflows/cla.yml`      | Removed (Skeleton's contributor licence agreement workflow).                                                     |
| `.github/workflows/ci.yml`       | Replaced with this project's CI.                                                                                 |
| `CODE_OF_CONDUCT.md`             | Removed.                                                                                                         |
| `CONTRIBUTING.md`                | Removed.                                                                                                         |
| `.shopifyignore`                 | Removed.                                                                                                         |
| `README.md`                      | Replaced.                                                                                                        |
| `.gitignore`                     | Replaced.                                                                                                        |
| `assets/shoppy-x-ray.svg`        | Removed.                                                                                                         |
| `sections/hello-world.liquid`    | Removed.                                                                                                         |
| `sections/custom-section.liquid` | Removed.                                                                                                         |
| `templates/index.json`           | Demo section reference removed; template has no sections.                                                        |
| `config/settings_schema.json`    | Rewritten: theme info, two fonts, color schemes with surface, spacing, radius, animations.                       |
| `config/settings_data.json`      | Four color schemes added, each with a surface color.                                                             |
| `snippets/css-variables.liquid`  | Rewritten for the new settings, color scheme classes and derived button hover.                                   |
| `snippets/image.liquid`          | Extended: `srcset` widths, `sizes`, loading, fetch priority, alt, ratio tokens, placeholder, surface background. |
| `layout/theme.liquid`            | Font preloading uses the body and heading font settings; loads `components.css`.                                 |
| `assets/critical.css`            | Design tokens, base typography, buttons, focus ring, reduced motion and section spacing added.                   |
| `blocks/text.liquid`             | Rewritten as a rich text block with size (including eyebrow), width, alignment and muted options.                |
| `blocks/group.liquid`            | Rewritten: gap and padding from the spacing scale, wrapping rows, specific child block types, new presets.       |
| `locales/en.default.json`        | Strings for accessibility, product, collection and style guide UI added.                                         |
| `locales/en.default.schema.json` | Labels for the new settings and blocks; unused keys removed.                                                     |
| All other imported theme files   | Reformatted with Prettier; no functional change.                                                                 |

## Lucide icons

|          |                                                                       |
| -------- | --------------------------------------------------------------------- |
| Source   | https://lucide.dev, package `lucide-static`                           |
| Version  | 1.54.0                                                                |
| Imported | 2026-10-09                                                            |
| Licence  | ISC (Lucide); MIT (Feather) for the icons Lucide derives from Feather |
| Used in  | `snippets/icon.liquid`                                                |

| Theme name     | Lucide icon    | Licence      |
| -------------- | -------------- | ------------ |
| `cart`         | `shopping-bag` | MIT, Feather |
| `account`      | `user`         | ISC          |
| `close`        | `x`            | MIT, Feather |
| `minus`        | `minus`        | MIT, Feather |
| `plus`         | `plus`         | MIT, Feather |
| `arrow-right`  | `arrow-right`  | MIT, Feather |
| `chevron-down` | `chevron-down` | MIT, Feather |
| `hand`         | `hand`         | ISC          |
| `flame`        | `flame`        | ISC          |
| `leaf`         | `leaf`         | ISC          |
| `package`      | `package`      | ISC          |
| `refresh`      | `refresh-cw`   | ISC          |

Changes: the path data is copied unchanged; the `svg` attributes are rewritten for the theme (`aria-hidden`,
`focusable`, a class per icon) and the stroke width comes from `--icon-stroke-width` (1.5 instead of 2).

### ISC License (Lucide)

```text
ISC License

Copyright (c) 2026 Lucide Icons and Contributors

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

### MIT License (Feather, for the icons marked above)

```text
The MIT License (MIT)

Copyright (c) 2013-present Cole Bemis

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
