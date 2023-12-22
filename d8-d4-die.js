class D8D4Die extends HTMLElement {
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
        // Call rollDice once with this.lastNumber to set a default value
        this.rollDice(this.lastNumber);

        this.addEventListener('click', () => this.rollDice());
    }

    setInitialValues() {
        this.diecoloreven = this.getAttribute('bgcoloreven') || this.getAttribute('bgcolor') || 'goldenrod';
        this.diecolorodd = this.getAttribute('bgcolorodd') || this.getAttribute('bgcolor') || 'darkgoldenrod';
        this.dotcolor = this.getAttribute('dotcolor') || '#4b4b4b';
        this.time = this.getAttribute('time') || '2';
        this.animate = this.getAttribute('animate') === '';
        this.lastNumber = +(this.getAttribute('initialvalue') || 0);
        this.allowedRolls = +(this.getAttribute('allowedrolls') ?? 10000);
        this.minrollvalue = +(this.getAttribute('minrollvalue') ?? 1);
        this.maxrollvalue = +(this.getAttribute('maxrollvalue') ?? 8);
        this.isDisabled = this.allowedRolls < 1;
        this.totalRolls = 0;
    }

    rollDice(value) {
        // If a default value is set, we don't count it as a roll and only animate the dice to that value
        if (typeof value === 'number') {
            // Set the title so hovering the cursor shows the value as a number
            this.setAttribute('title', this.lastNumber);
            this.shadowRoot.getElementById('die').setAttribute('data-face', this.lastNumber);
            if (this.isDisabled) {
                this.style.setProperty('--die-color-even', 'rgb(70, 70, 70)');
                this.style.setProperty('--die-color-odd', 'rgb(75, 75, 75)');
                this.style.setProperty('--dot-color', 'rgb(164,164,164)');
            }
            return;
        }
        // If no default value is set, we will simply roll a new value and count the allowed rolls
        if (!this.isDisabled) {
            // Determine new dice value, random but between the min and max value specified
            this.lastNumber = value || Math.floor(Math.random() * (this.maxrollvalue - this.minrollvalue)) + this.minrollvalue + 1;
            // Dispatch an event so external objects know what the throw was
            this.dispatchEvent(new CustomEvent('selection', {detail: this.lastNumber}));
            // Set the title so hovering the cursor shows the value as a number
            this.setAttribute('title', this.lastNumber);
            // Update the HTML to animate the dice to the new value
            this.shadowRoot.getElementById('die').setAttribute('data-face', this.lastNumber);
            // Bookkeeping
            this.allowedRolls -= 1;
            this.totalRolls ++;
            // Make sure the dice always rolls, also if the same value is thrown twice
            this.style.setProperty('--total-rolls', this.totalRolls + 'turn');
        }
        this.isDisabled = this.allowedRolls < 1;

        if (this.isDisabled) {
            setTimeout(() => {
                if (this.isDisabled) {
                    this.style.setProperty('--die-color-even', 'rgb(70, 70, 70)');
                    this.style.setProperty('--die-color-odd', 'rgb(75, 75, 75)');
                    this.style.setProperty('--dot-color', 'rgb(155, 155, 155)');
                }
            }, this.time * 1000);
        }
    }

    setStyle() {
        this.style.setProperty('--roll-time', this.time + 's');
        this.style.setProperty('--die-color-even', this.diecoloreven);
        this.style.setProperty('--die-color-odd', this.diecolorodd);
        this.style.setProperty('--dot-color', this.dotcolor);
        this.style.setProperty('--total-rolls', this.totalRolls);
    }

    setSize() {
        this.style.setProperty('--die-size',  (this.clientHeight || 120) + 'px');
    }

    render() {
        this.shadowRoot.innerHTML = `
  <div id="die" ${this.maxrollvalue < 5 ? 'class="d4"' : ''}>
    <div class="face face-1"></div>
    <div class="face face-2"></div>
    <div class="face face-3"></div>
    <div class="face face-4"></div>
    <div class="face face-5"></div>
    <div class="face face-6"></div>
    <div class="face face-7"></div>
    <div class="face face-8"></div>
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
  font-family: arial;
}

#die {
  width: var(--die-size);
  height: var(--die-size);
  transform-style: preserve-3d;
  transition: transform var(--roll-time) ease-out;
  cursor: pointer;
  transform: rotateX(-20deg) rotateY(40deg) rotateZ(-1turn) translateX(calc(var(--die-size) / 120 * -12)) translateY(calc(var(--die-size) / 120 * 18));
}
#die .face.face-1 {
  transform: rotateX(44deg) rotateY(0deg);
}
#die .face.face-2 {
  transform: rotateY(90deg) rotateX(44deg);
}
#die .face.face-3 {
  transform: rotateX(-44deg) rotateY(180deg);
}
#die .face.face-4 {
  transform: rotateY(270deg) rotateX(44deg);
}
#die .face.face-5 {
  top: calc(var(--die-size) / 200 * 144);
  transform: rotateY(270deg) rotateX(224deg);
}
#die .face.face-6 {
  top: calc(var(--die-size) / 200 * 144);
  transform: rotateY(180deg) rotateX(224deg);
}
#die .face.face-7 {
  top: calc(var(--die-size) / 200 * 144);
  transform: rotateY(90deg) rotateX(224deg);
}
#die .face.face-8 {
  top: calc(var(--die-size) / 200 * 144);
  transform: rotateX(224deg) rotateY(0deg);
}

#die[data-face="1"] {
  transform: rotateX(-43deg) rotateY(0deg) rotatez(var(--total-rolls)) translateX(calc(var(--die-size) / 120 * -12)) translateY(calc(var(--die-size) / 120 * 16));
}

#die[data-face="2"] {
  transform: rotateX(-43deg) rotateY(270deg) rotatez(var(--total-rolls)) translateY(calc(var(--die-size) / 120 * 4));
}

#die[data-face="3"] {
  transform: rotateX(-43deg) rotateY(180deg) rotatez(var(--total-rolls)) translateX(calc(var(--die-size) / 120 * -12)) translateY(calc(var(--die-size) / 120 * 16));
}

#die[data-face="4"] {
  transform: rotateX(-43deg) rotateY(90deg) rotatez(var(--total-rolls)) translateY(calc(var(--die-size) / 120 * 28));
}

#die[data-face="5"] {
  transform: rotateX(136deg) rotateY(90deg) rotatez(var(--total-rolls)) translateY(calc(var(--die-size) / 120 * 26)) translateZ(calc(var(--die-size) / 120 * -1));
}

#die[data-face="6"] {
  transform: rotateX(136deg) rotateY(180deg) rotatez(var(--total-rolls)) translateY(calc(var(--die-size) / 120 * 16)) translateX(calc(var(--die-size) / 120 * -12));
}

#die[data-face="7"] {
  transform: rotateX(136deg) rotateY(270deg) rotatez(var(--total-rolls)) translateY(calc(var(--die-size) / 120 * 4));
}

#die[data-face="8"] {
  transform: rotateX(136deg) rotateY(0deg) rotatez(var(--total-rolls)) translateY(calc(var(--die-size) / 120 * 16)) translateX(calc(var(--die-size) / 120 * -13));
}

#die .face {
  position: absolute;
  left: 50%;
  top: 0;
  margin: 0 calc(var(--die-size) * -0.25);
  border-left: calc(var(--die-size) / 200 * 70) solid transparent;
  border-right: calc(var(--die-size) / 200 * 70) solid transparent;
  border-bottom: calc(var(--die-size) / 2) solid var(--die-color-even);
  transform-style: preserve-3d;
  counter-increment: steps 1;
  transform-origin: top center;
}
#die .face:nth-child(odd) {
  border-bottom-color: var(--die-color-odd);
}
#die .face:before {
  content: counter(steps);
  position: absolute;
  top: calc(var(--die-size) / 200 * 15);
  left: calc(var(--die-size) / 200 * -52);
  color: var(--dot-color);
  font-size: calc(var(--die-size) / 4);
  text-align: center;
  line-height: calc(var(--die-size) / 2);
  width: calc(var(--die-size) / 200 * 104);
  height: calc(var(--die-size) / 2);
}

#die.d4 .face.face-5:before {
    content: '1';
}

#die.d4 .face.face-6:before {
    content: '2';
}

#die.d4 .face.face-7:before {
    content: '3';
}

#die.d4 .face.face-8:before {
    content: '4';
}

#die .face:before:nth-child(odd) {
  border-bottom-color: var(--die-color-odd);
}
</style>
`
    }
}

customElements.define('d8-d4-die', D8D4Die);
