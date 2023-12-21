declare class D6Die extends HTMLElement {
    constructor();
}

declare global {
    interface HTMLElementTagNameMap {
        'd6-die': D6Die;
    }
}

export {};