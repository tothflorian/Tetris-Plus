//#region DOM Elements

const gameDisplay = document.querySelector("#game");
const mainMenuDisplay = document.querySelector("#main-menu");
const pauseMenuDisplay = document.querySelector("#pause-menu");
const difficultyMenuDisplay = document.querySelector("#difficulty-menu");
const leaderboardsMenuDisplay = document.querySelector("#leaderboards-menu");
const displays = [gameDisplay, mainMenuDisplay, pauseMenuDisplay, difficultyMenuDisplay, leaderboardsMenuDisplay];

const difficultyUIText = document.querySelector("#ui-difficulty");

//#endregion

//region Menu Methods

let activeTab = mainMenuDisplay;
function selectActiveTab(active) {
    displays.forEach(element => {
        if (!(element === active) )
            element.style.display = "none";
        else
            element.style.display = "flex";
        activeTab = active;
    });
}

function pauseGame() {
    isGameRunning = false;

    selectActiveTab(pauseMenuDisplay);
}

function resumeGame() {
    selectActiveTab(gameDisplay);

    isGameRunning = true;
    requestAnimationFrame(gameLoop);
}

//endregion

//region Menu Events

document.body.addEventListener("click", (event) => {
    if (event.target.matches("#new-game-button")) {
        newGame();
    }
    else if (event.target.matches("#pause-resume-button")) {
        resumeGame();
    }
    else if (event.target.matches("#pause-quit-button")) {
        selectActiveTab(mainMenuDisplay);
        previousScoreText.innerHTML = "Previous score: " + scoreCount;
    }
    else if (event.target.matches("#difficulty-button")) {
        selectActiveTab(difficultyMenuDisplay);
    }
    else if (event.target.matches("#leaderboards-button")) {
        selectActiveTab(leaderboardsMenuDisplay);
    }
    else if (event.target.matches("#easy-button")) {
        gameDifficulty = Difficulty.EASY;
        difficultyUIText.innerHTML = "Difficulty: " + gameDifficulty[2];
    }
    else if (event.target.matches("#medium-button")) {
        gameDifficulty = Difficulty.MEDIUM;
        difficultyUIText.innerHTML = "Difficulty: " + gameDifficulty[2];
    }
    else if (event.target.matches("#hard-button")) {
        gameDifficulty = Difficulty.HARD;
        difficultyUIText.innerHTML = "Difficulty: " + gameDifficulty[2];
    }
    else if (event.target.matches("#difficulty-back-button"))
        selectActiveTab(mainMenuDisplay);
    else if (event.target.matches("#leaderboards-back-button"))
        selectActiveTab(mainMenuDisplay);

    /*switch (event.target) {
        case "#new-game-button":
            break;
    }*/
});

//endregion
