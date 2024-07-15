const { ipcRenderer } = require("electron");
import { displayTimer } from "../utils.js";

const timer = document.querySelector("#timer2-room");
const timer2 = document.querySelector("#timer-roomNegative");

const timerObj = {
    hours: 0,
    minutes: 59,
    seconds: 60,
    loop: null,
    isPreferenceTimer: null,
    isPositive: true,
    isStarted: false,

    loadTimer(isPreferenceTimer) {
        timer.textContent = `
            1${isPreferenceTimer ? "h :" : " :"} 0${
            isPreferenceTimer ? "m" : "0"
        } : 0${isPreferenceTimer ? "s" : "0"}`;
    },

    startTimer() {
        if (!this.isStarted) {
            this.minutes--;
            this.isStarted = true;
        }

        this.loop = setInterval(() => {
            if (this.hours === 0 && this.minutes === 0 && this.seconds === 0) {
                this.isPositive = false;
                timer2.classList.remove("hidden");
            }

            if (this.isPositive) {
                this.seconds--;

                if (this.seconds === -1) {
                    this.minutes--;
                    this.seconds = 59;
                }

                if (this.minutes === -1) {
                    this.hours--;
                    this.minutes = 59;
                }
            } else {
                this.seconds++;

                if (this.seconds === 60) {
                    this.minutes++;
                    this.seconds = 0;
                }

                if (this.minutes === 60) {
                    this.hours++;
                    this.minutes = 0;
                }
            }

            timer.textContent = `${!this.isPositive ? "+" : ""}${
                this.hours === 0
                    ? ""
                    : `${this.hours}${this.isPreferenceTimer ? "h" : ""} : `
            }${this.minutes < 10 && this.minutes > 0 ? "0" : ""}${
                this.minutes
            }${this.isPreferenceTimer ? "m" : ""} : ${
                this.seconds < 10 ? "0" : ""
            }${this.seconds}${this.isPreferenceTimer ? "s" : ""}`;
        }, 1000);
    },

    stopTimer() {
        clearInterval(this.loop);
    },

    resetTimer(resetHours, resetMinutes, isPreferenceTimer) {
        clearInterval(this.loop);

        this.isStarted = false;
        this.isPositive = true;
        this.hours = resetHours;
        this.minutes = resetMinutes;
        this.seconds = 60;

        timer2.classList.add("hidden");
        displayTimer(
            timer,
            this.hours,
            this.minutes,
            isPreferenceTimer,
            timer2
        );
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

ipcRenderer.on("load-timer", (event, isPreferenceTimer) => {
    timerObj.loadTimer(isPreferenceTimer);
});

export default timerObj;
