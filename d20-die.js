export class D20Die {
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
    <div class="face face-13"></div>
    <div class="face face-14"></div>
    <div class="face face-15"></div>
    <div class="face face-16"></div>
    <div class="face face-17"></div>
    <div class="face face-18"></div>
    <div class="face face-19"></div>
    <div class="face face-20"></div>
</div>
`
    }

    static getCss() {
        return `
<style>
#die {
  width: var(--die-size);
  height: var(--die-size);
  transform-style: preserve-3d;
  transition: transform var(--roll-time) ease-out;
  cursor: pointer;
  transform: rotateX(-210deg);
  scale: 1.25;
  
    --size-small: calc(var(--die-size) / 200 * 33.5);
    --size-negative: calc(var(--die-size) / 200 * -12.9);
    --size-large: calc(var(--die-size) / 200 * 121.26);
    --size-medium: calc(var(--die-size) / 200 * 54.18);
    --size-standard: calc(var(--die-size) / 200 * 75);
}
#die:not([data-face]) {
    transform: rotateX(1turn) rotateY(1turn) rotateZ(0deg);
}
#die[data-face="1"] {
  transform: rotateX(-53deg) rotateY(0deg) rotatez(var(--total-rolls));
}
#die[data-face="2"] {
  transform: rotateX(-53deg) rotateY(72deg) rotatez(var(--total-rolls));
}
#die[data-face="3"] {
  transform: rotateX(-53deg) rotateY(144deg) rotatez(var(--total-rolls));
}
#die[data-face="4"] {
  transform: rotateX(-53deg) rotateY(216deg) rotatez(var(--total-rolls));
}
#die[data-face="5"] {
  transform: rotateX(-53deg) rotateY(288deg) rotatez(var(--total-rolls));
}
#die[data-face="16"] {
  transform: rotateX(127deg) rotateY(-72deg) rotatez(var(--total-rolls));
}
#die[data-face="17"] {
  transform: rotateX(127deg) rotateY(-144deg) rotatez(var(--total-rolls));
}
#die[data-face="18"] {
  transform: rotateX(127deg) rotateY(-216deg) rotatez(var(--total-rolls));
}
#die[data-face="19"] {
  transform: rotateX(127deg) rotateY(-288deg) rotatez(var(--total-rolls));
}
#die[data-face="20"] {
  transform: rotateX(127deg) rotateY(-360deg) rotatez(var(--total-rolls));
}
#die[data-face="6"] {
  transform: rotateX(190deg) rotateY(180deg) rotatez(var(--total-rolls));
}
#die[data-face="7"] {
  transform: rotateX(190deg) rotateY(252deg) rotatez(var(--total-rolls));
}
#die[data-face="8"] {
  transform: rotateX(190deg) rotateY(324deg) rotatez(var(--total-rolls));
}
#die[data-face="9"] {
  transform: rotateX(190deg) rotateY(396deg) rotatez(var(--total-rolls));
}
#die[data-face="10"] {
  transform: rotateX(190deg) rotateY(108deg) rotatez(var(--total-rolls));
}
#die[data-face="11"] {
  transform: rotateX(11deg) rotateY(-252deg) rotatez(var(--total-rolls));
}
#die[data-face="12"] {
  transform: rotateX(11deg) rotateY(-324deg) rotatez(var(--total-rolls));
}
#die[data-face="13"] {
  transform: rotateX(11deg) rotateY(-396deg) rotatez(var(--total-rolls));
}
#die[data-face="14"] {
  transform: rotateX(11deg) rotateY(-468deg) rotatez(var(--total-rolls));
}
#die[data-face="15"] {
  transform: rotateX(11deg) rotateY(-540deg) rotatez(var(--total-rolls));
}
#die .face {
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
#die .face:nth-child(odd) {
  border-bottom-color: var(--die-color-odd);
}
#die .face:before {
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
#die .face:nth-child(6):before, #die .face:nth-child(9):before {
  text-decoration: underline;
}
#die .face:nth-child(1):before, #die .face:nth-child(20):before {
  font-weight: bold;
  font-size: calc(var(--die-size) / 5);
}
#die .face:nth-child(1) {
  transform: rotateY(0deg) translateZ(calc(var(--die-size) / 200 * 33.5)) translateY(calc(var(--die-size) / 200 * -12.9)) rotateX(53deg);
}
#die .face:nth-child(2) {
  transform: rotateY(-72deg) translateZ(calc(var(--die-size) / 200 * 33.5)) translateY(calc(var(--die-size) / 200 * -12.9)) rotateX(53deg);
}
#die .face:nth-child(3) {
  transform: rotateY(-144deg) translateZ(calc(var(--die-size) / 200 * 33.5)) translateY(calc(var(--die-size) / 200 * -12.9)) rotateX(53deg);
}
#die .face:nth-child(4) {
  transform: rotateY(-216deg) translateZ(calc(var(--die-size) / 200 * 33.5)) translateY(calc(var(--die-size) / 200 * -12.9)) rotateX(53deg);
}
#die .face:nth-child(5) {
  transform: rotateY(-288deg) translateZ(calc(var(--die-size) / 200 * 33.5)) translateY(calc(var(--die-size) / 200 * -12.9)) rotateX(53deg);
}
#die .face:nth-child(6) {
  transform: rotateY(360deg) translateZ(calc(var(--die-size) / 200 * 75)) translateY(calc(var(--die-size) / 200 * 54.18)) rotateZ(180deg) rotateX(-11deg);
}
#die .face:nth-child(7) {
  transform: rotateY(288deg) translateZ(calc(var(--die-size) / 200 * 75)) translateY(calc(var(--die-size) / 200 * 54.18)) rotateZ(180deg) rotateX(-11deg);
}
#die .face:nth-child(8) {
  transform: rotateY(216deg) translateZ(calc(var(--die-size) / 200 * 75)) translateY(calc(var(--die-size) / 200 * 54.18)) rotateZ(180deg) rotateX(-11deg);
}
#die .face:nth-child(9) {
  transform: rotateY(144deg) translateZ(calc(var(--die-size) / 200 * 75)) translateY(calc(var(--die-size) / 200 * 54.18)) rotateZ(180deg) rotateX(-11deg);
}
#die .face:nth-child(10) {
  transform: rotateY(72deg) translateZ(calc(var(--die-size) / 200 * 75)) translateY(calc(var(--die-size) / 200 * 54.18)) rotateZ(180deg) rotateX(-11deg);
}
#die .face:nth-child(11) {
  transform: rotateY(252deg) translateZ(calc(var(--die-size) / 200 * 75)) translateY(calc(var(--die-size) / 200 * 54.18)) rotateX(-11deg);
}
#die .face:nth-child(12) {
  transform: rotateY(324deg) translateZ(calc(var(--die-size) / 200 * 75)) translateY(calc(var(--die-size) / 200 * 54.18)) rotateX(-11deg);
}
#die .face:nth-child(13) {
  transform: rotateY(396deg) translateZ(calc(var(--die-size) / 200 * 75)) translateY(calc(var(--die-size) / 200 * 54.18)) rotateX(-11deg);
}
#die .face:nth-child(14) {
  transform: rotateY(468deg) translateZ(calc(var(--die-size) / 200 * 75)) translateY(calc(var(--die-size) / 200 * 54.18)) rotateX(-11deg);
}
#die .face:nth-child(15) {
  transform: rotateY(540deg) translateZ(calc(var(--die-size) / 200 * 75)) translateY(calc(var(--die-size) / 200 * 54.18)) rotateX(-11deg);
}
#die .face:nth-child(16) {
  transform: rotateY(-108deg) translateZ(calc(var(--die-size) / 200 * 33.5)) translateY(calc(var(--die-size) / 200 * 121.26)) rotateZ(180deg) rotateX(53deg);
}
#die .face:nth-child(17) {
  transform: rotateY(-36deg) translateZ(calc(var(--die-size) / 200 * 33.5)) translateY(calc(var(--die-size) / 200 * 121.26)) rotateZ(180deg) rotateX(53deg);
}
#die .face:nth-child(18) {
  transform: rotateY(36deg) translateZ(calc(var(--die-size) / 200 * 33.5)) translateY(calc(var(--die-size) / 200 * 121.26)) rotateZ(180deg) rotateX(53deg);
}
#die .face:nth-child(19) {
  transform: rotateY(108deg) translateZ(calc(var(--die-size) / 200 * 33.5)) translateY(calc(var(--die-size) / 200 * 121.26)) rotateZ(180deg) rotateX(53deg);
}
#die .face:nth-child(20) {
  transform: rotateY(180deg) translateZ(calc(var(--die-size) / 200 * 33.5)) translateY(calc(var(--die-size) / 200 * 121.26)) rotateZ(180deg) rotateX(53deg);
}
</style>
`
    }
}
