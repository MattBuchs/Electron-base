const { ipcRenderer } = require("electron");

const timer = document.querySelector(".container p");
const playTimer = document.querySelector("#play");
const stopTimer = document.querySelector("#stop");
const resetTimer = document.querySelector("#reset");
const stopAlert = document.querySelector("#stop-alert");
const song = document.querySelector(".song");

let minutes = 59;
let seconds = 10;
let loop = null;

playTimer.addEventListener("click", () => {
    stopTimer.style.display = "initial";
    playTimer.style.display = "none";

    loop = setInterval(() => {
        seconds--;

        if (minutes === 0 && seconds === 0) {
            clearInterval(loop);
            stopTimer.style.display = "none";
            playTimer.style.display = "none";
            stopAlert.style.display = "initial";

            song.play();
        } else {
            if (seconds === -1) {
                minutes--;
                seconds = 59;
            }
        }

        timer.textContent = `${minutes < 10 ? "0" : ""}${minutes}mn : ${
            seconds < 10 ? "0" : ""
        }${seconds}s`;
    }, 1000);

    ipcRenderer.send("play-timer");
});

stopTimer.addEventListener("click", () => {
    playTimer.textContent = "Reprendre";
    playTimer.style.display = "initial";
    stopTimer.style.display = "none";

    clearInterval(loop);

    ipcRenderer.send("stop-timer");
});

resetTimer.addEventListener("click", () => {
    const confirmReset = confirm("Êtes-vous sur de vouloir rénitialiser ?");

    if (confirmReset) {
        playTimer.textContent = "Commencer";
        playTimer.style.display = "initial";
        stopTimer.style.display = "none";

        clearInterval(loop);

        minutes = 59;
        seconds = 60;

        timer.textContent = `1h : 0mn : 0s`;

        song.pause();
        song.currentTime = 0;
    }

    ipcRenderer.send("reset-timer");
});

stopAlert.addEventListener("click", () => {
    song.pause();
    song.currentTime = 0;

    stopAlert.style.display = "none";
});
