# AI assets

## Demo catalog and hero images

The 30 JPEG files in [`data/images/`](../data/images/) were generated or edited with the built-in
`image_gen.imagegen` tool. The tool did not expose the exact model identifier.

| Date       | Tool                 | Scope                                            | Method                                                     |
| ---------- | -------------------- | ------------------------------------------------ | ---------------------------------------------------------- |
| 2026-10-08 | `image_gen.imagegen` | Initial set: 28 product images and 2 hero images | 16 generated from prompts; 14 edited from saved base JPEGs |
| 2026-10-08 | `image_gen.imagegen` | Four images revised after review, listed below   | Image edits; the other 26 JPEGs were kept unchanged        |

The revision changed:

- `ridge-vase-tall.jpg`: edited from `ridge-vase-short.jpg` to make the vase taller and slimmer.
- `serving-bowl-large.jpg`: edited from `serving-bowl-medium.jpg` to increase frame fill.
- `four-piece-dinner-set-oat.jpg`: edited from its previous version for closer, higher camera framing.
- `four-piece-dinner-set-moss.jpg`: edited from the updated Oat image to change the glaze to Moss.

Prompt sources: [`brief.md`](../data/images/brief.md) and [`prompts.json`](../data/images/prompts.json).
The revised images used edit prompts with adjusted vase proportions and frame fill; these are not part of `brief.md`.

Final JPEGs were resized without stretching and encoded with PowerShell/System.Drawing at quality 90:
products at 1600×2000 px, desktop hero at 2400×1350 px, and mobile hero at 1200×1500 px.
