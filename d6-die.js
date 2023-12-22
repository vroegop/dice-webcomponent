class D6Die extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({mode: 'open'});
        // Read custom properties users can set
        this.setInitialValues();
        // Settings these variables before rendering makes sure no animations happen on load
        this.setStyle();
        // Render HTML and CSS
        this.render();
        // Size is a CSS variable but can only be determined after rendering. This will cause an animation.
        this.setSize();
        // Call rollDie once with this.lastNumber to set a default value
        this.rollDie(this.lastNumber);

        this.addEventListener('click', () => this.rollDie());
    }

    setInitialValues() {
        this.diecolor = this.getAttribute('bgcolor') || 'goldenrod';
        this.dotcolor = this.getAttribute('dotcolor') || '#4b4b4b';
        this.time = this.getAttribute('time') || '2';
        this.animate = this.getAttribute('animate') === '';
        this.lastNumber = +(this.getAttribute('initialvalue') || 0);
        this.allowedRolls = +(this.getAttribute('allowedrolls') ?? 10000);
        this.minrollvalue = +(this.getAttribute('minrollvalue') ?? 1);
        this.maxrollvalue = +(this.getAttribute('maxrollvalue') ?? 6);
        this.isDisabled = this.allowedRolls < 1;
        this.totalRolls = 0;
    }

    rollDie(value) {
        // If a default value is set, we don't count it as a roll and only animate the die to that value
        if (typeof value === 'number') {
            // Set the title so hovering the cursor shows the value as a number
            this.setAttribute('title', this.lastNumber);
            this.shadowRoot.getElementById('d6').classList = [`roll-${this.lastNumber}`];
            if (this.isDisabled) {
                this.style.setProperty('--die-color', 'darkgrey');
                this.style.setProperty('--dot-color', 'grey');
            }
            return;
        }
        // If no default value is set, we will simply roll a new value and count the allowed rolls
        if (!this.isDisabled) {
            // Determine new die value, random but between the min and max value specified
            this.lastNumber = value || Math.floor(Math.random() * (this.maxrollvalue - this.minrollvalue)) + this.minrollvalue + 1;
            // Dispatch an event so external objects know what the throw was
            this.dispatchEvent(new CustomEvent('selection', {detail: this.lastNumber}));
            // Set the title so hovering the cursor shows the value as a number
            this.setAttribute('title', this.lastNumber);
            // Update the HTML to animate the die to the new value
            this.shadowRoot.getElementById('d6').classList = [`roll-${this.lastNumber}`];
            // Bookkeeping
            this.allowedRolls -= 1;
            this.totalRolls ++;
            // Make sure the die always rolls, also if the same value is thrown twice
            this.style.setProperty('--total-rolls', this.totalRolls + 'turn');
        }
        this.isDisabled = this.allowedRolls < 1;

        if (this.isDisabled) {
            setTimeout(() => {
                if (this.isDisabled) {
                    this.style.setProperty('--die-color', 'darkgrey');
                    this.style.setProperty('--dot-color', 'grey');
                }
            }, this.time * 1000);
        }
    }

    setStyle() {
        this.style.setProperty('--roll-time', this.time + 's');
        this.style.setProperty('--die-color', this.diecolor);
        this.style.setProperty('--dot-color', this.dotcolor);
        this.style.setProperty('--total-rolls', this.totalRolls);
    }

    setSize() {
        this.style.setProperty('--die-size',  (this.clientHeight || 50) + 'px');
    }

    render() {
        this.shadowRoot.innerHTML = `
<div id="d6" ${this.animate ? 'animate' : ''}>
    <div class="face face-1"></div>
    <div class="face face-2"></div>
    <div class="face face-3"></div>
    <div class="face face-4"></div>
    <div class="face face-5"></div>
    <div class="face face-6"></div>
</div>

${this.renderCss()}
        `;
    }

    renderCss() {
        return `
<style>    
:host {
  position:relative;
  display:inline-block;
  width:50px;
  height: 50px;
}

#d6 {
  height: var(--die-size);
  width: var(--die-size);
  transition: transform var(--roll-time) ease-out, scale 0.2s ease-out;
  transform-style: preserve-3d;
  transform-origin: center center calc((var(--die-size) / 2) * -1);
  perspective: 200cm;
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

#d6 {
    transform: rotateX(0.12turn) rotateY(0.12turn) rotateZ(0) translateZ(calc((var(--die-size)) * -1));
}

#d6:hover {
  scale: 1.1;
  cursor: grab;
}

#d6:active {
  scale: 1.2;
  cursor: grabbing;
}

#d6.roll-1 {
  transform: rotateX(1turn) rotateY(1.5turn) rotateZ(var(--total-rolls)) translateZ(calc((var(--die-size)) * -1));
}

#d6.roll-2 {
  transform: rotateX(1turn) rotateY(1.25turn) rotateZ(var(--total-rolls)) translateZ(calc((var(--die-size)) * -1));
}

#d6.roll-3 {
  transform: rotateX(1.75turn) rotateY(1turn) rotateZ(var(--total-rolls)) translateZ(calc((var(--die-size)) * -1)) !important;
}

#d6.roll-4 {
  transform: rotateX(1.25turn) rotateY(1turn) rotateZ(var(--total-rolls)) translateZ(calc((var(--die-size)) * -1)) !important;
}

#d6.roll-5 {
  transform: rotateX(1turn) rotateY(1.75turn) rotateZ(var(--total-rolls)) translateZ(calc((var(--die-size)) * -1)) !important;
}

#d6.roll-6 {
  transform: rotateX(1turn) rotateY(1turn) rotateZ(var(--total-rolls)) translateZ(calc((var(--die-size)) * -1)) !important;
}
</style>
`
    }
}

customElements.define('d6-die', D6Die);
