class D6Die extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.lastNumber = 0;
        this.randomBackgrounds = ['green', 'rgba(255, 255, 0, 0.9)', 'linear-gradient(gold, darkgoldenrod)', 'linear-gradient(#ddd, #ccc, #ddd, #eee, #ddd)', 'linear-gradient(#333, #555, #555, #666, #444)', 'rgba(255, 255, 255, 0.85)'];
        this.randomDots = ['gold', 'black', 'white', 'white', 'white', 'rgba(255, 50, 50, 0.9)'];

        this.attachShadow({ mode: 'open' });
        this.render();
        this.updateStyle();
    }

    rollRandom() {
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        this.dispatchEvent(new CustomEvent('selection', { detail: randomNumber }));
        this.shadowRoot.querySelector(`#roll-${randomNumber}`).checked = true;
        this.setAttribute('title', randomNumber);
    }

    updateStyle() {
        const randomNumber = Math.floor(Math.random() * 6);
        this.size = (this.clientHeight || 50) + 'px';
        this.time = this.getAttribute('time') || '2s';
        this.diecolor = this.getAttribute('bgcolor') || this.randomBackgrounds[randomNumber];
        this.dotcolor = this.getAttribute('dotcolor') || this.randomDots[randomNumber];

        this.style.setProperty('--die-size', this.size);
        this.style.setProperty('--roll-time', this.time);
        this.style.setProperty('--die-color', this.diecolor);
        this.style.setProperty('--dot-color', this.dotcolor);
    }

    render() {
        this.shadowRoot.innerHTML = `
  <div class="die">
    <input type="radio" id="roll-1" name="roll" value="1">
    <input type="radio" id="roll-2" name="roll" value="2">
    <input type="radio" id="roll-3" name="roll" value="3">
    <input type="radio" id="roll-4" name="roll" value="4">
    <input type="radio" id="roll-5" name="roll" value="5">
    <input type="radio" id="roll-6" name="roll" value="6">

    <div class="wrapper">
      <div class="dice">
        <div class="face face-1"></div>
        <div class="face face-2"></div>
        <div class="face face-3"></div>
        <div class="face face-4"></div>
        <div class="face face-5"></div>
        <div class="face face-6"></div>
      </div>
    </div>
  </div>
  
  <style>    
    :host {
      position:relative;
      display:inline-block;
      width:50px;
      height: 50px;
    }
    
    .die {
      position: absolute;
      left: 0;
      top: 0;
      width: var(--die-size);
      height: var(--die-size);
    }
    
    [name=roll] {
      display: none;
    }
    
    .wrapper {
      width: var(--die-size);
      height: var(--die-size);
      margin: 0 auto;
      perspective: calc(var(--die-size) * 2);
      position: relative;
      pointer-events: none;
      transform-style: preserve-3d;
    }
    
    .dice {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: calc((var(--die-size) / 2) * -1);
      margin-left: calc((var(--die-size) / 2) * -1);
      height: calc(var(--die-size));
      width: calc(var(--die-size));
      transition: transform var(--roll-time) ease-out;
      transform-style: preserve-3d;
      transform-origin: center center calc((var(--die-size) / 2) * -1);
      pointer-events: none;
    }
    
    .face {
      position: absolute;
      width: calc(var(--die-size));
      height: calc(var(--die-size));
      box-shadow: 0 0 15px rgba(100, 100, 100, 0.5);
      background: var(--die-color);
    }
    
    
    .face:after {
      content: "";
      position: absolute;
      width: calc(var(--die-size) / 5);
      height: calc(var(--die-size) / 5);
      border-radius: 50%;
      background: var(--dot-color);
      left: 25%;
      top: 25%;
      transform: translate(-50%, -50%);
    }
    
    .face-1:after {
      left: 50%;
      top: 50%;
    }
    
    .face-2:after {
      box-shadow: calc(var(--die-size) / 2) calc(var(--die-size) / 2) var(--dot-color);
    }
    
    .face-3:after {
      box-shadow: calc(var(--die-size) / 2) calc(var(--die-size) / 2) var(--dot-color), calc(var(--die-size) / 4) calc(var(--die-size) / 4) var(--dot-color);
    }
    
    .face-4:after {
      box-shadow: 0 calc(var(--die-size) / 2) var(--dot-color), calc(var(--die-size) / 2) 0 var(--dot-color), calc(var(--die-size) / 2) calc(var(--die-size) / 2) var(--dot-color);
    }
    
    .face-5:after {
      box-shadow: 0 calc(var(--die-size) / 2) var(--dot-color), calc(var(--die-size) / 2) 0 var(--dot-color), calc(var(--die-size) / 2) calc(var(--die-size) / 2) var(--dot-color), calc(var(--die-size) / 4) calc(var(--die-size) / 4) var(--dot-color);
    }
    
    .face-6:after {
      box-shadow: 0 calc(var(--die-size) / 2) var(--dot-color), calc(var(--die-size) / 2) 0 var(--dot-color), calc(var(--die-size) / 2) calc(var(--die-size) / 2) var(--dot-color), 0 calc(var(--die-size) / 4) var(--dot-color), calc(var(--die-size) / 2) calc(var(--die-size) / 4) var(--dot-color);
    }
    
    .face-1 {
      transform: rotateY(180deg);
    }
    
    .face-2 {
      transform-origin: left center;
      transform: rotateY(-90deg);
    }
    
    .face-3 {
      transform-origin: top center;
      transform: rotateX(90deg);
    }
    
    .face-4 {
      transform-origin: bottom center;
      transform: rotateX(-90deg);
    }
    
    .face-5 {
      transform-origin: right center;
      transform: rotateY(90deg);
    }
    
    .face-6 {
      transform: translateZ(calc(var(--die-size)));
    }
    
    .wrapper > .dice {
      transform: rotateX(2.6turn) rotateY(2.1turn) rotateZ(0) translateZ(calc((var(--die-size)) * -1));
    }
    
    #roll-1:checked ~ .wrapper > .dice {
      transform: rotateX(1turn) rotateY(-1.5turn) rotateZ(0) translateZ(calc((var(--die-size)) * -1));
    }
    
    #roll-2:checked ~ .wrapper > .dice {
      transform: rotateX(2turn) rotateY(2.25turn) rotateZ(0) translateZ(calc((var(--die-size)) * -1));
    }
    
    #roll-3:checked ~ .wrapper > .dice {
      transform: rotateX(1.75turn) rotateY(2turn) rotateZ(0) translateZ(calc((var(--die-size)) * -1)) !important;
    }
    
    #roll-4:checked ~ .wrapper > .dice {
      transform: rotateX(3.25turn) rotateY(-1turn) rotateZ(0) translateZ(calc((var(--die-size)) * -1)) !important;
    }
    
    #roll-5:checked ~ .wrapper > .dice {
      transform: rotateX(2turn) rotateY(1.75turn) rotateZ(0) translateZ(calc((var(--die-size)) * -1)) !important;
    }
    
    #roll-6:checked ~ .wrapper > .dice {
      transform: rotateX(1turn) rotateY(2turn) rotateZ(0) translateZ(calc((var(--die-size)) * -1)) !important;
    }
  </style>
        `;

        this.addEventListener('click', () => this.rollRandom());
    }
}

customElements.define('d6-die', D6Die);
