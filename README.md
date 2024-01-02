# 3D animated dice, tray included!

The code is optimized to lazy-load only the die you request. If you use the D10, the D20, D12 and other dice code are not fetched by the browser.

If you use a JS framework:

    import 'die-3d';
    <die-3d></die-3d>

If you use plain HTML:

    <dice-tray>
        <die-3d></die-3d>
        <die-3d max="12"></die-3d>
        <die-3d max="10"></die-3d>
        <die-3d max="8"></die-3d>
        <die-3d max="6"></die-3d>
        <die-3d max="4"></die-3d>
    </dice-tray>
    <script src="./dice-tray.js" type="module"></script>

All options:

    <die-3d
        min="1"
        max="20"
        value="1"
        color-bg-even="#333333"
        color-bg-odd="rgba(70,70,70,0.8)"
        color-value="goldenrod"
        rolls="1"
        time="3"
        disabled
        color-bg-even-disabled="rgba(103,63,0,0.9)"
        color-bg-odd-disabled="rgba(103,63,0,0.8)"
        color-value-disabled="#000"
        contrast-active="500%"
    >
    </die-3d>

