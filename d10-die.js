export class D10Die {
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
  transform: rotateX(360deg) rotateY(320deg) rotateZ(0) translateY(calc(var(--die-size, 90px) / 120 * 5));
  scale: 1.2;
}
#die[data-face="1"] {
  transform: rotateX(-225deg) rotateY(-72deg) rotatez(var(--total-rolls));
}
#die .face.face-1 {
  top: calc(var(--die-size, 90px) / 2);
  transform: rotateY(72deg) translateZ(calc(var(--die-size, 90px) / 200 * -34)) translateY(calc(var(--die-size, 90px) / 200 * -6.96)) rotateZ(180deg) rotateY(180deg) rotateX(45deg);
}
#die[data-face="2"] {
  transform: rotateX(-45deg) rotateY(72deg) rotatez(var(--total-rolls));
}
#die .face.face-2 {
  transform: rotateY(-72deg) translateZ(calc(var(--die-size, 90px) / 200 * 34)) translateY(calc(var(--die-size, 90px) / 200 * 6.96)) rotateX(45deg);
}
#die[data-face="3"] {
  transform: rotateX(-225deg) rotateY(-144deg) rotatez(var(--total-rolls));
}
#die .face.face-3 {
  top: calc(var(--die-size, 90px) / 2);
  transform: rotateY(144deg) translateZ(calc(var(--die-size, 90px) / 200 * -34)) translateY(calc(var(--die-size, 90px) / 200 * -6.96)) rotateZ(180deg) rotateY(180deg) rotateX(45deg);
}
#die[data-face="4"] {
  transform: rotateX(-45deg) rotateY(144deg) rotatez(var(--total-rolls));
}
#die .face.face-4 {
  transform: rotateY(-144deg) translateZ(calc(var(--die-size, 90px) / 200 * 34)) translateY(calc(var(--die-size, 90px) / 200 * 6.96)) rotateX(45deg);
}
#die[data-face="5"] {
  transform: rotateX(-225deg) rotateY(-216deg) rotatez(var(--total-rolls));
}
#die .face.face-5 {
  top: calc(var(--die-size, 90px) / 2);
  transform: rotateY(216deg) translateZ(calc(var(--die-size, 90px) / 200 * -34)) translateY(calc(var(--die-size, 90px) / 200 * -6.96)) rotateZ(180deg) rotateY(180deg) rotateX(45deg);
}
#die[data-face="6"] {
  transform: rotateX(-45deg) rotateY(216deg) rotatez(var(--total-rolls));
}
#die .face.face-6 {
  transform: rotateY(-216deg) translateZ(calc(var(--die-size, 90px) / 200 * 34)) translateY(calc(var(--die-size, 90px) / 200 * 6.96)) rotateX(45deg);
}
#die[data-face="7"] {
  transform: rotateX(-225deg) rotateY(-288deg) rotatez(var(--total-rolls));
}
#die .face.face-7 {
  top: calc(var(--die-size, 90px) / 2);
  transform: rotateY(288deg) translateZ(calc(var(--die-size, 90px) / 200 * -34)) translateY(calc(var(--die-size, 90px) / 200 * -6.96)) rotateZ(180deg) rotateY(180deg) rotateX(45deg);
}
#die[data-face="8"] {
  transform: rotateX(-45deg) rotateY(288deg) rotatez(var(--total-rolls));
}
#die .face.face-8 {
  transform: rotateY(-288deg) translateZ(calc(var(--die-size, 90px) / 200 * 34)) translateY(calc(var(--die-size, 90px) / 200 * 6.96)) rotateX(45deg);
}
#die[data-face="9"] {
  transform: rotateX(-225deg) rotateY(-360deg) rotatez(var(--total-rolls));
}
#die .face.face-9 {
  top: calc(var(--die-size, 90px) / 2);
  transform: rotateY(360deg) translateZ(calc(var(--die-size, 90px) / 200 * -34)) translateY(calc(var(--die-size, 90px) / 200 * -6.96)) rotateZ(180deg) rotateY(180deg) rotateX(45deg);
}
#die[data-face="10"] {
  transform: rotateX(-45deg) rotateY(0deg) rotatez(var(--total-rolls));
}
#die .face.face-10 {
  transform: rotateY(0deg) translateZ(calc(var(--die-size, 90px) / 200 * 34)) translateY(calc(var(--die-size, 90px) / 200 * 6.96)) rotateX(45deg);
}
#die .face {
  position: absolute;
  left: 50%;
  top: 0;
  margin: 0 calc(var(--die-size, 90px) * -0.25);
  border-left: calc(var(--die-size, 90px) / 200 * 52) solid transparent;
  border-right: calc(var(--die-size, 90px) / 200 * 52) solid transparent;
  border-bottom: calc(var(--die-size, 90px) / 2) solid var(--die-color-even);
  transform-style: preserve-3d;
  counter-increment: steps 1;
}
#die .face:first-child {
  counter-increment: steps 1;
}
#die .face:before {
  content: counter(steps);
  position: absolute;
  top: calc(var(--die-size, 90px) / 200 * 25);
  left: calc(var(--die-size, 90px) / 200 * -52);
  color: var(--value-color);
  font-size: calc(var(--die-size, 90px) / 4);
  text-align: center;
  line-height: calc(var(--die-size, 90px) / 2);
  width: calc(var(--die-size, 90px) / 200 * 104);
  height: calc(var(--die-size, 90px) / 2);
}
#die .face:after {
  content: "";
  position: absolute;
  bottom: calc(var(--die-size, 90px) / 200 * -124);
  left: calc(var(--die-size, 90px) / 200 * -53);
  border-left: calc(var(--die-size, 90px) / 200 * 53) solid transparent;
  border-right: calc(var(--die-size, 90px) / 200 * 53) solid transparent;
  border-top: calc(var(--die-size, 90px) / 200 * 25) solid var(--die-color-even);
}
</style>
`
    }
}
