# Cart drawer

The cart drawer (`sections/cart-drawer.liquid`, `assets/cart-drawer.js`) shows the cart in a modal dialog and changes
it through the Cart API with bundled section rendering. Every request returns the re-rendered `cart-drawer`,
`cart-icon-bubble` and `cart-live-region-text` sections, so the drawer, the header's cart count and the screen reader
announcement come from one response. The cart page `/cart` works without JavaScript and is the fallback for every
state the drawer cannot handle.

## How changes are processed

- **One request at a time.** All cart requests go through one promise queue, so the server receives them in the order
  the customer made them.
- **Coalesced quantity changes.** A quantity change records the desired quantity for its line key. While a request is
  running, further clicks only overwrite the desired quantity; when the request finishes, the next one sends the
  latest value. Five quick clicks on "+" therefore end in the quantity the customer sees, never in an intermediate one.
- **Render only the latest state.** A response is rendered only when no other change is waiting. Responses in
  between update the last confirmed snapshot but do not replace the quantity the customer is in the middle of changing.
- **Rollback to the last confirmed state.** On an error the drawer and the cart count return to the last state the
  server confirmed. Only quantity fields and removals are optimistic, and both are restored by that snapshot.

## States

| State                         | What the customer sees                                                                                            |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Empty cart                    | "Your cart is empty." and a "Continue shopping" link to all products.                                             |
| Adding                        | The "Add to cart" button is busy (`aria-busy`); a second click sends nothing.                                     |
| Changing a line               | The line is dimmed (`aria-busy`); Checkout is blocked until the change is confirmed.                              |
| Network error or timeout      | The drawer returns to the last confirmed cart and shows a message with "Try again", which resends the change.     |
| Cart API error (422, 400)     | The drawer returns to the last confirmed cart and shows Shopify's message, such as "Cannot find variant".         |
| Other HTTP error              | The drawer returns to the last confirmed cart and shows a general message.                                        |
| Inventory limit               | The server keeps the available quantity; the drawer shows it and says "Only N are available, so your cart has N." |
| Missing section               | If a response has no HTML for one of the three sections, the browser goes to `/cart`.                             |
| Add error on the product page | The message appears under the add-to-cart form; the drawer stays closed.                                          |

## Reproducing each state

Use Chrome DevTools on the storefront with at least one product in the cart. "Console" steps run in the page's
console; `drawer` is `document.querySelector('cart-drawer')`.

1. **Empty cart.** Remove every line in the drawer.
2. **Adding.** Network → throttling "Slow 4G". On a product page click "Add to cart" twice quickly: the Network panel
   shows one request to `/cart/add.js`.
3. **Changing a line and quick changes.** Network → throttling "Slow 4G". In the drawer click "+" five times quickly:
   the line dims, the requests to `/cart/change.js` run one after another, and the drawer ends at the quantity shown
   after the last click. Clicking Checkout during the change does nothing.
4. **Network error and retry.** Change a quantity with Network → "Offline": the drawer returns to the previous
   quantity and shows "Try again". Switch back to "No throttling" and click "Try again".
5. **Cart API error (422).** Console: `drawer.add({ id: 1, quantity: 1 })` returns "Cannot find variant"; on a product
   page, set the variant field to `1` in Elements and click "Add to cart" to see the message under the form.
6. **Cart API error (400).** Console: `drawer.change('', 1)`; Shopify answers 400 and the drawer shows its message.
7. **Other HTTP error.** Network → right-click a `change.js` request → "Override content", set the status to 404 with
   an HTML body, then change a quantity: the drawer shows the general message.
8. **Inventory limit.** In the admin, track inventory for one variant with a quantity of 2, add it to the cart and set
   the quantity to 5 in the drawer: the line shows 2 and the limit message. The demo catalog does not track inventory,
   so this needs a temporary change in the admin.
9. **Missing section.** Override the content of a `change.js` response and replace the value of `"cart-drawer"` in
   `sections` with `null`; the next change opens `/cart`.
