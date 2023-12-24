# dice-webcomponent

Open index.html for more examples: simply run `npx http-server .`

## 3D animated dice!

The code is optimized to lazy-load only the die you request. If you use the D10, the D20, D12 and other dice code are not fetched by the browser.

## Installation

If you use a JS framework:

    import 'dice-webcomponent';
    <die-3d></die-3d>

If you use plain HTML:

    <die-3d></die-3d>
    <script src="./die.js"></script>

## Usage (default):

    <die-3d></die-3d>
    <die-3d maxrollvalue="12"></die-3d>
    <die-3d maxrollvalue="10"></die-3d>
    <die-3d maxrollvalue="8"></die-3d>
    <die-3d maxrollvalue="6"></die-3d>
    <die-3d maxrollvalue="4"></die-3d>