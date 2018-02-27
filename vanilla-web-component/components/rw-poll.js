class RwPoll extends HTMLElement {
  constructor() {
    super();
    this._attached = false;
    this._data = null;
    // {
    //   "question": 'Is this a static question ?',
    //   "answers": ["Yes of course it is", 'No its definitely not']
    // };
    this._selected = null;

    // Elements
    this._$question = null;
    this._$answers = null;
  }
  connectedCallback() {
    this._attached = true;
    this.innerHTML = `
    <div class="rw-poll-container">
      <h3 id="question"></h3>
      <ul id="answers"></ul>
    </div>
    `;
    this._$question = this.querySelector('#question')
    this._$answers = this.querySelector('#answers')
    this._$answers.addEventListener('click', (event) => {
      this._$answers.querySelectorAll('li').forEach(($li, index) => {
        // $li.classList.remove("selected")
        if ($li === event.target) {
          this.selected = index;
          // $li.classList.add("selected")
          console.log('here')
        }
      });
    });

    this._render();
  }

  _render() {
    if (this._attached && this._data != null) {
      this._$answers.innerHTML = '';
      this._$question.innerHTML = this._data.question;
      this._data.answers.forEach((answer) => {
        const $li = document.createElement('li');
        $li.innerHTML = answer;
        this._$answers.appendChild($li);
      });
    }
  }

  // getters and setters
  set data(data) {
    if (this._data === data) return;
    this._data = data;
    this._render()
  }

  get data() {
    return this._data;
  }

  set selected(index) {
    const $answer = this._$answers.querySelector(`li:nth-child(${ index + 1 })`);
    if($answer != null) {
      this._$answers.querySelectorAll('li').forEach(($li)=> {
        $li.classList.remove('selected');
      });
      $answer.classList.add('selected');
      this._selected = index;
    }
  }

  get selected() {
    return this._selected;
  }
}
window.customElements.define('rw-poll', RwPoll);