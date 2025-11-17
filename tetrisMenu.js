//#region DOM Elements

const uiLoginButton = document.querySelector("#ui-login-button");

const gameDisplay = document.querySelector("#game");
const mainMenuDisplay = document.querySelector("#main-menu");
const pauseMenuDisplay = document.querySelector("#pause-menu");
const difficultyMenuDisplay = document.querySelector("#difficulty-menu");
const leaderboardsMenuDisplay = document.querySelector("#leaderboards-menu");
const loginMenuDisplay = document.querySelector("#login-menu");
const registerMenuDisplay = document.querySelector("#register-menu");
const uiDisplay = document.querySelector("#ui");
const displays = [gameDisplay, mainMenuDisplay, pauseMenuDisplay, difficultyMenuDisplay, leaderboardsMenuDisplay, loginMenuDisplay, registerMenuDisplay];

const difficultyUIText = document.querySelector("#ui-difficulty");

//#endregion

//region Menu Methods

let activeTab = mainMenuDisplay;
function selectActiveTab(active) {
    if (active.matches("#login-menu") || active.matches("#register-menu"))
        uiDisplay.style.display = "none";
    else
        uiDisplay.style.display = "flex";

    if (active.matches("#game") || active.matches("#pause-menu"))
        uiLoginButton.style.display = "none";
    else
        uiLoginButton.style.display = "flex";

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
    else if (event.target.matches(".back-button"))
        selectActiveTab(mainMenuDisplay);
    else if (event.target.matches("#pause-back-button")) {
        selectActiveTab(mainMenuDisplay);
        previousScoreText.innerHTML = "Previous score: " + scoreCount;
    }
    else if (event.target.matches("#ui-login-button"))
        selectActiveTab(loginMenuDisplay);
    else if (event.target.matches("#login-to-register"))
        selectActiveTab(registerMenuDisplay);
    else if (event.target.matches("#register-to-login"))
        selectActiveTab(loginMenuDisplay);

    /*
    switch (event.target) {
        case document.querySelector("#new-game-button"):
            alert("test");
            break;
    }
    */
});

//endregion
