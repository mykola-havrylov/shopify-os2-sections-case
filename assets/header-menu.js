/* Header drawer enhancement: closes the <details> menu with Escape and returns focus to its toggle. */

class HeaderMenu extends HTMLElement {
  connectedCallback() {
    this.details = this.querySelector('details');
    this.summary = this.querySelector('summary');
    this.details.addEventListener('toggle', this.onToggle);
  }

  disconnectedCallback() {
    this.details.removeEventListener('toggle', this.onToggle);
    document.removeEventListener('keydown', this.onKeydown);
  }

  onToggle = () => {
    if (this.details.open) {
      document.addEventListener('keydown', this.onKeydown);
    } else {
      document.removeEventListener('keydown', this.onKeydown);
    }
  };

  onKeydown = (event) => {
    if (event.key !== 'Escape') return;
    this.details.open = false;
    this.summary.focus();
  };
}

if (!customElements.get('header-menu')) {
  customElements.define('header-menu', HeaderMenu);
}
