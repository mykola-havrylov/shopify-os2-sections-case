/* Cart drawer: opens the drawer dialog and runs cart changes through the Cart API with bundled section rendering. */

const SECTIONS = ['cart-drawer', 'cart-icon-bubble', 'cart-live-region-text'];

const parse = (html) => new DOMParser().parseFromString(html, 'text/html');

class CartError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class CartDrawer extends HTMLElement {
  connectedCallback() {
    this.dialog = this.querySelector('dialog');
    this.liveRegion = this.querySelector('[data-cart-live-region]');
    this.addEventListener('click', this.onClick);
    this.addEventListener('change', this.onChange);
    document.addEventListener('click', this.onDocumentClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.onClick);
    this.removeEventListener('change', this.onChange);
    document.removeEventListener('click', this.onDocumentClick);
  }

  open() {
    if (!this.dialog.open) this.dialog.showModal();
  }

  close() {
    this.dialog.close();
  }

  add(item) {
    return this.request(this.dataset.addUrl, item);
  }

  change(key, quantity) {
    return this.request(this.dataset.changeUrl, { id: key, quantity });
  }

  update(updates) {
    return this.request(this.dataset.updateUrl, { updates });
  }

  async request(url, body) {
    const response = await fetch(`${url}.js`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...body, sections: SECTIONS, sections_url: window.location.pathname }),
    });
    const data = await response.json();
    if (!response.ok) throw new CartError(data.description || data.message, response.status);
    this.render(data.sections);
    return data;
  }

  render(sections) {
    if (!sections || SECTIONS.some((id) => !sections[id])) {
      window.location.assign(this.dataset.cartUrl);
      return;
    }

    const focus = this.focusState();

    const content = parse(sections['cart-drawer']).querySelector('[data-cart-drawer-content]');
    this.querySelector('[data-cart-drawer-content]').replaceWith(content);

    const bubble = parse(sections['cart-icon-bubble']).querySelector('.cart-icon-bubble');
    document.getElementById('cart-icon-bubble')?.replaceChildren(bubble);

    this.announce(parse(sections['cart-live-region-text']).body.textContent.trim());

    if (this.dialog.open && !this.contains(document.activeElement)) this.restoreFocus(focus);
  }

  focusState() {
    const active = document.activeElement;
    if (!this.contains(active)) return null;
    return { id: active.id, key: active.closest('[data-line-key]')?.dataset.lineKey, step: active.dataset.step };
  }

  restoreFocus(focus) {
    const line = focus?.key && this.querySelector(`[data-line-key="${CSS.escape(focus.key)}"]`);
    const target =
      (line && focus.step && line.querySelector(`[data-step="${focus.step}"]:not(:disabled)`)) ||
      (line && line.querySelector('input')) ||
      (focus?.id && document.getElementById(focus.id)) ||
      this.querySelector('[data-cart-drawer-close]');
    target.focus();
  }

  announce(text) {
    this.liveRegion.textContent = '';
    requestAnimationFrame(() => {
      this.liveRegion.textContent = text;
    });
  }

  onDocumentClick = (event) => {
    const link = event.target.closest('a.cart-icon-bubble');
    if (!link || event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (new URL(link.href).pathname === window.location.pathname) return;
    event.preventDefault();
    this.open();
  };

  onClick = (event) => {
    if (event.target === this.dialog || event.target.closest('[data-cart-drawer-close]')) {
      this.close();
      return;
    }

    const remove = event.target.closest('[data-cart-remove]');
    if (!remove) return;
    event.preventDefault();
    this.change(remove.closest('[data-line-key]').dataset.lineKey, 0).catch(this.onError);
  };

  onChange = (event) => {
    const input = event.target.closest('[data-line-key] input[type="number"]');
    if (!input) return;
    const quantity = Math.max(0, Number.parseInt(input.value, 10) || 0);
    this.change(input.closest('[data-line-key]').dataset.lineKey, quantity).catch(this.onError);
  };

  onError = () => {
    window.location.assign(this.dataset.cartUrl);
  };
}

if (!customElements.get('cart-drawer')) {
  customElements.define('cart-drawer', CartDrawer);
}
