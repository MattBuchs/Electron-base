const { ipcRenderer } = require("electron");

const timer = document.querySelector(".container p");

let minutes = 59;
let seconds = 60;
let loop = null;

ipcRenderer.on("play-timer", () => {
    loop = setInterval(() => {
        seconds--;

        if (minutes === 0 && seconds === 0) {
            clearInterval(loop);

            song.volume = 0.05;
            song.play();
        } else {
            if (seconds === 0) {
                minutes--;
                seconds = 59;
            }
        }

        timer.textContent = `${minutes < 10 ? "0" : ""}${minutes}mn : ${
            seconds < 10 ? "0" : ""
        }${seconds}s`;
    }, 1000);
});
