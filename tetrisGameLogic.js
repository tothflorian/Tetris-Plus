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

const Difficulty = {
    EASY: [1500, 5, "EASY", document.querySelector("#easy-button")],
    MEDIUM: [1250, 10, "MEDIUM", document.querySelector("#medium-button")],
    HARD: [1000, 15, "HARD", document.querySelector("#hard-button")]
}

const ROWS = 20;
const COLUMNS = 10;

const BLOCK_SIZE = 32;
const COLORS = 8;

const spriteSheet = new Image();
spriteSheet.src = "./res/blocks-sprite-sheet.png";

let grid = generateGrid();
let currentPiece = null;
let scoreCount = 0;
let gameDifficulty = Difficulty.MEDIUM;

let dropInterval;
let dropIncrease;
let lastTime = 0;
let dropCounter = 0;
let isGameRunning = false;

//#region DOM Elements

const canvas = document.querySelector("#map");
const context = canvas.getContext("2d");

const score = document.querySelector("#score");
const previousScoreText = document.querySelector("#previous-score");

//#endregion 1020 / x + 280;

function newGame() {
    selectActiveTab(gameDisplay);
    grid = generateGrid();
    currentPiece = generateShape();
    refreshScoreboard(0, false);

    dropInterval = gameDifficulty[0];
    dropIncrease = gameDifficulty[1];
    dropCounter = 0;
    lastTime = 0;
    isGameRunning = true;

    requestAnimationFrame(gameLoop);
}

currentPiece = generateShape();
requestAnimationFrame(gameLoop);

function gameLoop(time = 0) {
    if (!isGameRunning) return;

    const deltaTime = time - lastTime;
    lastTime = time;
    dropCounter += deltaTime;

    if (dropCounter > dropInterval) {
        if (currentPiece) {
            fallingPiece(currentPiece);
        } else {
            currentPiece = generateShape();
        }
        dropCounter = 0;
    }

    renderGraphics();
    if (currentPiece) {
        renderGhostPiece(currentPiece);
        renderPiece(currentPiece);
    }

    requestAnimationFrame(gameLoop);
}

function refreshScoreboard(currentScore, isNotExact = true) {
    if (isNotExact)
        scoreCount += currentScore;
    else
        scoreCount = currentScore;

    score.innerHTML = "Score: " + scoreCount;
}

function generateGrid() {
    let grid = [];

    for (let i = 0; i < ROWS; i++) {
        grid.push([]);
        for (let j = 0; j < COLUMNS; j++) {
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

function getGhostPosition(piece) {
    let ghostY = piece.y;

    while (!isColliding(piece.x, ghostY + 1, piece.matrix)) {
        ghostY++;
    }

    return ghostY;
}

function renderGhostPiece(piece) {
    const ghostY = getGhostPosition(piece);
    const { matrix, x, colorIndex } = piece;

    context.globalAlpha = 0.25;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j]) {
                context.drawImage(
                    spriteSheet,
                    (colorIndex - 1) * BLOCK_SIZE,
                    0,
                    BLOCK_SIZE,
                    BLOCK_SIZE,
                    (x + j) * BLOCK_SIZE,
                    (ghostY + i) * BLOCK_SIZE,
                    BLOCK_SIZE,
                    BLOCK_SIZE
                );
            }
        }
    }
    context.globalAlpha = 1.0;
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

    if (count === 1)
        refreshScoreboard(100);
    else if (count === 2)
        refreshScoreboard(300);
    else if (count === 3)
        refreshScoreboard(500);
    else if (count === 4)
        refreshScoreboard(800);
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

        checkGrid();

        if (currentPiece.y === 0) {
            const gameOverEvent = new CustomEvent("gameOver", { detail: { score: scoreCount } });
            document.dispatchEvent(gameOverEvent);
        }

        currentPiece = null;
        dropInterval -= dropIncrease;
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
    if (activeTab === gameDisplay) {
        switch (event.key) {
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
            case "Escape":
                if (isGameRunning)
                    pauseGame();
                break;
        }
    }
});

document.addEventListener("gameOver", (event) => {
    setTimeout(() => {}, 1500);
    previousScoreText.innerHTML = "Previous score: " + scoreCount;

    refreshScoreboard(0, false);

    grid = generateGrid();
    isGameRunning = false;
    selectActiveTab(mainMenuDisplay);
});

// aszinkron függvény használata
// README szerű felsorolása, hogy milyen mechanikákat használunk
