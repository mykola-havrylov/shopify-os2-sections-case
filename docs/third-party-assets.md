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

| File                             | Change                                                                          |
| -------------------------------- | ------------------------------------------------------------------------------- |
| `.github/workflows/cla.yml`      | Removed (Skeleton's contributor licence agreement workflow).                    |
| `.github/workflows/ci.yml`       | Replaced with this project's CI.                                                |
| `CODE_OF_CONDUCT.md`             | Removed.                                                                        |
| `CONTRIBUTING.md`                | Removed.                                                                        |
| `.shopifyignore`                 | Removed.                                                                        |
| `README.md`                      | Replaced.                                                                       |
| `.gitignore`                     | Replaced.                                                                       |
| `assets/shoppy-x-ray.svg`        | Removed.                                                                        |
| `sections/hello-world.liquid`    | Removed.                                                                        |
| `sections/custom-section.liquid` | Removed.                                                                        |
| `templates/index.json`           | Demo section reference removed; template has no sections.                       |
| `config/settings_schema.json`    | Rewritten: theme info, two fonts, color schemes, spacing, radius, animations.   |
| `config/settings_data.json`      | Four color schemes added.                                                       |
| `snippets/css-variables.liquid`  | Rewritten for the new settings and color scheme classes.                        |
| `snippets/image.liquid`          | Extended: `srcset` widths, `sizes`, loading, fetch priority, alt, aspect ratio. |
| `layout/theme.liquid`            | Font preloading uses the body and heading font settings.                        |
| `assets/critical.css`            | Base typography, buttons, focus ring, reduced motion and section spacing added. |
| `blocks/text.liquid`             | Rewritten as a rich text block with size, width, alignment and muted options.   |
| `blocks/group.liquid`            | Rewritten: gap setting, wrapping rows, specific child block types, new presets. |
| `locales/en.default.json`        | Accessibility string added.                                                     |
| `locales/en.default.schema.json` | Labels for the new settings and blocks; unused keys removed.                    |
| All other imported theme files   | Reformatted with Prettier; no functional change.                                |
