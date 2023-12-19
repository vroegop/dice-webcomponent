declare class D6Die extends HTMLElement {
    lastNumber: number;
    randomBackgrounds: string[];
    randomDots: string[];
    size: string;
    time: string;
    diecolor: string;
    dotcolor: string;

    constructor();

    rollRandom(): void;
    updateStyle(): void;
    render(): void;
}

declare global {
    interface HTMLElementTagNameMap {
        'd6-die': D6Die;
    }
}

export {};