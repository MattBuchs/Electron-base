const { ipcRenderer } = require("electron");
import { displayTimer, dataloaded } from "../utils.js";

const timer = document.querySelector("#timer-room");

const timerObj = {
    hours: 0,
    minutes: 59,
    seconds: 60,
    loop: null,
    isPreferenceTimer: null,

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
                this.hours === 0
                    ? ""
                    : `${this.hours}${this.isPreferenceTimer ? "h" : ""} : `
            }${this.minutes < 10 && this.minutes > 0 ? "0" : ""}${
                this.minutes
            }${this.isPreferenceTimer ? "m" : ""} : ${
                this.seconds < 10 && this.seconds > 0 ? "0" : ""
            }${this.seconds}${this.isPreferenceTimer ? "s" : ""}`;
        }, 1000);
    },

    stopTimer() {
        clearInterval(this.loop);
    },

    resetTimer(resetHours, resetMinutes, isPreferenceTimer) {
        clearInterval(this.loop);

        this.hours = resetHours;
        this.minutes = resetMinutes;
        this.seconds = 60;

        displayTimer(timer, this.hours, this.minutes, isPreferenceTimer);
    },
};

ipcRenderer.on("play-timer", () => {
    timerObj.startTimer();
});

ipcRenderer.on("stop-timer", () => {
    timerObj.stopTimer();
});

ipcRenderer.on(
    "reset-timer",
    (_, resetHours, resetMinutes, isPreferenceTimer) => {
        timerObj.resetTimer(resetHours, resetMinutes, isPreferenceTimer);
    }
);

ipcRenderer.on("update-preference", (event, isPreferenceTimer) => {
    timerObj.isPreferenceTimer = isPreferenceTimer;
});

export default timerObj;
