//region DOM Elements

const volumeSlider = document.querySelector("#volume-range");
const musicPauseButton = document.querySelector("#music-pause-button");

//endregion

//region Audio Source

const theme = new Audio("./res/theme.mp3");
const clickSound = new Audio("./res/button-click.mp3");

//endregion

//region Audio Settings

theme.autoplay = true;
theme.loop = true;
theme.volume = volumeSlider.value;

//endregion

//region Audio Events

window.addEventListener('DOMContentLoaded', () => {
    theme.play().catch(() => theme.pause());
});

volumeSlider.addEventListener("input", () => {
    theme.volume = volumeSlider.value;
});

musicPauseButton.addEventListener("click", () => {
    if (theme.paused) {
        theme.play().catch(() => theme.pause());
        musicPauseButton.textContent = "⏸️";
    }
    else {
        theme.pause();
        musicPauseButton.textContent = "▶️";
    }
});

//endregion
