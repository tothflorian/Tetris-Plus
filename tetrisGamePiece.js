class Piece {
    constructor() {
        const shapeIndex = Math.floor(Math.random() * SHAPES.length);
        const colorIndex = Math.floor(Math.random() * COLORS) + 1;

        this.matrix = SHAPES[shapeIndex];
        this.colorIndex = colorIndex;
        this.x = Math.floor((COLUMNS - SHAPES[shapeIndex][0].length) / 2);
        this.y = 0;
    }
}