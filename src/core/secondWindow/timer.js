const { ipcRenderer } = require("electron");
import { displayTimer } from "../utils.js";

const container = document.querySelector(".timer2");
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
    counter: 0,
    isStop: false,

    loadTimer(isPreferenceTimer) {
        timer.textContent = `
            1${isPreferenceTimer ? "h :" : " :"} 0${
            isPreferenceTimer ? "m" : "0"
        } : 0${isPreferenceTimer ? "s" : "0"}`;
    },

    startTimer() {
        container.classList.remove("photo");

        if (this.isStop) {
            timer.textContent = `${!this.isPositive ? "+" : ""}${
                this.hours === 0
                    ? ""
                    : `${this.hours}${this.isPreferenceTimer ? "h" : ""} : `
            }${this.minutes < 10 && this.minutes > 0 ? "0" : ""}${
                this.minutes
            }${this.isPreferenceTimer ? "m" : ""} : ${
                this.seconds < 10 ? "0" : ""
            }${this.seconds}${this.isPreferenceTimer ? "s" : ""}`;

            this.isStop = false;
        }

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

            this.counter++;

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
        this.isStop = true;
        container.classList.add("photo");

        const secondes = this.counter;
        const temps = new Date();
        temps.setTime(secondes * 1000);

        timer.textContent = `${
            this.hours === 0
                ? ""
                : `${temps.getHours()}${this.isPreferenceTimer ? "h" : ""} : `
        }${
            temps.getMinutes() < 10 && temps.getMinutes() > 0 ? "0" : ""
        }${temps.getMinutes()}${this.isPreferenceTimer ? "m" : ""} : ${
            temps.getSeconds() < 10 ? "0" : ""
        }${temps.getSeconds()}${this.isPreferenceTimer ? "s" : ""}`;
    },

    resetTimer(resetHours, resetMinutes, isPreferenceTimer) {
        clearInterval(this.loop);

        this.isStarted = false;
        this.isPositive = true;
        this.hours = resetHours;
        this.minutes = resetMinutes;
        this.seconds = 60;
        this.counter = 0;

        timer2.classList.add("hidden");
        container.classList.remove("photo");
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
