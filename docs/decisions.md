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
