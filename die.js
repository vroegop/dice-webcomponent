class Die3D extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        this.attachShadow({mode: 'open'});
        // Read custom properties users can set
        this.setInitialValues();
        // Settings these variables before rendering makes sure no unwanted animations happen on load
        this.setCssParameters();
        // Render HTML and CSS
        await this.render();
        // Call rollDice once with this.lastNumber to set a default value set on the component or 0
        this.rollDie(this.lastNumber);
        // Actually roll the die :)
        this.addEventListener('click', () => this.rollDie());
    }

    setInitialValues() {
        this.diecoloreven = this.getAttribute('color-bg-even') || this.getAttribute('color-bg') || 'rgba(255, 155, 0, 0.9)';
        this.diecolorodd = this.getAttribute('color-bg-odd') || this.diecoloreven;
        this.contrastActive = this.getAttribute('contrast-active') || '500%';
        this.valuecolor = this.getAttribute('color-value') || 'white';
        this.diecolorevendisabled = this.getAttribute('color-bg-even-disabled') || this.getAttribute('color-bg-disabled') || 'rgba(135, 135, 135, 1)';
        this.diecolorodddisabled = this.getAttribute('color-bg-odd-disabled') || this.diecolorevendisabled;
        this.valuecolordisabled = this.getAttribute('color-value-disabled') || '#000';
        this.time = this.getAttribute('time') || '2';
        this.lastNumber = +(this.getAttribute('value') || 0);
        this.allowedRolls = +(this.getAttribute('rolls') ?? 10000);
        this.minrollvalue = +(this.getAttribute('min') ?? 1);
        this.maxrollvalue = +(this.getAttribute('max') ?? 20);
        this.isDisabled = this.allowedRolls < 1 || this.getAttribute('disabled') !== null;
        this.totalRolls = 0;
    }

    rollDie(value) {
        // If a default value is set, we don't count it as a roll and only animate the die to that value
        if (typeof value === 'number') {
            // Set the title so hovering the cursor shows the value as a number
            this.setAttribute('title', this.lastNumber);
            this.shadowRoot.getElementById('die').setAttribute('data-face', this.lastNumber);
            this.checkDisabledAndStyle();
            return;
        }
        // If no default value is set, we will simply roll a new value and count the allowed rolls
        if (!this.isDisabled) {
            // Determine new die value, random but between the min and max value specified
            this.lastNumber = value || Math.floor(Math.random() * (this.maxrollvalue - this.minrollvalue + 1) + this.minrollvalue);
            // Dispatch an event so external objects know what the throw was
            this.dispatchEvent(new CustomEvent('selection', {detail: this.lastNumber}));
            // Set the title so hovering the cursor shows the value as a number
            this.setAttribute('title', this.lastNumber);
            // Update the HTML to animate the die to the new value
            this.shadowRoot.getElementById('die').setAttribute('data-face', this.lastNumber);
            // Bookkeeping
            this.allowedRolls -= 1;
            this.totalRolls ++;
            // Make sure the die always rolls, also if the same value is thrown twice
            this.style.setProperty('--total-rolls', ((+this.totalRolls - 1) * Math.floor((+this.time))) + 'turn');
        }
        this.isDisabled = (this.allowedRolls < 1) || this.isDisabled;

        if (this.isDisabled) {
            setTimeout(() => {
                this.checkDisabledAndStyle();
            }, this.time * 1000);
        }
    }

    checkDisabledAndStyle() {
        if (this.isDisabled) {
            this.style.setProperty('--die-color-even', this.diecolorevendisabled);
            this.style.setProperty('--die-color-odd', this.diecolorodddisabled);
            this.style.setProperty('--value-color', this.valuecolordisabled);
        }
    }

    setCssParameters() {
        this.style.setProperty('--roll-time', this.time + 's');
        this.style.setProperty('--die-color-even', this.diecoloreven);
        this.style.setProperty('--die-color-odd', this.diecolorodd);
        this.style.setProperty('--value-color', this.valuecolor);
        this.style.setProperty('--contrast-active', this.contrastActive);
        this.style.setProperty('--total-rolls', ((+this.totalRolls - 1) * Math.floor((+this.time))) + 'turn');
    }

    async render() {
        let dieCode = '';
        if (this.maxrollvalue > 12) {
            dieCode = await this.getD20();
        } else if (this.maxrollvalue > 10) {
            dieCode = await this.getD12();
        } else if (this.maxrollvalue > 8) {
            dieCode = await this.getD10();
        } else if (this.maxrollvalue === 6) {
            dieCode = await this.getD6();
        } else {
            dieCode = await this.getD8();
        }
        this.shadowRoot.innerHTML = `
            ${dieCode}
            <style>
                :host {
                  position:relative;
                  display:inline-block;
                  font-family: arial;
                }
                
                :host * {
                    user-select: none;
                }

                ${[...Array(this.maxrollvalue)].map((_, i) => `
                #die[data-face="${i + 1}"] .face-${i + 1} { 
                  transition: filter var(--roll-time) ease 2s; 
                  filter: contrast(var(--contrast-active)); 
                }
                `).join(' ')}
            </style>
        `;
    }

    async getD20() {
        const { D20Die } = await import('./d20-die.js');
        return `${D20Die.getHtml()} ${D20Die.getCss()}`;
    }

    async getD12() {
        const { D12Die } = await import('./d12-die.js');
        return `${D12Die.getHtml()} ${D12Die.getCss()}`;
    }

    async getD10() {
        const { D10Die } = await import('./d10-die.js');
        return `${D10Die.getHtml()} ${D10Die.getCss()}`;
    }

    async getD8() {
        const { D8D4Die } = await import('./d8-d4-die.js');
        return `${D8D4Die.getHtml(this.maxrollvalue)} ${D8D4Die.getCss()}`;
    }

    async getD6() {
        const { D6Die } = await import('./d6-die.js');
        return `${D6Die.getHtml()} ${D6Die.getCss()}`;
    }
}

customElements.define('die-3d', Die3D);
