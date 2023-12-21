class D20Die extends HTMLElement {
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
        this.diecoloreven = this.getAttribute('bgcoloreven') || '#ff1e1e';
        this.diecolorodd = this.getAttribute('bgcolorodd') || '#ee1a1a';
        this.dotcolor = this.getAttribute('dotcolor') || '#4b4b4b';
        this.time = this.getAttribute('time') || '2';
        this.animate = this.getAttribute('animate') === '';
        this.lastNumber = +(this.getAttribute('initialvalue') || 0);
        this.allowedRolls = +(this.getAttribute('allowedrolls') ?? 10000);
        this.minrollvalue = +(this.getAttribute('minrollvalue') ?? 1);
        this.maxrollvalue = +(this.getAttribute('maxrollvalue') ?? 20);
        this.isDisabled = this.allowedRolls < 1;
        this.totalRolls = 0;
    }

    rollDice(value) {
        // If a default value is set, we don't count it as a roll and only animate the dice to that value
        if (typeof value === 'number') {
            // Set the title so hovering the cursor shows the value as a number
            this.setAttribute('title', this.lastNumber);
            this.shadowRoot.getElementById('d20').setAttribute('data-face', this.lastNumber);
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
            this.shadowRoot.getElementById('d20').setAttribute('data-face', this.lastNumber);
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
        this.style.setProperty('--die-size',  (this.clientHeight || 50) + 'px');
    }

    render() {
        this.shadowRoot.innerHTML = `
<div id="d20">
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
    <div class="face face-11"></div>
    <div class="face face-12"></div>
    <div class="face face-13"></div>
    <div class="face face-14"></div>
    <div class="face face-15"></div>
    <div class="face face-16"></div>
    <div class="face face-17"></div>
    <div class="face face-18"></div>
    <div class="face face-19"></div>
    <div class="face face-20"></div>
</div>

${this.renderCss()}
        `;
    }

    renderCss() {
        return `
<style>
@keyframes roll {
  10% {
    transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  }
  30% {
    transform: rotateX(120deg) rotateY(240deg) rotateZ(0deg) translateX(40px) translateY(40px);
  }
  50% {
    transform: rotateX(240deg) rotateY(480deg) rotateZ(0deg) translateX(-40px) translateY(-40px);
  }
  70% {
    transform: rotateX(360deg) rotateY(720deg) rotateZ(0deg);
  }
  90% {
    transform: rotateX(480deg) rotateY(960deg) rotateZ(0deg);
  }
}

:host {
  position:relative;
  display:inline-block;
  --die-size: 120px;
  font-family: arial;
}

#d20 {
  width: var(--die-size);
  height: var(--die-size);
  transform-style: preserve-3d;
  transition: transform var(--roll-time) ease-out;
  cursor: pointer;
  transform: rotateX(-53deg);
  
    --size-small: calc(var(--die-size) / 200 * 33.5);
    --size-negative: calc(var(--die-size) / 200 * -12.9);
    --size-large: calc(var(--die-size) / 200 * 121.26);
    --size-medium: calc(var(--die-size) / 200 * 54.18);
    --size-standard: calc(var(--die-size) / 200 * 75);
}
#D20.rolling {
  animation: roll 3s linear;
}
#d20[data-face="1"] {
  transform: rotateX(-53deg) rotateY(0deg);
}
#d20[data-face="2"] {
  transform: rotateX(-53deg) rotateY(72deg);
}
#d20[data-face="3"] {
  transform: rotateX(-53deg) rotateY(144deg);
}
#d20[data-face="4"] {
  transform: rotateX(-53deg) rotateY(216deg);
}
#d20[data-face="5"] {
  transform: rotateX(-53deg) rotateY(288deg);
}
#d20[data-face="16"] {
  transform: rotateX(127deg) rotateY(-72deg);
}
#d20[data-face="17"] {
  transform: rotateX(127deg) rotateY(-144deg);
}
#d20[data-face="18"] {
  transform: rotateX(127deg) rotateY(-216deg);
}
#d20[data-face="19"] {
  transform: rotateX(127deg) rotateY(-288deg);
}
#d20[data-face="20"] {
  transform: rotateX(127deg) rotateY(-360deg);
}
#d20[data-face="6"] {
  transform: rotateX(11deg) rotateZ(180deg) rotateY(0deg);
}
#d20[data-face="7"] {
  transform: rotateX(11deg) rotateZ(180deg) rotateY(72deg);
}
#d20[data-face="8"] {
  transform: rotateX(11deg) rotateZ(180deg) rotateY(144deg);
}
#d20[data-face="9"] {
  transform: rotateX(11deg) rotateZ(180deg) rotateY(216deg);
}
#d20[data-face="10"] {
  transform: rotateX(11deg) rotateZ(180deg) rotateY(288deg);
}
#d20[data-face="11"] {
  transform: rotateX(11deg) rotateY(-252deg);
}
#d20[data-face="12"] {
  transform: rotateX(11deg) rotateY(-324deg);
}
#d20[data-face="13"] {
  transform: rotateX(11deg) rotateY(-396deg);
}
#d20[data-face="14"] {
  transform: rotateX(11deg) rotateY(-468deg);
}
#d20[data-face="15"] {
  transform: rotateX(11deg) rotateY(-540deg);
}
#d20 .face {
  position: absolute;
  left: 50%;
  top: 0;
  margin: 0 calc(calc(var(--die-size) / -4));
  border-left: calc(var(--die-size) / 4) solid transparent;
  border-right: calc(var(--die-size) / 4) solid transparent;
  border-bottom: calc(var(--die-size) / 100 * 43) solid var(--die-color-even);
  width: 0px;
  height: 0px;
  transform-style: preserve-3d;
  counter-increment: steps 1;
}
#d20 .face:nth-child(odd) {
  border-bottom-color: var(--die-color-odd);
}
#d20 .face:before {
  content: counter(steps);
  position: absolute;
  top: calc(var(--die-size) / 10);
  left: calc(var(--die-size) / -2);
  color: var(--dot-color);
  font-size: calc(var(--die-size) / 6);
  text-align: center;
  line-height: calc(var(--die-size) / 2.5);
  width: var(--die-size);
  height: calc(var(--die-size) / 2);
}
#d20 .face:nth-child(6):before, #d20 .face:nth-child(9):before {
  text-decoration: underline;
}
#d20 .face:nth-child(1):before, #d20 .face:nth-child(20):before {
  font-weight: bold;
  font-size: calc(var(--die-size) / 5);
}
#d20 .face:nth-child(1) {
  transform: rotateY(0deg) translateZ(calc(var(--die-size) / 200 * 33.5)) translateY(calc(var(--die-size) / 200 * -12.9)) rotateX(53deg);
}
#d20 .face:nth-child(2) {
  transform: rotateY(-72deg) translateZ(calc(var(--die-size) / 200 * 33.5)) translateY(calc(var(--die-size) / 200 * -12.9)) rotateX(53deg);
}
#d20 .face:nth-child(3) {
  transform: rotateY(-144deg) translateZ(calc(var(--die-size) / 200 * 33.5)) translateY(calc(var(--die-size) / 200 * -12.9)) rotateX(53deg);
}
#d20 .face:nth-child(4) {
  transform: rotateY(-216deg) translateZ(calc(var(--die-size) / 200 * 33.5)) translateY(calc(var(--die-size) / 200 * -12.9)) rotateX(53deg);
}
#d20 .face:nth-child(5) {
  transform: rotateY(-288deg) translateZ(calc(var(--die-size) / 200 * 33.5)) translateY(calc(var(--die-size) / 200 * -12.9)) rotateX(53deg);
}
#d20 .face:nth-child(6) {
  transform: rotateY(360deg) translateZ(calc(var(--die-size) / 200 * 75)) translateY(calc(var(--die-size) / 200 * 54.18)) rotateZ(180deg) rotateX(-11deg);
}
#d20 .face:nth-child(7) {
  transform: rotateY(288deg) translateZ(calc(var(--die-size) / 200 * 75)) translateY(calc(var(--die-size) / 200 * 54.18)) rotateZ(180deg) rotateX(-11deg);
}
#d20 .face:nth-child(8) {
  transform: rotateY(216deg) translateZ(calc(var(--die-size) / 200 * 75)) translateY(calc(var(--die-size) / 200 * 54.18)) rotateZ(180deg) rotateX(-11deg);
}
#d20 .face:nth-child(9) {
  transform: rotateY(144deg) translateZ(calc(var(--die-size) / 200 * 75)) translateY(calc(var(--die-size) / 200 * 54.18)) rotateZ(180deg) rotateX(-11deg);
}
#d20 .face:nth-child(10) {
  transform: rotateY(72deg) translateZ(calc(var(--die-size) / 200 * 75)) translateY(calc(var(--die-size) / 200 * 54.18)) rotateZ(180deg) rotateX(-11deg);
}
#d20 .face:nth-child(11) {
  transform: rotateY(252deg) translateZ(calc(var(--die-size) / 200 * 75)) translateY(calc(var(--die-size) / 200 * 54.18)) rotateX(-11deg);
}
#d20 .face:nth-child(12) {
  transform: rotateY(324deg) translateZ(calc(var(--die-size) / 200 * 75)) translateY(calc(var(--die-size) / 200 * 54.18)) rotateX(-11deg);
}
#d20 .face:nth-child(13) {
  transform: rotateY(396deg) translateZ(calc(var(--die-size) / 200 * 75)) translateY(calc(var(--die-size) / 200 * 54.18)) rotateX(-11deg);
}
#d20 .face:nth-child(14) {
  transform: rotateY(468deg) translateZ(calc(var(--die-size) / 200 * 75)) translateY(calc(var(--die-size) / 200 * 54.18)) rotateX(-11deg);
}
#d20 .face:nth-child(15) {
  transform: rotateY(540deg) translateZ(calc(var(--die-size) / 200 * 75)) translateY(calc(var(--die-size) / 200 * 54.18)) rotateX(-11deg);
}
#d20 .face:nth-child(16) {
  transform: rotateY(-108deg) translateZ(calc(var(--die-size) / 200 * 33.5)) translateY(calc(var(--die-size) / 200 * 121.26)) rotateZ(180deg) rotateX(53deg);
}
#d20 .face:nth-child(17) {
  transform: rotateY(-36deg) translateZ(calc(var(--die-size) / 200 * 33.5)) translateY(calc(var(--die-size) / 200 * 121.26)) rotateZ(180deg) rotateX(53deg);
}
#d20 .face:nth-child(18) {
  transform: rotateY(36deg) translateZ(calc(var(--die-size) / 200 * 33.5)) translateY(calc(var(--die-size) / 200 * 121.26)) rotateZ(180deg) rotateX(53deg);
}
#d20 .face:nth-child(19) {
  transform: rotateY(108deg) translateZ(calc(var(--die-size) / 200 * 33.5)) translateY(calc(var(--die-size) / 200 * 121.26)) rotateZ(180deg) rotateX(53deg);
}
#d20 .face:nth-child(20) {
  transform: rotateY(180deg) translateZ(calc(var(--die-size) / 200 * 33.5)) translateY(calc(var(--die-size) / 200 * 121.26)) rotateZ(180deg) rotateX(53deg);
}
</style>
`
    }
}

customElements.define('d20-die', D20Die);
