const volumeSlider = document.querySelector("#volume-range");
const musicPauseButton = document.querySelector("#music-pause-button");
const theme = new Audio("./res/theme.mp3");
const clickSound = new Audio("./res/button-click.mp3");

theme.autoplay = true;
theme.loop = true;
theme.volume = volumeSlider.value;

window.addEventListener('DOMContentLoaded', () => {
    theme.play().catch(() => theme.pause());
});

volumeSlider.addEventListener("input", () => {
    theme.volume = volumeSlider.value;
});

document.body.addEventListener("click", () => {
    clickSound.play().catch(() => clickSound.pause());
})

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
