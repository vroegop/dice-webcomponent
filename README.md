## 3D animated dice!

## Live demo

https://codepen.io/rjpvroegop/pen/BabBQKQ

## Usage (default):

    <die-3d></die-3d>
    <die-3d maxrollvalue="12"></die-3d>
    <die-3d maxrollvalue="10"></die-3d>
    <die-3d maxrollvalue="8"></die-3d>
    <die-3d maxrollvalue="6"></die-3d>
    <die-3d maxrollvalue="4"></die-3d>

## Usage with all options:

    <die-3d minrollvalue="1" maxrollvalue="20" initialvalue="20"  bgcoloreven="#333" bgcolorodd="rgba(70, 70, 70, 0.8)" dotcolor="goldenrod" allowedrolls="1" time="3"></die-3d>

The code is optimized to lazy-load only the die you request.

No minification is applied, the code is easy to read and adjust to your needs!

## Installation

If you use a JS framework:

    import 'die-3d';
    <die-3d></die-3d>

If you use plain HTML:

    <die-3d></die-3d>
    <script src="node_modules/die-3d/die.js"></script>

https://www.npmjs.com/package/dice-webcomponent