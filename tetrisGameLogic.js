//region Game Constants

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
const COLORS = 9;

const blocksSpriteSheet = new Image();
blocksSpriteSheet.src = "./res/blocks-sprite-sheet.png";

//endregion

//region Game Variables

let grid = generateGrid();
let currentPiece;
let nextPiece;
let isCurrentPieceGolden;
let scoreCount = 0;
let gameDifficulty = Difficulty.MEDIUM;

let pieceSum;
let dropInterval;
let dropIncrease;
let lastTime = 0;
let dropCounter = 0;
let isGameRunning = false;

//endregion

//#region DOM Elements

const canvas = document.querySelector("#map");
const context = canvas.getContext("2d");
const nextCanvas = document.querySelector("#next-piece");
const nextContext = nextCanvas.getContext("2d");

const score = document.querySelector("#score");
const previousScoreText = document.querySelector("#previous-score");

//#endregion

//region Game Render Methods

function refreshScoreboard(currentScore, isNotExact = true) {
    if (isNotExact)
        if (!isCurrentPieceGolden)
            scoreCount += currentScore;
        else
            scoreCount += currentScore * 5;
    else
        scoreCount = currentScore;

    score.innerHTML = "Score: " + scoreCount;
}

function renderPiece(piece, canvas = context) {
    let { matrix, x, y, colorIndex } = piece;

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j]) {
                canvas.drawImage(
                    blocksSpriteSheet,
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

function renderGhostPiece(piece) {
    const ghostY = getGhostPosition(piece);
    const { matrix, x, colorIndex } = piece;

    context.globalAlpha = 0.25;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j]) {
                context.drawImage(
                    blocksSpriteSheet,
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
                    blocksSpriteSheet,
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

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function animationLineClear(lines) {
    for (let t = 0; t < 3; t++) {
        for (const i of lines) {
            for (let j = 0; j < COLUMNS; j++) {
                grid[i][j] = 0;
            }
        }
        renderGraphics();
        await delay(100);

        for (const i of lines) {
            for (let j = 0; j < COLUMNS; j++) {
                grid[i][j] = 8;
            }
        }
        renderGraphics();
        await delay(100);
    }
}

//endregion

//region Game Logic Methods

function newGame() {
    selectActiveTab(gameDisplay);
    grid = generateGrid();
    nextPiece = new Piece();
    currentPiece = new Piece();
    isCurrentPieceGolden = currentPiece.colorIndex === 9;
    setX(currentPiece);
    nextCanvas.width = nextPiece.matrix.length * BLOCK_SIZE;
    nextCanvas.height = nextPiece.matrix.length * BLOCK_SIZE;
    refreshScoreboard(0, false);

    pieceSum = 0;
    dropInterval = gameDifficulty[0];
    dropIncrease = gameDifficulty[1];
    dropCounter = 0;
    lastTime = 0;
    isGameRunning = true;

    requestAnimationFrame(gameLoop);
}

function gameLoop(time = 0) {
    if (!isGameRunning) return;

    const deltaTime = time - lastTime;
    lastTime = time;
    dropCounter += deltaTime;

    if (dropCounter > dropInterval) {
        if (currentPiece) {
            fallingPiece(currentPiece).then(() => {});
        }
        else {
            currentPiece = nextPiece;
            isCurrentPieceGolden = currentPiece.colorIndex === 9;
            setX(currentPiece);
            nextPiece = new Piece();

            let len = nextPiece.matrix.length;
            nextCanvas.width = len * BLOCK_SIZE;
            nextCanvas.height = len * BLOCK_SIZE;
            nextContext.clearRect(0, 0, nextCanvas.width, nextCanvas.height);
        }
        pieceSum++;
        dropCounter = 0;
    }

    renderGraphics();
    if (currentPiece) {
        renderGhostPiece(currentPiece);
        renderPiece(currentPiece);
        renderPiece(nextPiece, nextContext);
    }

    requestAnimationFrame(gameLoop);
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

function getGhostPosition(piece) {
    let ghostY = piece.y;

    while (!isColliding(piece.x, ghostY + 1, piece.matrix)) {
        ghostY++;
    }

    return ghostY;
}

async function checkGrid() {
    const fullLines = [];

    for (let i = 0; i < grid.length; i++) {
        if (grid[i].every(cell => cell !== 0)) {
            fullLines.push(i);
        }
    }

    if (fullLines.length === 0)
        return;

    await animationLineClear(fullLines);

    for (const i of fullLines) {
        grid.splice(i, 1);
        grid.unshift(new Array(COLUMNS).fill(0));
    }

    const scoreMap = [0, 100, 300, 500, 800];
    refreshScoreboard(scoreMap[fullLines.length] || 0);
}

async function fallingPiece(piece) {
    if ( !isColliding(piece.x, piece.y + 1) )
        piece.y += 1;
    else {
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

        await checkGrid();

        if (currentPiece.y <= 0 && isColliding(piece.x, piece.y, piece.matrix)) {
            const gameOverEvent = new CustomEvent("gameOver", { detail: { score: scoreCount } });
            document.dispatchEvent(gameOverEvent);
            return;
        }

        currentPiece = null;
        dropInterval -= dropIncrease; // Possible function for increasing difficulty: Difficulty[0] / x + Difficulty[0] / 4;
    }
}

function hardDrop(piece) {
    while (!isColliding(piece.x, piece.y + 1, piece.matrix)) {
        fallingPiece(piece).then(() => {
            renderPiece(piece);
        });
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

//endregion

//region Game Events

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
                hardDrop(currentPiece);
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

document.addEventListener("gameOver", () => {
    previousScoreText.innerHTML = "Previous score: " + scoreCount;

    refreshScoreboard(0, false);

    grid = generateGrid();
    isGameRunning = false;
    selectActiveTab(mainMenuDisplay);
});

//endregion
