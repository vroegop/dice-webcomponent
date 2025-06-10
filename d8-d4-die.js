export class D8D4Die {
    static getHtml(max = 8) {
        return `
<div id="die" ${max < 5 ? 'class="d4"' : ''}>
    <div class="face face-1"></div>
    <div class="face face-2"></div>
    <div class="face face-3"></div>
    <div class="face face-4"></div>
    <div class="face face-5"></div>
    <div class="face face-6"></div>
    <div class="face face-7"></div>
    <div class="face face-8"></div>
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
}
                
:host:before {
    content: ' ';
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, -50px);
    width: 200px;
    height: 200px;
    border-radius: 50%;
}

#die {
  width: var(--die-size, 90px);
  height: var(--die-size, 90px);
  transform-style: preserve-3d;
  transition: transform var(--roll-time) ease-out;
  cursor: pointer;
  transform: rotateX(-170deg) rotateY(25deg) rotateZ(-1turn) translateX(calc(var(--die-size, 90px) / 120 * -12)) translateY(calc(var(--die-size, 90px) / 120 * 18));
  scale: 1.15;
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
  top: calc(var(--die-size, 90px) / 200 * 144);
  transform: rotateY(270deg) rotateX(224deg);
}
#die .face.face-6 {
  top: calc(var(--die-size, 90px) / 200 * 144);
  transform: rotateY(180deg) rotateX(224deg);
}
#die .face.face-7 {
  top: calc(var(--die-size, 90px) / 200 * 144);
  transform: rotateY(90deg) rotateX(224deg);
}
#die .face.face-8 {
  top: calc(var(--die-size, 90px) / 200 * 144);
  transform: rotateX(224deg) rotateY(0deg);
}

#die[data-face="1"] {
  transform: rotateX(-43deg) rotateY(0deg) rotatez(var(--total-rolls)) translateX(calc(var(--die-size, 90px) / 120 * -12)) translateY(calc(var(--die-size, 90px) / 120 * 16));
}

#die[data-face="2"] {
  transform: rotateX(-43deg) rotateY(270deg) rotatez(var(--total-rolls)) translateY(calc(var(--die-size, 90px) / 120 * 4));
}

#die[data-face="3"] {
  transform: rotateX(-43deg) rotateY(180deg) rotatez(var(--total-rolls)) translateX(calc(var(--die-size, 90px) / 120 * -12)) translateY(calc(var(--die-size, 90px) / 120 * 16));
}

#die[data-face="4"] {
  transform: rotateX(-43deg) rotateY(90deg) rotatez(var(--total-rolls)) translateY(calc(var(--die-size, 90px) / 120 * 28));
}

#die[data-face="5"] {
  transform: rotateX(136deg) rotateY(90deg) rotatez(var(--total-rolls)) translateY(calc(var(--die-size, 90px) / 120 * 26)) translateZ(calc(var(--die-size, 90px) / 120 * -1));
}

#die[data-face="6"] {
  transform: rotateX(136deg) rotateY(180deg) rotatez(var(--total-rolls)) translateY(calc(var(--die-size, 90px) / 120 * 16)) translateX(calc(var(--die-size, 90px) / 120 * -12));
}

#die[data-face="7"] {
  transform: rotateX(136deg) rotateY(270deg) rotatez(var(--total-rolls)) translateY(calc(var(--die-size, 90px) / 120 * 4));
}

#die[data-face="8"] {
  transform: rotateX(136deg) rotateY(0deg) rotatez(var(--total-rolls)) translateY(calc(var(--die-size, 90px) / 120 * 16)) translateX(calc(var(--die-size, 90px) / 120 * -13));
}

#die .face {
  position: absolute;
  left: 50%;
  top: 0;
  margin: 0 calc(var(--die-size, 90px) * -0.25);
  border-left: calc(var(--die-size, 90px) / 200 * 70) solid transparent;
  border-right: calc(var(--die-size, 90px) / 200 * 70) solid transparent;
  border-bottom: calc(var(--die-size, 90px) / 2) solid var(--die-color-even);
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
  top: calc(var(--die-size, 90px) / 200 * 15);
  left: calc(var(--die-size, 90px) / 200 * -52);
  color: var(--value-color);
  font-size: calc(var(--die-size, 90px) / 4);
  text-align: center;
  line-height: calc(var(--die-size, 90px) / 2);
  width: calc(var(--die-size, 90px) / 200 * 104);
  height: calc(var(--die-size, 90px) / 2);
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