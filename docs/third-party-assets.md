# Third-party assets

## Skeleton theme

|         |                                                    |
| ------- | -------------------------------------------------- |
| Source  | https://github.com/Shopify/skeleton-theme          |
| Commit  | `a4f32d3` (2026-02-26)                             |
| Licence | Shopify theme licence, [LICENSE.md](../LICENSE.md) |

The licence is an MIT-style grant limited to themes that integrate or interoperate with Shopify. The files below are
derived from Skeleton, most of them modified, and stay under `LICENSE.md`. Everything else in the repository is
original work under [LICENSE](../LICENSE).

| Folder       | Files derived from Skeleton                                                                                                                                                      |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `assets/`    | `critical.css`, `icon-account.svg`, `icon-cart.svg`                                                                                                                              |
| `blocks/`    | `group.liquid`, `text.liquid`                                                                                                                                                    |
| `config/`    | `settings_schema.json`, `settings_data.json`                                                                                                                                     |
| `layout/`    | `theme.liquid`, `password.liquid`                                                                                                                                                |
| `locales/`   | `en.default.json`, `en.default.schema.json`                                                                                                                                      |
| `sections/`  | `404`, `article`, `blog`, `cart`, `collection`, `collections`, `footer`, `header`, `page`, `password`, `product`, `search` (`.liquid`); `footer-group.json`, `header-group.json` |
| `snippets/`  | `css-variables.liquid`, `image.liquid`, `meta-tags.liquid`                                                                                                                       |
| `templates/` | All `.json` templates except `page.styleguide.json`; `gift_card.liquid`                                                                                                          |
| Root         | `.gitattributes`, `.theme-check.yml`                                                                                                                                             |

## Lucide icons

|         |                                                                       |
| ------- | --------------------------------------------------------------------- |
| Source  | https://lucide.dev, package `lucide-static`                           |
| Version | 1.54.0                                                                |
| Licence | ISC (Lucide); MIT (Feather) for the icons Lucide derives from Feather |
| Used in | `snippets/icon.liquid`                                                |

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
