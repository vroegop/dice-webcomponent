class D10Die extends HTMLElement {
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
        this.diecolor = this.getAttribute('bgcolor') || 'goldenrod';
        this.dotcolor = this.getAttribute('dotcolor') || '#4b4b4b';
        this.time = this.getAttribute('time') || '2';
        this.animate = this.getAttribute('animate') === '';
        this.lastNumber = +(this.getAttribute('initialvalue') || 0);
        this.allowedRolls = +(this.getAttribute('allowedrolls') ?? 10000);
        this.minrollvalue = +(this.getAttribute('minrollvalue') ?? 1);
        this.maxrollvalue = +(this.getAttribute('maxrollvalue') ?? 10);
        this.isDisabled = this.allowedRolls < 1;
        this.totalRolls = 0;
    }

    rollDice(value) {
        // If a default value is set, we don't count it as a roll and only animate the dice to that value
        if (typeof value === 'number') {
            // Set the title so hovering the cursor shows the value as a number
            this.setAttribute('title', this.lastNumber);
            this.shadowRoot.getElementById('d10').setAttribute('data-face', this.lastNumber);
            if (this.isDisabled) {
                this.style.setProperty('--die-color', 'rgb(70, 70, 70)');
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
            this.shadowRoot.getElementById('d10').setAttribute('data-face', this.lastNumber);
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
                    this.style.setProperty('--die-color', 'rgb(70, 70, 70)');
                    this.style.setProperty('--dot-color', 'rgb(155, 155, 155)');
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
        this.style.setProperty('--die-size',  (this.clientHeight || 120) + 'px');
    }

    render() {
        this.shadowRoot.innerHTML = `
  <div id="d10">
    <div class="face face-1"></div>
    <div class="face face-2"></div>
    <div class="face face-3"></div>
    <div class="face face-4"></div>
    <div class="face face-5"></div>
    <div class="face face-6"></div>
    <div class="face face-7"></div>
    <div class="face face-8"></div>
    <div class="face face-9"></div>
    <div class="face face-10"></div>
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

#d10 {
  width: var(--die-size);
  height: var(--die-size);
  transform-style: preserve-3d;
  transition: transform var(--roll-time) ease-out;
  cursor: pointer;
  transform: rotateX(-45deg);
}
#d10[data-face="1"] {
  transform: rotateX(-225deg) rotateY(-72deg) rotatez(var(--total-rolls));
}
#d10 .face.face-1 {
  top: calc(var(--die-size) / 2);
  transform: rotateY(72deg) translateZ(calc(var(--die-size) / 200 * -34)) translateY(calc(var(--die-size) / 200 * -6.96)) rotateZ(180deg) rotateY(180deg) rotateX(45deg);
}
#d10[data-face="2"] {
  transform: rotateX(-45deg) rotateY(72deg) rotatez(var(--total-rolls));
}
#d10 .face.face-2 {
  transform: rotateY(-72deg) translateZ(calc(var(--die-size) / 200 * 34)) translateY(calc(var(--die-size) / 200 * 6.96)) rotateX(45deg);
}
#d10[data-face="3"] {
  transform: rotateX(-225deg) rotateY(-144deg) rotatez(var(--total-rolls));
}
#d10 .face.face-3 {
  top: calc(var(--die-size) / 2);
  transform: rotateY(144deg) translateZ(calc(var(--die-size) / 200 * -34)) translateY(calc(var(--die-size) / 200 * -6.96)) rotateZ(180deg) rotateY(180deg) rotateX(45deg);
}
#d10[data-face="4"] {
  transform: rotateX(-45deg) rotateY(144deg) rotatez(var(--total-rolls));
}
#d10 .face.face-4 {
  transform: rotateY(-144deg) translateZ(calc(var(--die-size) / 200 * 34)) translateY(calc(var(--die-size) / 200 * 6.96)) rotateX(45deg);
}
#d10[data-face="5"] {
  transform: rotateX(-225deg) rotateY(-216deg) rotatez(var(--total-rolls));
}
#d10 .face.face-5 {
  top: calc(var(--die-size) / 2);
  transform: rotateY(216deg) translateZ(calc(var(--die-size) / 200 * -34)) translateY(calc(var(--die-size) / 200 * -6.96)) rotateZ(180deg) rotateY(180deg) rotateX(45deg);
}
#d10[data-face="6"] {
  transform: rotateX(-45deg) rotateY(216deg) rotatez(var(--total-rolls));
}
#d10 .face.face-6 {
  transform: rotateY(-216deg) translateZ(calc(var(--die-size) / 200 * 34)) translateY(calc(var(--die-size) / 200 * 6.96)) rotateX(45deg);
}
#d10[data-face="7"] {
  transform: rotateX(-225deg) rotateY(-288deg) rotatez(var(--total-rolls));
}
#d10 .face.face-7 {
  top: calc(var(--die-size) / 2);
  transform: rotateY(288deg) translateZ(calc(var(--die-size) / 200 * -34)) translateY(calc(var(--die-size) / 200 * -6.96)) rotateZ(180deg) rotateY(180deg) rotateX(45deg);
}
#d10[data-face="8"] {
  transform: rotateX(-45deg) rotateY(288deg) rotatez(var(--total-rolls));
}
#d10 .face.face-8 {
  transform: rotateY(-288deg) translateZ(calc(var(--die-size) / 200 * 34)) translateY(calc(var(--die-size) / 200 * 6.96)) rotateX(45deg);
}
#d10[data-face="9"] {
  transform: rotateX(-225deg) rotateY(-360deg) rotatez(var(--total-rolls));
}
#d10 .face.face-9 {
  top: calc(var(--die-size) / 2);
  transform: rotateY(360deg) translateZ(calc(var(--die-size) / 200 * -34)) translateY(calc(var(--die-size) / 200 * -6.96)) rotateZ(180deg) rotateY(180deg) rotateX(45deg);
}
#d10[data-face="10"] {
  transform: rotateX(-45deg) rotateY(0deg);
}
#d10 .face.face-10 {
  transform: rotateY(0deg) translateZ(calc(var(--die-size) / 200 * 34)) translateY(calc(var(--die-size) / 200 * 6.96)) rotateX(45deg);
}
#d10 .face {
  position: absolute;
  left: 50%;
  top: 0;
  margin: 0 calc(var(--die-size) * -0.25);
  border-left: calc(var(--die-size) / 200 * 52) solid transparent;
  border-right: calc(var(--die-size) / 200 * 52) solid transparent;
  border-bottom: calc(var(--die-size) / 2) solid var(--die-color);
  transform-style: preserve-3d;
  counter-increment: steps 1;
}
#d10 .face:first-child {
  counter-increment: steps 1;
}
#d10 .face:before {
  content: counter(steps);
  position: absolute;
  top: calc(var(--die-size) / 200 * 25);
  left: calc(var(--die-size) / 200 * -52);
  color: var(--dot-color);
  font-size: calc(var(--die-size) / 4);
  text-align: center;
  line-height: calc(var(--die-size) / 2);
  width: calc(var(--die-size) / 200 * 104);
  height: calc(var(--die-size) / 2);
}
#d10 .face:after {
  content: "";
  position: absolute;
  bottom: calc(var(--die-size) / 200 * -124);
  left: calc(var(--die-size) / 200 * -52);
  border-left: calc(var(--die-size) / 200 * 52) solid transparent;
  border-right: calc(var(--die-size) / 200 * 52) solid transparent;
  border-top: calc(var(--die-size) / 200 * 24) solid var(--die-color);
}
</style>
`
    }
}

customElements.define('d10-die', D10Die);
