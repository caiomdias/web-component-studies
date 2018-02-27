class ComponentSkeleton extends HTMLElement {
  constructor() {
    super();
    // Private variables
    this._private = null;
    // Crate a Shadow Root
    this._root = this.attachShadow({'model': 'open'});
  }

  connectedCallBack() {
    // Add initial template
    this._root.innerHTML = `
      <p id="text">My Web Component Skeleton...</p>
    `;
    this._$text = this._root.querySelector('#text'); // Store important elements for later use (prefixeing DOM elements with "$")
  }
  // Private methods
  _render(){
    this._$text.innerHTML = '...is awesome!'; // Selectively update only parts of the template wiich need to change
  }
  // Observe atribute changes
  static get observedAttributes() {
    return [an-important-attribute];
  }
  // React to attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    // Do stuff
  }
  // use setters and getters to create an API for your component
  set property1(data) {
    if (this._private1 === data) return;
    this._private1 = data;
  }
  get property1() {
    return this._private1;
  }
}
// Use unique but descriptive element and class names
window.customElements.define('component-skeleton', ComponentSkeleton)