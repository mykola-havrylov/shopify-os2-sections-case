/* Horizontal scroll row enhancement: brings a partly visible item fully into view when it receives keyboard focus. */

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

class ScrollRow extends HTMLElement {
  connectedCallback() {
    this.addEventListener('focusin', this.onFocusIn);
  }

  disconnectedCallback() {
    this.removeEventListener('focusin', this.onFocusIn);
  }

  onFocusIn = (event) => {
    const item = [...this.children].find((child) => child.contains(event.target));
    if (!item) return;
    item.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
      behavior: reducedMotion.matches ? 'auto' : 'smooth',
    });
  };
}

if (!customElements.get('scroll-row')) {
  customElements.define('scroll-row', ScrollRow);
}
