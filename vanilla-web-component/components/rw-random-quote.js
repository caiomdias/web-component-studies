class RwRandomQuote extends HTMLElement {
  constructor() {
    super()
    this._quotes = [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam id diam maecenas ultricies mi eget mauris pharetra et.",
      "Integer bibendum metus a maximus tincidunt. Fusce cursus risus mauris, nec viverra velit convallis hendrerit. Donec aliquam hendrerit tellus vitae pretium. Aenean blandit dictum mattis. Phasellus non ipsum ut nunc laoreet fermentum. Fusce in felis ante. Aliquam quis nibh purus. Suspendisse scelerisque aliquet sem, id consequat diam molestie vel. Proin tincidunt magna nibh, ut lobortis risus varius vitae. Morbi condimentum mauris non tellus mattis sodales. Suspendisse vel magna metus. Donec gravida eleifend varius. Proin eget massa lacus.",
      "Proin id euismod nibh. Morbi venenatis justo a tempor pulvinar. In convallis neque et lacinia consectetur. Ut scelerisque gravida ante, quis faucibus magna vehicula at. Curabitur sed nunc pharetra nulla eleifend pellentesque. In condimentum diam vitae urna convallis rutrum. Duis efficitur scelerisque nunc sed elementum. Morbi iaculis auctor iaculis. Mauris non ultrices purus, eu convallis ante. Suspendisse potenti. Fusce varius at massa ut consectetur. Etiam id volutpat odio, nec posuere nunc. Phasellus sed sem vehicula, tempor odio ut, dignissim quam."
    ]
    this._$quote = null;
    this._interval = null;
  }
  connectedCallback() {
    this.innerHTML = `
      <div class="rw-container">
        <h1>Random Quote:</h1>
        <p>"<span id="quote"></span>"</p>
      </div>
    `;
    this._$quote = this.querySelector('#quote')
    this._setInterval(this.getAttribute('interval'));
    this._render();
  }
  _render() {
    if (this._$quote != null) {
      const index = Math.floor(Math.random() * this._quotes.length);
      this.setAttribute('current-index', index);
      this._$quote.innerHTML = this._quotes[index];
    };
  }

  _setInterval(value) {
    console.log(value, 'batman')
    if (this._interval != null) {
      clearInterval(this._interval);
    }

    if (value > 0) {
      this._interval = setInterval(() => this._render(), value);
    }
  }

  static get observedAttributes() {
    return ['interval'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log('here')
    this._setInterval(newValue);
  }

  disconectCallback() {
    clearInterval(this._interval);
  }
}
window.customElements.define('rw-random-quote', RwRandomQuote);