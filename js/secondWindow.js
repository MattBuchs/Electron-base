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
});

ipcRenderer.on("stop-timer", () => {
    clearInterval(loop);
});

ipcRenderer.on("reset-timer", (event, resetMinutes) => {
    clearInterval(loop);

    minutes = resetMinutes;
    seconds = 60;

    if (minutes === 59) {
        timer.textContent = `1h : 0mn : 0s`;
    } else {
        timer.textContent = `${minutes + 1}mn : 0s`;
    }
});

const messageReceived = document.querySelector("#message-received");
ipcRenderer.on("send-message", (_, message) => {
    messageReceived.textContent = message;
    messageReceived.classList.remove("not-indice");
});

ipcRenderer.on("clear-message", () => {
    messageReceived.textContent = "indice à venir...";
    messageReceived.classList.add("not-indice");
});

ipcRenderer.on("minutes", (event, resetMinutes) => {
    minutes = resetMinutes;
    seconds = 60;

    if (minutes === 59) {
        timer.textContent = `1h : 0mn : 0s`;
    } else {
        timer.textContent = `${minutes + 1}mn : 0s`;
    }
});
