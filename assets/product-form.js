/* Product form enhancement: adds the variant to the cart drawer through the Cart API instead of leaving the page. */

class ProductForm extends HTMLElement {
  connectedCallback() {
    this.form = this.querySelector('form');
    this.error = this.querySelector('[data-product-form-error]');
    this.form.addEventListener('submit', this.onSubmit);
  }

  disconnectedCallback() {
    this.form.removeEventListener('submit', this.onSubmit);
  }

  onSubmit = async (event) => {
    const drawer = document.querySelector('cart-drawer');
    if (!drawer || typeof drawer.add !== 'function') return;
    event.preventDefault();

    const button = this.form.querySelector('[type="submit"]');
    if (button.getAttribute('aria-busy') === 'true') return;

    const data = new FormData(this.form);
    button.setAttribute('aria-busy', 'true');
    this.error.textContent = '';

    try {
      await drawer.add({ id: Number(data.get('id')), quantity: Number(data.get('quantity')) || 1 });
      drawer.open();
    } catch (error) {
      this.error.textContent =
        error.status === 0 ? this.error.dataset.network : error.message || this.error.dataset.fallback;
    } finally {
      button.removeAttribute('aria-busy');
    }
  };
}

if (!customElements.get('product-form')) {
  customElements.define('product-form', ProductForm);
}
