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

| File                             | Change                                                       |
| -------------------------------- | ------------------------------------------------------------ |
| `.github/workflows/cla.yml`      | Removed (Skeleton's contributor licence agreement workflow). |
| `.github/workflows/ci.yml`       | Replaced with this project's CI.                             |
| `CODE_OF_CONDUCT.md`             | Removed.                                                     |
| `CONTRIBUTING.md`                | Removed.                                                     |
| `.shopifyignore`                 | Removed.                                                     |
| `README.md`                      | Replaced.                                                    |
| `.gitignore`                     | Replaced.                                                    |
| `assets/shoppy-x-ray.svg`        | Removed.                                                     |
| `sections/hello-world.liquid`    | Removed.                                                     |
| `sections/custom-section.liquid` | Removed.                                                     |
| `templates/index.json`           | Demo section reference removed; template has no sections.    |
| All other imported theme files   | Reformatted with Prettier; no functional change.             |
