const { ipcRenderer } = require("electron");
import utils from "../utils.js";

const timer = document.querySelector(".container p");

const timerObj = {
    minutes: 59,
    seconds: 60,
    loop: null,

    startTimer() {
        this.loop = setInterval(() => {
            this.seconds--;

            if (this.minutes === 0 && this.seconds === 0) {
                clearInterval(this.loop);
            } else {
                if (this.seconds === -1) {
                    this.minutes--;
                    this.seconds = 59;
                }
            }

            timer.textContent = `${this.minutes < 10 ? "0" : ""}${
                this.minutes
            }mn : ${this.seconds < 10 ? "0" : ""}${this.seconds}s`;
        }, 1000);
    },

    stopTimer() {
        clearInterval(this.loop);
    },

    resetTimer(resetMinutes) {
        clearInterval(this.loop);

        this.minutes = resetMinutes;
        this.seconds = 60;

        utils.displayTimer(timer, this.minutes);
    },
};

ipcRenderer.on("play-timer", () => {
    timerObj.startTimer();
});

ipcRenderer.on("stop-timer", () => {
    timerObj.stopTimer();
});

ipcRenderer.on("reset-timer", (event, resetMinutes) => {
    timerObj.resetTimer(resetMinutes);
});

ipcRenderer.on("minutes", (event, resetMinutes) => {
    timerObj.resetTimer(resetMinutes);
});

export default timerObj;
