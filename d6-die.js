export class D6Die {

    static getHtml() {
        return `
<div id="die">
    <div class="face face-1"></div>
    <div class="face face-2"></div>
    <div class="face face-3"></div>
    <div class="face face-4"></div>
    <div class="face face-5"></div>
    <div class="face face-6"></div>
</div>
`
    }

    static getCss() {
        return `
<style>
#die {
  height: var(--die-size);
  width: var(--die-size);
  transition: transform var(--roll-time) ease-out, scale 0.2s ease-out;
  transform-style: preserve-3d;
  transform-origin: center center calc((var(--die-size) / 2) * -1);
  scale: 0.7;
}

.face {
  position: absolute;
  width: calc(var(--die-size));
  height: calc(var(--die-size));
  box-shadow: 0 0 15px rgba(100, 100, 100, 0.5);
  background: var(--die-color-even);
}


.face:after {
  content: "";
  position: absolute;
  width: calc(var(--die-size) / 5);
  height: calc(var(--die-size) / 5);
  border-radius: 50%;
  background: var(--value-color);
  left: 25%;
  top: 25%;
  transform: translate(-50%, -50%);
}

.face-1:after {
  left: 50%;
  top: 50%;
}

.face-2:after {
  box-shadow: calc(var(--die-size) / 2) calc(var(--die-size) / 2) var(--value-color);
}

.face-3:after {
  box-shadow: calc(var(--die-size) / 2) calc(var(--die-size) / 2) var(--value-color), calc(var(--die-size) / 4) calc(var(--die-size) / 4) var(--value-color);
}

.face-4:after {
  box-shadow: 0 calc(var(--die-size) / 2) var(--value-color), calc(var(--die-size) / 2) 0 var(--value-color), calc(var(--die-size) / 2) calc(var(--die-size) / 2) var(--value-color);
}

.face-5:after {
  box-shadow: 0 calc(var(--die-size) / 2) var(--value-color), calc(var(--die-size) / 2) 0 var(--value-color), calc(var(--die-size) / 2) calc(var(--die-size) / 2) var(--value-color), calc(var(--die-size) / 4) calc(var(--die-size) / 4) var(--value-color);
}

.face-6:after {
  box-shadow: 0 calc(var(--die-size) / 2) var(--value-color), calc(var(--die-size) / 2) 0 var(--value-color), calc(var(--die-size) / 2) calc(var(--die-size) / 2) var(--value-color), 0 calc(var(--die-size) / 4) var(--value-color), calc(var(--die-size) / 2) calc(var(--die-size) / 4) var(--value-color);
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

#die {
    transform: rotateX(0.12turn) rotateY(0.12turn) rotateZ(0) translateZ(calc((var(--die-size)) * -1));
}

#die:hover {
  cursor: grab;
}

#die:active {
  cursor: grabbing;
}

#die[data-face="1"] {
  transform: rotateX(1turn) rotateY(1.5turn) rotateZ(var(--total-rolls)) translateZ(calc((var(--die-size)) * -1));
}

#die[data-face="2"] {
  transform: rotateX(1turn) rotateY(1.25turn) rotateZ(var(--total-rolls)) translateZ(calc((var(--die-size)) * -1));
}

#die[data-face="3"] {
  transform: rotateX(1.75turn) rotateY(1turn) rotateZ(var(--total-rolls)) translateZ(calc((var(--die-size)) * -1)) !important;
}

#die[data-face="4"] {
  transform: rotateX(1.25turn) rotateY(1turn) rotateZ(var(--total-rolls)) translateZ(calc((var(--die-size)) * -1)) !important;
}

#die[data-face="5"] {
  transform: rotateX(1turn) rotateY(1.75turn) rotateZ(var(--total-rolls)) translateZ(calc((var(--die-size)) * -1)) !important;
}

#die[data-face="6"] {
  transform: rotateX(1turn) rotateY(1turn) rotateZ(var(--total-rolls)) translateZ(calc((var(--die-size)) * -1)) !important;
}
</style>
`
    }
}
