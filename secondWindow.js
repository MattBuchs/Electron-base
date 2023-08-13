const { ipcRenderer } = require("electron");

const timer = document.querySelector(".container p");

let minutes = 59;
let seconds = 59;
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

ipcRenderer.on("reset-timer", () => {
    clearInterval(loop);

    minutes = 59;
    seconds = 60;

    timer.textContent = `1h : 0mn : 0s`;
});

const messageReceived = document.querySelector("#message-received");
ipcRenderer.on("send-message", (_, message) => {
    messageReceived.textContent = message;
});
