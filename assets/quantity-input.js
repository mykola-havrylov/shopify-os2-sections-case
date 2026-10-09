/* Quantity control enhancement: minus and plus buttons step the number input and fire its change event. */

class QuantityInput extends HTMLElement {
  connectedCallback() {
    this.input = this.querySelector('input');
    this.decrease = this.querySelector('[data-step="down"]');
    this.addEventListener('click', this.onClick);
    this.input.addEventListener('change', this.onChange);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.onClick);
    this.input.removeEventListener('change', this.onChange);
  }

  onClick = (event) => {
    const button = event.target.closest('[data-step]');
    if (!button) return;
    if (button.dataset.step === 'up') {
      this.input.stepUp();
    } else {
      this.input.stepDown();
    }
    this.input.dispatchEvent(new Event('change', { bubbles: true }));
  };

  onChange = () => {
    this.decrease.disabled = Number(this.input.value) <= Number(this.input.min);
  };
}

if (!customElements.get('quantity-input')) {
  customElements.define('quantity-input', QuantityInput);
}
