/* Variant picker enhancement: option buttons choose the variant and update price, availability, gallery and URL. */

class VariantPicker extends HTMLElement {
  connectedCallback() {
    this.variants = JSON.parse(this.querySelector('[data-variants]').textContent);
    this.select = this.querySelector('select[name="id"]');
    this.root = document.getElementById(`MainProduct-${this.dataset.section}`);
    this.addEventListener('change', this.onChange);
  }

  disconnectedCallback() {
    this.removeEventListener('change', this.onChange);
  }

  onChange = (event) => {
    if (event.target === this.select) return;
    const selected = [...this.querySelectorAll('fieldset')].map(
      (fieldset) => fieldset.querySelector('input:checked')?.value,
    );
    const variant = this.variants.find((item) => item.options.every((value, index) => value === selected[index]));
    this.updateLabels(selected);
    this.update(variant);
  };

  updateLabels(selected) {
    this.querySelectorAll('[data-option-label]').forEach((label, index) => {
      label.textContent = selected[index] ?? '';
    });
  }

  update(variant) {
    const button = this.root.querySelector('[name="add"]');

    if (!variant) {
      button.disabled = true;
      button.textContent = button.dataset.unavailableLabel;
      return;
    }

    this.select.value = String(variant.id);
    this.root.querySelector('[data-price]').innerHTML = variant.price;
    button.disabled = !variant.available;
    button.textContent = variant.available ? button.dataset.addLabel : button.dataset.soldOutLabel;

    const url = new URL(window.location.href);
    url.searchParams.set('variant', variant.id);
    window.history.replaceState({}, '', url);

    this.showMedia(variant.media);
  }

  showMedia(mediaId) {
    if (!mediaId) return;
    const list = this.root.querySelector('[data-media-list]');
    const item = list.querySelector(`[data-media-id="${mediaId}"]`);
    if (!item || item === list.firstElementChild) return;
    list.prepend(item);
    list.scrollTo({ left: 0 });
  }
}

if (!customElements.get('variant-picker')) {
  customElements.define('variant-picker', VariantPicker);
}
