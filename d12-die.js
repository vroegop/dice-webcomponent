export class D12Die {
    static getHtml() {
        return `
  <div id="die">
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
  transform: rotateX(10deg) rotateY(-60deg) rotateZ(-1turn) translateX(calc(var(--die-size, 90px) / 120 * 3)) translateY(calc(var(--die-size, 90px) / 120 * 18));
  scale: 1.25;
}
#die .face.face-1 {
  transform: rotateX(44deg) rotateY(0deg);
}
#die .face.face-2 {
  top: calc(var(--die-size, 90px) / 200 * 144);
  transform: rotateY(-60deg) rotateX(224deg);
}
#die .face.face-3 {
  transform: rotateY(300deg) rotateX(-224deg) rotateZ(180deg);
}
#die .face.face-4 {
  transform: rotateY(300deg) rotateX(44deg);
}
#die .face.face-5 {
  top: calc(var(--die-size, 90px) / 200 * 144);
  transform: rotateY(240deg) rotateX(224deg);
}
#die .face.face-6 {
  top: calc(var(--die-size, 90px) / 200 * 144);
  transform: rotateY(180deg) rotateX(224deg);
}
#die .face.face-7 {
  top: calc(var(--die-size, 90px) / 200 * 144);
  transform: rotateY(120deg) rotateX(224deg);
}
#die .face.face-8 {
  top: calc(var(--die-size, 90px) / 200 * 144);
  transform:  rotateY(60deg) rotateX(224deg);
}
#die .face.face-9 {
  top: calc(var(--die-size, 90px) / 200 * 144);
  transform: rotateX(224deg) rotateY(0deg);
}
#die .face.face-10 {
  transform: rotateX(-44deg) rotateY(180deg);
}
#die .face.face-11 {
  transform: rotateY(60deg) rotateX(-224deg) rotateZ(180deg);
}
#die .face.face-12 {
  transform: rotateY(60deg) rotateX(44deg);
}
#die[data-face="1"] {
  transform: rotateX(-43deg) rotateY(0deg) rotatez(var(--total-rolls)) translateX(calc(var(--die-size, 90px) / 120 * 5)) translateY(calc(var(--die-size, 90px) / 120 * 16));
}
#die[data-face="2"] {
  transform: rotateX(137deg) rotateY(60deg) rotatez(var(--total-rolls)) translateX(calc(var(--die-size, 90px) / 120 * 2)) translateY(calc(var(--die-size, 90px) / 120 * 12));
}
#die[data-face="3"] {
  transform: rotateX(-43deg) rotateY(240deg) rotatez(var(--total-rolls)) translateX(calc(var(--die-size, 90px) / 120 * 10)) translateY(calc(var(--die-size, 90px) / 120 * 14));
}
#die[data-face="4"] {
  transform: rotateX(-43deg) rotateY(60deg) rotatez(var(--total-rolls)) translateX(calc(var(--die-size, 90px) / 120 * 2)) translateY(calc(var(--die-size, 90px) / 120 * 16));
}
#die[data-face="5"] {
  transform: rotateX(137deg) rotateY(120deg) rotatez(var(--total-rolls)) translateX(calc(var(--die-size, 90px) / 120 * 2)) translateY(calc(var(--die-size, 90px) / 120 * 10));
}
#die[data-face="6"] {
  transform: rotateX(137deg) rotateY(180deg) rotatez(var(--total-rolls)) translateX(calc(var(--die-size, 90px) / 120 * 6)) translateY(calc(var(--die-size, 90px) / 120 * 16));
}
#die[data-face="7"] {
  transform: rotateX(137deg) rotateY(240deg) rotatez(var(--total-rolls)) translateX(calc(var(--die-size, 90px) / 120 * 0)) translateY(calc(var(--die-size, 90px) / 120 * 17));
}
#die[data-face="8"] {
  transform: rotateX(137deg) rotateY(300deg) rotatez(var(--total-rolls)) translateX(calc(var(--die-size, 90px) / 120 * 6)) translateY(calc(var(--die-size, 90px) / 120 * 10));
}
#die[data-face="9"] {
  transform: rotateX(137deg) rotateY(0deg) rotatez(var(--total-rolls)) translateX(calc(var(--die-size, 90px) / 120 * 6)) translateY(calc(var(--die-size, 90px) / 120 * 16));
}
#die[data-face="10"] {
  transform: rotateX(-43deg) rotateY(180deg) rotatez(var(--total-rolls)) translateX(calc(var(--die-size, 90px) / 120 * 7)) translateY(calc(var(--die-size, 90px) / 120 * 18));
}
#die[data-face="11"] {
  transform: rotateX(-43deg) rotateY(120deg) rotatez(var(--total-rolls)) translateX(calc(var(--die-size, 90px) / 120 * 4)) translateY(calc(var(--die-size, 90px) / 120 * 14));
}
#die[data-face="12"] {
  transform: rotateX(-43deg) rotateY(300deg) rotatez(var(--total-rolls)) translateX(calc(var(--die-size, 90px) / 120 * 2)) translateY(calc(var(--die-size, 90px) / 120 * 18));
}

#die .face {
  position: absolute;
  left: 50%;
  top: 0;
  margin: 0 calc(var(--die-size, 90px) * -0.25);
  border-left: calc(var(--die-size, 90px) / 200 * 41) solid transparent;
  border-right: calc(var(--die-size, 90px) / 200 * 41) solid transparent;
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
  font-size: calc(var(--die-size, 90px) / 5);
  text-align: center;
  line-height: calc(var(--die-size, 90px) / 2);
  width: calc(var(--die-size, 90px) / 200 * 104);
  height: calc(var(--die-size, 90px) / 2);
}

#die.d12 .face.face-5:before {
    content: '1';
}

#die.d12 .face.face-6:before {
    content: '2';
}

#die.d12 .face.face-7:before {
    content: '3';
}

#die.d12 .face.face-8:before {
    content: '4';
}

#die .face:before:nth-child(odd) {
  border-bottom-color: var(--die-color-odd);
}
</style>
`
    }
}
