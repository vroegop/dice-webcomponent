import './die.js';

class DiceTray extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        this.attachShadow({mode: 'open'});

        this.rotX = 0;
        this.rotY = 0;
        this.rotZ = 0;

        this.render();

        this.addEventListenerToSliders();
    }

    addEventListenerToSliders() {
        const dicetray = this.shadowRoot.querySelector('.dicetray');

        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };
        let rotation = { x: 0, y: 0 };

        const onMouseMove = (event) => {
            if (isDragging) {
                const sensitivity = 0.5; // Change this value to adjust sensitivity
                const dx = event.clientX - previousMousePosition.x;
                const dy = event.clientY - previousMousePosition.y;

                rotation.x += dy * sensitivity * -1;
                rotation.y += dx * sensitivity;

                // Apply the rotation
                dicetray.style.transform = `translateX(-50%) translateY(-50%) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;

                previousMousePosition = { x: event.clientX, y: event.clientY };
            }
        };

        const onMouseDown = (event) => {
            isDragging = true;
            previousMousePosition = { x: event.clientX, y: event.clientY };
        };

        const onMouseUp = () => {
            isDragging = false;
        };

        dicetray.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }

    async render() {
        this.shadowRoot.innerHTML = `
<div>
  <div class="dice-tray">
    <div class="dicetray">
      <div class="side left top-left"></div>
      <div class="side left center-left"></div>
      <div class="side left bottom-left"></div>
      <div class="side right top-right"></div>
      <div class="side right center-right"></div>
      <div class="side right bottom-right"></div>
      <div class="face"></div>
      <div class="dice"><slot>
        <die-3d></die-3d>
        <die-3d max="12"></die-3d>
        <die-3d max="10"></die-3d>
        <die-3d max="8"></die-3d>
        <die-3d max="6"></die-3d>
        <die-3d max="4"></die-3d>
      </slot></div>
    </div>
  </div>
</div>
<style>
    :host {
      --tray-width: 600px;
      --die-size: calc(var(--tray-width) / 5);
      position:relative;
      display:inline-block;
      width: calc(var(--tray-width) * 1.1);
      aspect-ratio: 0.8660254326 / 1;

    }
    
    :host .dice-tray * {
        transform-style: preserve-3d;
        user-select: none;
    }
    
    .dice-tray {
      --tray-side: calc(var(--tray-width) / 500 * 289);
      --side-angle: -90deg;
      --hexagon: polygon(0% 25%, 50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%);
      
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      position: absolute;
      z-index: 9999999999;
      perspective: 40cm;
    }
    
    .dice-tray .dicetray {
      width: var(--tray-width);
      aspect-ratio: 0.8660254326 / 1;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%) rotateX(${this.rotX}deg) rotateY(${this.rotY}deg) rotateZ(${this.rotZ}deg);
      overflow: visible;
    }
    .dice-tray .face {
      width: calc(100% + 10px);
      height: calc(100% + 10px);
      position:absolute;
      left: -7px;
      top: -7px;
      background-image: radial-gradient(green, darkgreen);
      clip-path: var(--hexagon);
    }
   
    
    .dice-tray .dice {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display:flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-around;
        gap: 20px;
    }
    
    /** the inside of the tray side **/
    .dice-tray .side {
      position: absolute;
      width: calc(var(--tray-side) + 2px);
      height: 100px;
      background-image: linear-gradient(saddlebrown, sienna);
      top: -100px;
      transform-origin: left bottom;
      left: calc(50% - 1px);
    }
    .dice-tray .side.top-right {
      transform: rotateZ(30deg) rotateX(var(--side-angle));
    }
    .dice-tray .side.center-right {
      transform: rotateZ(30deg) translateX(var(--tray-side)) rotateZ(60deg) rotateX(var(--side-angle));
    }
    .dice-tray .side.bottom-right {
      transform: rotateZ(30deg) translateX(var(--tray-side)) rotateZ(60deg) translateX(var(--tray-side)) rotateZ(60deg) rotateX(var(--side-angle));
    }
    .dice-tray .side.top-left {
      transform: rotateZ(30deg) translateX(var(--tray-side)) rotateZ(60deg) translateX(var(--tray-side)) rotateZ(60deg) translateX(var(--tray-side)) rotateZ(60deg) rotateX(var(--side-angle));
    }
    .dice-tray .side.center-left {
      transform: rotateZ(30deg) translateX(var(--tray-side)) rotateZ(60deg) translateX(var(--tray-side)) rotateZ(60deg) translateX(var(--tray-side)) rotateZ(60deg) translateX(var(--tray-side)) rotateZ(60deg) rotateX(var(--side-angle));
    }
    .dice-tray .side.bottom-left {
      transform: rotateZ(30deg) translateX(var(--tray-side)) rotateZ(60deg) translateX(var(--tray-side)) rotateZ(60deg) translateX(var(--tray-side)) rotateZ(60deg) translateX(var(--tray-side)) rotateZ(60deg) translateX(var(--tray-side)) rotateZ(60deg) rotateX(var(--side-angle));
    }
    
    /** the outside of the tray side **/
    .dice-tray .side:before {
      content: ' ';
      position: absolute;
      width: 102%;
      height: calc(100% + 3px);
      left: -1%;
      top: 0;
      background-image: linear-gradient(saddlebrown, sienna);
      transform: translateZ(-5px);
    }
    
    /** the top of the tray side **/
    .dice-tray .side:after {
      content: ' ';
      position: absolute;
      width: calc(101%);
      height: 5px;
      left: -1%;
      top: 0;
      background-color: saddlebrown;
      transform-origin: center top;
      transform: rotateX(90deg) translateY(-5px);
  }
</style>
        `;
    }
}

customElements.define('dice-tray', DiceTray);
