/* Cart drawer: opens the drawer dialog and runs cart changes through the Cart API with bundled section rendering. */

const SECTIONS = ['cart-drawer', 'cart-icon-bubble', 'cart-live-region-text'];
const TIMEOUT = 15000;

const parse = (html) => new DOMParser().parseFromString(html, 'text/html');

class CartError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }

  get isNetwork() {
    return this.status === 0;
  }
}

class CartDrawer extends HTMLElement {
  connectedCallback() {
    this.dialog = this.querySelector('dialog');
    this.liveRegion = this.querySelector('[data-cart-live-region]');
    this.message = this.querySelector('[data-cart-message]');
    this.messageText = this.querySelector('[data-cart-message-text]');
    this.retryButton = this.querySelector('[data-cart-retry]');

    this.queue = Promise.resolve();
    this.pending = new Map();
    this.flushing = null;
    this.retry = null;
    this.confirm(this.content, this.bubble);

    this.addEventListener('click', this.onClick);
    this.addEventListener('change', this.onChange);
    this.addEventListener('submit', this.onSubmit);
    document.addEventListener('click', this.onDocumentClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.onClick);
    this.removeEventListener('change', this.onChange);
    this.removeEventListener('submit', this.onSubmit);
    document.removeEventListener('click', this.onDocumentClick);
  }

  get content() {
    return this.querySelector('[data-cart-drawer-content]');
  }

  get bubble() {
    return document.querySelector('#cart-icon-bubble .cart-icon-bubble');
  }

  open() {
    if (!this.dialog.open) this.dialog.showModal();
  }

  close() {
    this.dialog.close();
  }

  add(item) {
    return this.enqueue(async () => {
      const data = await this.request(this.dataset.addUrl, item);
      this.clearMessage();
      this.render(data.sections);
      return data;
    });
  }

  update(body) {
    return this.enqueue(async () => {
      const data = await this.request(this.dataset.updateUrl, body);
      this.render(data.sections, { announce: false });
      return data;
    });
  }

  change(key, quantity) {
    this.pending.set(key, quantity);
    this.querySelector(`[data-line-key="${CSS.escape(key)}"]`)?.setAttribute('aria-busy', 'true');
    this.flushing ??= this.enqueue(() => this.drain()).finally(() => {
      this.flushing = null;
    });
    return this.flushing;
  }

  enqueue(task) {
    const run = this.queue.then(task);
    this.queue = run.catch(() => {});
    return run;
  }

  async drain() {
    this.toggleAttribute('data-busy', true);
    let key;
    let quantity;
    try {
      while (this.pending.size) {
        [key, quantity] = this.pending.entries().next().value;
        this.pending.delete(key);
        const data = await this.request(this.dataset.changeUrl, { id: key, quantity });
        if (this.pending.size) {
          this.confirm(...this.parseSections(data.sections));
        } else {
          this.render(data.sections);
          this.reportLimit(key, quantity, data);
        }
      }
    } catch (error) {
      const failed = new Map([[key, quantity], ...this.pending]);
      this.pending.clear();
      this.rollback();
      this.showError(error, () => failed.forEach((value, lineKey) => this.change(lineKey, value)));
    } finally {
      this.toggleAttribute('data-busy', false);
    }
  }

  async request(url, body) {
    let response;
    try {
      response = await fetch(`${url}.js`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...body, sections: SECTIONS, sections_url: window.location.pathname }),
        signal: AbortSignal.timeout(TIMEOUT),
      });
    } catch {
      throw new CartError('', 0);
    }

    const data = await response.json().catch(() => null);
    if (!response.ok || !data) throw new CartError(data?.description || data?.message || '', response.status);

    if (!data.sections || SECTIONS.some((id) => !data.sections[id])) {
      window.location.assign(this.dataset.cartUrl);
      await new Promise(() => {});
    }
    return data;
  }

  parseSections(sections) {
    return [
      parse(sections['cart-drawer']).querySelector('[data-cart-drawer-content]'),
      parse(sections['cart-icon-bubble']).querySelector('.cart-icon-bubble'),
    ];
  }

  confirm(content, bubble) {
    this.confirmed = { content: content?.cloneNode(true), bubble: bubble?.cloneNode(true) };
  }

  render(sections, { announce = true } = {}) {
    const [content, bubble] = this.parseSections(sections);
    this.confirm(content, bubble);
    this.swap(content, bubble);
    if (announce) this.announce(parse(sections['cart-live-region-text']).body.textContent.trim());
  }

  rollback() {
    this.swap(this.confirmed.content?.cloneNode(true), this.confirmed.bubble?.cloneNode(true));
  }

  swap(content, bubble) {
    const focus = this.focusState();
    if (content) this.content.replaceWith(content);
    if (bubble) document.getElementById('cart-icon-bubble')?.replaceChildren(bubble);
    if (this.dialog.open && !this.contains(document.activeElement)) this.restoreFocus(focus);
  }

  reportLimit(key, requested, data) {
    const quantity = data.items?.find((item) => item.key === key)?.quantity ?? 0;
    if (requested > quantity && quantity > 0) {
      const template = quantity === 1 ? this.dataset.limitedOne : this.dataset.limitedOther;
      this.showMessage(template.replaceAll('{{ count }}', quantity));
    } else {
      this.clearMessage();
    }
  }

  showError(error, retry) {
    const text = error.isNetwork ? this.dataset.networkError : error.message || this.dataset.genericError;
    this.showMessage(text, error.isNetwork ? retry : null);
  }

  showMessage(text, retry = null) {
    this.retry = retry;
    this.retryButton.hidden = !retry;
    this.message.hidden = false;
    this.messageText.textContent = text;
  }

  clearMessage() {
    this.retry = null;
    this.retryButton.hidden = true;
    this.message.hidden = true;
    this.messageText.textContent = '';
  }

  announce(text) {
    this.liveRegion.textContent = '';
    requestAnimationFrame(() => {
      this.liveRegion.textContent = text;
    });
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

    if (event.target.closest('[data-cart-retry]')) {
      const retry = this.retry;
      this.clearMessage();
      retry?.();
      return;
    }

    const remove = event.target.closest('[data-cart-remove]');
    if (!remove) return;
    event.preventDefault();
    this.change(remove.closest('[data-line-key]').dataset.lineKey, 0);
  };

  onChange = (event) => {
    const input = event.target.closest('[data-line-key] input[type="number"]');
    if (!input) return;
    const quantity = Math.max(0, Number.parseInt(input.value, 10) || 0);
    this.change(input.closest('[data-line-key]').dataset.lineKey, quantity);
  };

  onSubmit = (event) => {
    if (this.hasAttribute('data-busy')) event.preventDefault();
  };
}

if (!customElements.get('cart-drawer')) {
  customElements.define('cart-drawer', CartDrawer);
}
