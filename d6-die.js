export class D6Die {

    static getHtml() {
        return `
<div id="die">
    <div class="face face-1">1</div>
    <div class="face face-2">2</div>
    <div class="face face-3">3</div>
    <div class="face face-4">4</div>
    <div class="face face-5">5</div>
    <div class="face face-6">6</div>
</div>
`
    }

    static getCss() {
        return `
<style>
:host, :host * {
  transform-style: preserve-3d;
}

:host {
  transform: translateZ(calc((var(--die-size, 90px) * 0.6)));
  --face-size: calc(var(--die-size, 90px) * 0.7);
  padding: calc(var(--die-size, 90px) * 0.15);
  height: var(--face-size);
  width: var(--face-size);
  display: inline-block;
}
                
:host:before {
    content: ' ';
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, calc(var(--die-size, 90px) * -0.6));
    width: 200px;
    height: 200px;
    border-radius: 50%;
}

#die {
position: absolute;
  height: var(--face-size);
  width: var(--face-size);
  transition: transform var(--roll-time) ease-out, scale 0.2s ease-out;
  transform-style: preserve-3d;
  transform-origin: center center;
  transform: rotateX(2.075turn) rotateY(-0.125turn) rotateZ(var(--total-rolls));
}

.face {
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--face-size);
  height: var(--face-size);
  background: var(--die-color-even);
  color: var(--value-color);
  display:flex;
  justify-content: center;
  align-items: center;
  font-size: calc(var(--face-size) / 2);
}

.face-1 {
  background: var(--die-color-odd);
  transform: translateX(-50%) translateY(-50%) translateZ(calc(var(--face-size) / 2));
}

.face-2 {
    transform: translateX(0%) translateY(-50%) rotateY(0.25turn);
}

.face-3 {
    transform: translateX(-50%) translateY(0%) rotateX(0.75turn);
}

.face-4 {
    transform: translateX(-50%) translateY(-100%) rotateX(0.75turn) rotateY(0.5turn);
}

.face-5 {
    transform: translateX(-100%) translateY(-50%) rotateY(0.25turn) rotateX(0.5turn);
}

.face-6 {
  background: var(--die-color-odd);
  transform: translateX(-50%) translateY(-50%) translateZ(calc(var(--face-size) / -2)) rotateX(0.5turn);
}

#die[data-face="1"] {
  transform: rotateX(1turn) rotateY(0) rotateZ(var(--total-rolls));
}

#die[data-face="2"] {
  transform: rotateX(0turn) rotateY(0.75turn) rotateZ(var(--total-rolls));
}

#die[data-face="3"] {
  transform: rotateX(0.25turn) rotateY(0) rotateZ(var(--total-rolls));
}

#die[data-face="4"] {
  transform: rotateX(0.75turn) rotateY(0.5turn) rotateZ(var(--total-rolls));
}

#die[data-face="5"] {
  transform: rotateX(0.5turn) rotateY(0.75turn) rotateZ(var(--total-rolls));
}

#die[data-face="6"] {
  transform: rotateX(0.5turn) rotateY(0turn) rotateZ(var(--total-rolls));
}
</style>
`
    }
}
