const { ipcRenderer } = require("electron");

const timer = document.querySelector(".container p");
const playTimer = document.querySelector("#play");
const stopTimer = document.querySelector("#stop");
const btnResetTimer = document.querySelector("#reset");
const stopAlert = document.querySelector("#stop-alert");
const song = document.querySelector(".song");

let minutes = 59;
let seconds = 60;
let loop = null;

function resetimer() {
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

btnResetTimer.addEventListener("click", () => {
    const confirmReset = confirm("Êtes-vous sur de vouloir rénitialiser ?");

    if (confirmReset) {
        resetimer();
    }

    ipcRenderer.send("reset-timer");
});

stopAlert.addEventListener("click", () => {
    song.pause();
    song.currentTime = 0;

    stopAlert.style.display = "none";
});

const formMessage = document.querySelector("#form-message");
const message = document.querySelector("#message");

formMessage.addEventListener("submit", (e) => {
    e.preventDefault();

    if (message.value !== "") {
        const messageWrited = message.value;
        message.value = "";

        ipcRenderer.send("send-message", messageWrited);
    }
});

const btnSong = document.querySelector("#btn-song");
btnSong.addEventListener("click", () => {
    song.play();
});

const btnClear = document.querySelector("#btn-clear");
btnClear.addEventListener("click", () => {
    ipcRenderer.send("clear-message");
});

const formContainerHome = document.querySelector(".container-home form");
const containerHome = document.querySelector(".container-home");

formContainerHome.addEventListener("submit", (e) => {
    e.preventDefault();
});

const salle1 = document.querySelector("#btn-1");
const salle2 = document.querySelector("#btn-2");
const salle3 = document.querySelector("#btn-3");
const container = document.querySelector(".container");

salle1.addEventListener("click", () => {
    minutes = 59;

    container.style.display = "flex";
    containerHome.style.display = "none";
});

salle2.addEventListener("click", () => {
    minutes = 44;

    container.style.display = "flex";
    containerHome.style.display = "none";
});

salle3.addEventListener("click", () => {
    minutes = 59;

    container.style.display = "flex";
    containerHome.style.display = "none";
});

const home = document.querySelector("#btn-home");

home.addEventListener("click", () => {
    container.style.display = "none";
    containerHome.style.display = "flex";

    resetimer();
});
