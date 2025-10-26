const SHAPES = [
    [
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0]
    ],
    [
        [0,1,0],
        [0,1,0],
        [1,1,0]
    ],
    [
        [0,1,0],
        [0,1,0],
        [0,1,1]
    ],
    [
        [1,1,0],
        [0,1,1],
        [0,0,0]
    ],
    [
        [0,1,1],
        [1,1,0],
        [0,0,0]
    ],
    [
        [1,1,1],
        [0,1,0],
        [0,0,0]
    ],
    [
        [1,1],
        [1,1],
    ]
]

const ROWS = 20;
const COLUMNS = 10;

const BLOCK_SIZE = 32;
const COLORS = 8;

const canvas = document.querySelector("#map");
const context = canvas.getContext("2d");

const spriteSheet = new Image();
spriteSheet.src = "./res/blocks-sprite-sheet.png";

let grid = generateGrid(ROWS, COLUMNS);
let currentPiece = null;

const score = document.querySelector("#score");
let scoreCount = 0;

setInterval(updateGameState, 1500);

function updateGameState() {
    checkGrid();

    renderGraphics();
    if (currentPiece)
        fallingPiece(currentPiece);
    else
        currentPiece = generateShape();

    renderPiece(currentPiece);
}

function generateGrid(rows, cols) {
    let grid = [];

    for (let i = 0; i < rows; i++) {
        grid.push([]);
        for (let j = 0; j < cols; j++) {
            grid[i].push(0)
        }
    }
    return grid;
}

function generateShape() {
    const shapeIndex = Math.floor(Math.random() * SHAPES.length);
    const colorIndex = Math.floor(Math.random() * COLORS) + 1;

    return {
        matrix: SHAPES[shapeIndex],
        colorIndex: colorIndex,
        x: Math.floor((COLUMNS - SHAPES[shapeIndex][0].length) / 2),
        y: 0,
    };
}

function renderPiece(piece) {
    let { matrix, x, y, colorIndex } = piece;

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j]) {
                context.drawImage(
                    spriteSheet,
                    (colorIndex - 1) * BLOCK_SIZE,
                    0,
                    BLOCK_SIZE,
                    BLOCK_SIZE,
                    x * BLOCK_SIZE + j * BLOCK_SIZE,
                    y * BLOCK_SIZE + i * BLOCK_SIZE,
                    BLOCK_SIZE,
                    BLOCK_SIZE
                );
            }
        }
    }
}

function renderGraphics() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j]) {
                context.drawImage(
                    spriteSheet,
                    (grid[i][j] - 1) * BLOCK_SIZE,
                    0,
                    BLOCK_SIZE,
                    BLOCK_SIZE,
                    j * BLOCK_SIZE,
                    i * BLOCK_SIZE,
                    BLOCK_SIZE,
                    BLOCK_SIZE
                );
            }
        }
    }
}

function checkGrid() {
    let count = 0;
    for (let i = 0; i < grid.length; i++){
        let allFilled = true;
        for (let j = 0; j < grid[0].length; j++){
            if (grid[i][j] === 0)
                allFilled = false;
        }
        if (allFilled) {
            count++;
            grid.splice(i,1);
            grid.unshift([0,0,0,0,0,0,0,0,0,0]);
        }
    }

    if (count < 1)
        return;
    else if (count === 1)
        scoreCount += 100;
    else if (count === 2)
        scoreCount += 300;
    else if (count === 3)
        scoreCount += 500;
    else
        scoreCount += (count - 3) * 800;

    score.innerHTML = "Score: " + scoreCount;
}

function fallingPiece(piece) {
    if ( !isColliding(piece.x, piece.y + 1) )
        piece.y += 1;
    else{
        let matrix = piece.matrix;
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] === 1) {
                    let p = currentPiece.x + j;
                    let q = currentPiece.y + i;
                    grid[q][p] = currentPiece.colorIndex;
                }
            }
        }
        if (currentPiece.y === 1) {
            const gameOverEvent = new CustomEvent("gameOver", { detail: { score: scoreCount } });
            document.dispatchEvent(gameOverEvent);
        }
        currentPiece = null;
    }
}

function movePieceLeft(piece) {
    if(!isColliding(piece.x - 1, piece.y))
        piece.x -= 1;
}

function movePieceRight(piece) {
    if ( !isColliding(piece.x + 1, piece.y) )
        piece.x += 1;
}

function rotatePiece(piece) {
    let rotatedPiece = [];
    let matrix = piece.matrix;

    for (let i = 0; i < matrix.length; i++){
        rotatedPiece.push([]);
        for (let j = 0; j < matrix[i].length; j++){
            rotatedPiece[i].push(0);
        }
    }
    for (let i = 0; i < matrix.length; i++){
        for (let j = 0; j < matrix[i].length; j++){
            rotatedPiece[i][j] = matrix[j][i];
        }
    }
    for (let i=0;i<rotatedPiece.length;i++){
        rotatedPiece[i] = rotatedPiece[i].reverse();
    }

    if(!isColliding(piece.x, piece.y, rotatedPiece))
        piece.matrix = rotatedPiece;
}

function isColliding(x, y, rotatedPiece){
    let piece = rotatedPiece || currentPiece.matrix;

    for (let i = 0; i < piece.length; i++){
        for (let j = 0; j < piece[i].length; j++){
            if (piece[i][j] === 1){
                let p = x + j;
                let q = y + i;

                if (p >= 0 && p < COLUMNS && q >= 0 && q < ROWS){
                    if (grid[q][p] > 0){
                        return true;
                    }
                }
                else
                    return true;
                }
        }
    }
    return false;
}

document.addEventListener("keydown", (event) => {
    switch (event.key)
    {
        case "a":
        case "ArrowLeft":
            movePieceLeft(currentPiece);
            break;
        case "d":
        case "ArrowRight":
            movePieceRight(currentPiece);
            break;
        case "s":
        case "ArrowDown":
            fallingPiece(currentPiece);
            break;
        case "w":
        case "ArrowUp":
            rotatePiece(currentPiece);
            break;
    }

    if (currentPiece) {
        renderGraphics();
        renderPiece(currentPiece);
    }
})

document.addEventListener("gameOver", (event) => {
    alert(`It is over, small. Score: ${event.detail.score}`);

    scoreCount = 0;
    score.innerHTML = "Score: " + scoreCount;

    grid = generateGrid(ROWS, COLUMNS);
})

// lekérni a DOM-ból, visszaírni a DOM-ba
// aszinkron függvény használata
// README szerű felsorolása, hogy milyen mechanikákat használunk
