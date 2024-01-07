const { ipcRenderer } = require("electron");
import utils from "../utils.js";

const timer = document.querySelector("#timer-room");

const timerObj = {
    hours: 0,
    minutes: 59,
    seconds: 60,
    loop: null,

    startTimer() {
        this.minutes--;

        this.loop = setInterval(() => {
            this.seconds--;

            if (this.hours === 0 && this.minutes === 0 && this.seconds === 0) {
                clearInterval(this.loop);
            } else {
                if (this.seconds === -1) {
                    this.minutes--;
                    this.seconds = 59;
                }

                if (this.minutes === -1) {
                    this.hours--;
                    this.minutes = 59;
                }
            }

            timer.textContent = `${
                this.hours === 0 ? "" : this.hours + "h : "
            }${this.minutes < 10 && this.minutes > 0 ? "0" : ""}${
                this.minutes
            }mn : ${this.seconds < 10 && this.seconds > 0 ? "0" : ""}${
                this.seconds
            }s`;
        }, 1000);
    },

    stopTimer() {
        clearInterval(this.loop);
    },

    resetTimer(resetHours, resetMinutes) {
        clearInterval(this.loop);

        this.hours = resetHours;
        this.minutes = resetMinutes;
        this.seconds = 60;

        utils.displayTimer(timer, this.hours, this.minutes);
    },
};

ipcRenderer.on("play-timer", () => {
    timerObj.startTimer();
});

ipcRenderer.on("stop-timer", () => {
    timerObj.stopTimer();
});

ipcRenderer.on("reset-timer", (event, resetHours, resetMinutes) => {
    timerObj.resetTimer(resetHours, resetMinutes);
});

ipcRenderer.on("times", (event, resetHours, resetMinutes) => {
    timerObj.resetTimer(resetHours, resetMinutes);
});

export default timerObj;
