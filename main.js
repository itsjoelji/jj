const letters = ['L', 'G', 'O', 'D']; // Example letters
const centerX = 300, centerY = 250, radius = 100;

letters.forEach((letter, idx) => {
    const angle = (2 * Math.PI / letters.length) * idx;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    const text = new PIXI.Text(letter, {
        fontFamily: 'Arial',
        fontSize: 48,
        fill: '#ff9900',
        align: 'center'
    });
    text.anchor.set(0.5);
    text.position.set(x, y);
    text.interactive = true;
    text.buttonMode = true;

    text
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove);

    app.stage.addChild(text);
});

let dragging = null;

function onDragStart(event) {
    this.data = event.data;
    this.alpha = 0.7;
    this.dragging = true;
    dragging = this;
}

function onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    this.data = null;
    dragging = null;
}

function onDragMove() {
    if (this.dragging) {
        const pos = this.data.getLocalPosition(this.parent);
        this.position.set(pos.x, pos.y);
    }
}
