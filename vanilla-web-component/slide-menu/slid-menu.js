class SlideMenu extends HTMLElement {
  constructor() {
    super();
    this._root = this.attachShadow({ 'mode': 'open' })
    // Elements
    this._$frame = null;
    // Data
    this._open = false;
  }

  set open(value) {
    const result = (value === true);
    if (this._open === result) return;
    this._open = result;
    this._render();
  }

  get open() {
    return this._open;
  }

  connectedCallback() {
    this._root.innerHTML = /*html*/`
    <style>
      .frame {
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 1000;
        transition: background-color 300ms ease-in;
      }
      .container {
        width: 80%;
        max-width: 400px;
        background: #FFF;
        height: 100%;
        transform: translateX(-100%);
        will-change: transform;
        transition: transform 300ms ease-in;
        box-shadow: 1px 0 3px rgba(51,51,51,0.25);
      }
      .title {
        display: flex;
        flex-direction: row;
        min-height: 3.2em;
        font-size: 1.5em;
        background-color: #F1F1F1;
        color: #666;
      }
      .title .title-content {
        flex-grow: 1;
        display: flex;
        align-items: center;
        padding-left: 1em;
      }
      .close {
        flex-basis: 100px;
        flex-grow: 0;
        flex-shrink: 0;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        user-select:none;
      }
      .frame.open {
        pointer-events: auto;
        background-color: rgba(0, 0, 0, 0.25);
      }
      .frame.open .container {
        transform: none;
      }
      .content-slot::slotted(a) {
        display: block;
        font-size: 1.2em;
        text-decoration: none;
        line-height: 2.5em;
        padding: 0.5em;
        border-bottom: solid 1px #F1F1F1;
        color: #666;
      }
      .content-slot::slotted(a:hover) {
        color: #000;
      }
      :host([theme = 'red']) .title {
        background-color: #E23F24;
        color: white;
      }
      :host([theme = 'red']) .content-slot::slotted(a:hover) {
        color: #E23F24;
      }
      :host([theme = 'blue']) .title {
        background-color: #0d152d;
        color: white;
      }
      :host([theme = 'blue']) .content-slot::slotted(a:hover) {
        color: #0d152d;
      }
      :host([backdrop="false"]) .frame.open {
        pointer-events: none;
        background-color: inherit;
      }
      :host([backdrop="false"]) .frame.open .container {
        pointer-events: auto;
      }
    </style>
      <div class="frame" data-close="true">
        <nav class="container">
          <div class="title">
            <div class="title-content">
             <slot name="title">Menu</slot>
            </div>
            <a class="close" data-close="true">&#10006;</a>
          </div>
          <div class="content">
            <slot class="content-slot"></slot>
          </div>
        </nav>
      </div>
    `;
    this._$frame = this._root.querySelector('.frame');
    this._$frame.addEventListener('click', (event) =>{
      if(event.target.dataset.close === 'true') {
        this.open = false;
      }
    });
  };
  _render() {
    if(this._$frame != null) {
      if(this._open === true) {
        this._$frame.classList.add('open');
        this.dispatchEvent(new CustomEvent('menu-opened'));
      } else {
        this._$frame.classList.remove('open');
        this.dispatchEvent(new CustomEvent('menu-closed'));
      };
    };
  };
}
window.customElements.define('slide-menu', SlideMenu);