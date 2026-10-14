# Quality

Results of the checks run on the theme. Browser checks ran against a development preview of the theme (`shopify theme
dev`) in headless Chrome with an empty cart at the start of each run; performance numbers from that preview are not
production results and are not listed here.

## Lighthouse

Lighthouse 13.4.1 in Chrome DevTools on the published theme, incognito, one or two runs per page and form factor (mobile:
simulated slow 4G and 4× CPU slowdown; desktop: default desktop settings). Ranges cover both runs where there were two.

| Page                  | Form factor | Performance | Accessibility | Best practices | SEO | LCP       | CLS | TBT        |
| --------------------- | ----------- | ----------- | ------------- | -------------- | --- | --------- | --- | ---------- |
| Home                  | Mobile      | 95          | 100           | 100            | 100 | 2.6 s     | 0   | 110 ms     |
| Collection (Mugs)     | Mobile      | 96–97       | 100           | 100            | 100 | 2.0–2.1 s | 0   | 100–150 ms |
| Product (tea cup)     | Mobile      | 96–98       | 100           | 100            | 100 | 1.9–2.0 s | 0   | 80–160 ms  |
| Home                  | Desktop     | 99          | 100           | 100            | 100 | 0.8–0.9 s | 0   | 0 ms       |
| Collection (Mugs)     | Desktop     | 100         | 100           | 100            | 100 | 0.6 s     | 0   | 0 ms       |
| Product (cereal bowl) | Desktop     | 100         | 100           | 100            | 100 | 0.7 s     | 0   | 0 ms       |

## Static checks

| Check                                     | Result               |
| ----------------------------------------- | -------------------- |
| Theme Check (`theme-check:recommended`)   | 77 files, 0 offenses |
| Prettier (`npm run format:check`)         | All files formatted  |
| ESLint (`npm run lint`)                   | 0 problems           |
| Hardcoded `cdn.shopify.com` or store URLs | None in theme files  |
| UI text outside `locales/*.json`          | None                 |

## Accessibility (axe-core 4.10.2)

Rules: WCAG 2.0 A/AA, WCAG 2.1 A/AA and best practices, at 1280×800 and 375×812.

| Page                       | Violations | Needs manual review                          |
| -------------------------- | ---------- | -------------------------------------------- |
| Home                       | 0          | Colour contrast of hero text over the image¹ |
| Collection                 | 0          | —                                            |
| Product                    | 0          | —                                            |
| About                      | 0          | —                                            |
| Cart page                  | 0          | —                                            |
| Cart drawer open (home)    | 0          | Colour contrast behind the backdrop²         |
| Cart drawer open (product) | 0          | Colour contrast behind the backdrop²         |

¹ Measured from screenshots: the paragraph text over the hero overlay averages 5.9:1 on desktop and 6.5:1 on mobile,
and at least 4.5:1 for 90% of the area behind the text.

² The drawer uses the same colour tokens as the rest of the theme; every text pair in every scheme is 4.5:1 or more
([design.md](design.md#contrast)).

## Keyboard

- Home: every link and control is reachable in visual order, from the skip link through the header, hero, collection
  cards, feature banner, FAQ and footer, each with a visible 2px focus ring.
- Product page: glaze options change with the arrow keys and update the price and the `?variant=` URL; quantity and
  "Add to cart" are reachable; the cart drawer opens with focus inside it, keeps focus inside, and Escape returns focus
  to "Add to cart".
- Cart drawer: quantity buttons keep focus after the drawer re-renders; removing a line moves focus to the close
  button.
- Mobile menu (375px): opens from the menu button, keeps focus in the menu and the header while the page behind is
  inert, locks page scrolling, and closes with Escape with focus back on the menu button.
- FAQ: Enter and Space open and close a question; opening one closes the others.

## Without JavaScript

- Product page: the variant is chosen in a native select and "Add to cart" goes to `/cart` with the item.
- Cart page: quantities change with "Update cart", lines are removed with "Remove", Checkout submits the cart form.
- Mobile menu, FAQ and collection pagination work as native `<details>` and links.

## Reduced motion

With `prefers-reduced-motion: reduce`, no element on home, collection, product or About animates or transitions for
longer than 1ms, including the cart drawer slide-in, the FAQ chevron and button hover transitions.

## Images

| Page       | `fetchpriority="high"`          | Above-the-fold images                  |
| ---------- | ------------------------------- | -------------------------------------- |
| Home       | 1: the hero image               | Hero eager; collection and banner lazy |
| Collection | 1: the first product card       | First row eager                        |
| Product    | 1: the selected variant's image | First gallery image eager, others lazy |
| About      | 0                               | Story image eager (second section)     |

No broken images and no horizontal overflow on any page at 375, 768, 1280, 1440 or 2560px wide.

## Console

No errors or warnings from the theme's own assets on any page. The remaining console entries come from Shopify
platform scripts and the account component.
