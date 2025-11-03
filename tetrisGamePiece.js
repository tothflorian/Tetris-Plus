class Piece {
    constructor() {
        const shapeIndex = Math.floor(Math.random() * SHAPES.length);
        const colorIndex = Math.floor(Math.random() * COLORS) + 1;

        this.matrix = SHAPES[shapeIndex];
        this.shapeIndex = shapeIndex;
        this.colorIndex = colorIndex;
        this.x = 0;
        this.y = 0;
    }
}

function setX(piece) {
    piece.x = Math.floor((COLUMNS - SHAPES[piece.shapeIndex][0].length) / 2);
}