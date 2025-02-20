const { ipcRenderer } = require("electron");
import { displayTimer } from "../../utils.js";
import roomsObj from "../rooms/rooms.js";
import utilsSettingsObj from "../settings/utilsSettings.js";

const timer = document.querySelector("#timer-room");
const timer2 = document.querySelector("#timer-roomNegative");
const playTimer = document.querySelector("#play");
const stopTimer = document.querySelector("#stop");
const btnResetTimer = document.querySelector("#reset");
const stopAlert = document.querySelector("#stop-alert");
const endTimerSound = document.querySelector("#end-timer_sound");
const confirmResetModal = document.querySelector("#request-reset");
const modal = document.querySelector("#request-reset div");
const ambientSound = document.querySelector("#ambient_sound");
const btnAmbientSound = document.querySelector("#btn-ambient_sound");
const btnStopAmbientSound = document.querySelector("#btn-stop--ambient_sound");
const notificationSound = document.querySelector("#notification_sound");
const message = document.querySelector("#message");

const timerObj = {
    seconds: 60,
    loop: null,
    isStarted: false,
    isActive: false,
    isPositive: true,

    init() {
        playTimer.addEventListener("click", this.startTimer.bind(this));
        stopTimer.addEventListener("click", this.stopTimer.bind(this));
        btnResetTimer.addEventListener(
            "click",
            this.confirmResetTimer.bind(this)
        );
        stopAlert.addEventListener("click", this.resetAlert.bind(this));
        endTimerSound.addEventListener("ended", this.resetAlert.bind(this));
    },

    startTimer() {
        this.isActive = true;

        stopTimer.classList.remove("hidden");
        playTimer.classList.add("hidden");

        if (!this.isStarted) {
            roomsObj.minutes--;
            this.isStarted = true;
        }

        this.loop = setInterval(() => {
            if (
                roomsObj.hours === 0 &&
                roomsObj.minutes === 0 &&
                this.seconds === 0
            ) {
                this.isPositive = false;
                playTimer.classList.add("hidden");
                timer2.classList.remove("hidden");
                stopAlert.style.display = "flex";

                if (endTimerSound.src !== `file://${__dirname}/index.html`) {
                    stopAlert.classList.remove("hidden");

                    ambientSound.pause();
                    ambientSound.currentTime = 0;

                    btnStopAmbientSound.classList.add("hidden");
                    btnAmbientSound.classList.remove("hidden");

                    endTimerSound.play();
                }
            }

            if (this.isPositive) {
                this.seconds--;

                if (this.seconds === -1) {
                    roomsObj.minutes--;
                    this.seconds = 59;
                }

                if (roomsObj.minutes === -1) {
                    roomsObj.hours--;
                    roomsObj.minutes = 59;
                }
            } else {
                this.seconds++;

                if (this.seconds === 60) {
                    roomsObj.minutes++;
                    this.seconds = 0;
                }

                if (roomsObj.minutes === 60) {
                    roomsObj.hours++;
                    roomsObj.minutes = 0;
                }
            }

            timer.textContent = `${!this.isPositive ? "+" : ""}${
                roomsObj.hours === 0
                    ? ""
                    : `${roomsObj.hours}${
                          utilsSettingsObj.isPreferenceTimer ? "h" : ""
                      } : `
            }${roomsObj.minutes < 10 && roomsObj.minutes > 0 ? "0" : ""}${
                roomsObj.minutes
            }${utilsSettingsObj.isPreferenceTimer ? "m" : ""} : ${
                this.seconds < 10 ? "0" : ""
            }${this.seconds}${utilsSettingsObj.isPreferenceTimer ? "s" : ""}`;
        }, 1000);

        ipcRenderer.send("play-timer");
    },

    stopTimer() {
        playTimer.textContent = "Reprendre";
        playTimer.classList.remove("hidden");
        stopTimer.classList.add("hidden");

        clearInterval(this.loop);

        ipcRenderer.send("stop-timer");
    },

    resetTimer() {
        playTimer.textContent = "Commencer";
        playTimer.classList.remove("hidden");
        stopTimer.classList.add("hidden");
        timer2.classList.add("hidden");
        stopAlert.style.display = "none";
        stopAlert.children[0].classList.remove("hidden");
        stopAlert.children[1].classList.add("hidden");

        clearInterval(this.loop);

        roomsObj.hours = roomsObj.resetHours;
        roomsObj.minutes = roomsObj.resetMinutes;
        this.seconds = 60;
        this.isPositive = true;
        this.isStarted = false;

        displayTimer(
            timer,
            roomsObj.hours,
            roomsObj.minutes,
            utilsSettingsObj.isPreferenceTimer,
            timer2
        );

        endTimerSound.pause();
        endTimerSound.currentTime = 0;

        stopAlert.classList.add("hidden");
        stopAlert.disabled = false;

        message.value = "";
        ipcRenderer.send("clear-message");
    },

    confirmResetTimer() {
        confirmResetModal.classList.remove("hidden");

        const confirmReset = document.querySelector("#confirm_reset");
        const cancelReset = document.querySelector("#cancel_reset");

        confirmReset.addEventListener("click", () => {
            this.isActive = false;
            this.resetTimer();

            confirmResetModal.classList.add("hidden");

            ipcRenderer.send(
                "reset-timer",
                roomsObj.resetHours,
                roomsObj.resetMinutes,
                utilsSettingsObj.isPreferenceTimer
            );
        });

        cancelReset.addEventListener("click", () =>
            confirmResetModal.classList.add("hidden")
        );

        confirmResetModal.addEventListener("click", () =>
            confirmResetModal.classList.add("hidden")
        );

        modal.addEventListener("click", (e) => e.stopPropagation());
    },

    resetAlert() {
        endTimerSound.pause();
        endTimerSound.currentTime = 0;

        stopAlert.disabled = true;

        stopAlert.children[0].classList.add("hidden");
        stopAlert.children[1].classList.remove("hidden");
    },

    setupHomeButton() {
        if (ambientSound.currentTime > 0) {
            ambientSound.pause();
            ambientSound.currentTime = 0;

            btnStopAmbientSound.classList.add("hidden");
            btnAmbientSound.classList.remove("hidden");
        }

        if (notificationSound.currentTime > 0) {
            notificationSound.pause();
            notificationSound.currentTime = 0;
        }

        if (this.isActive) {
            this.resetTimer();
            ipcRenderer.send(
                "reset-timer",
                roomsObj.resetHours,
                roomsObj.resetMinutes,
                utilsSettingsObj.isPreferenceTimer
            );
        }

        if (message.value !== "") {
            message.value = "";
        }
        ipcRenderer.send("clear-message");
    },
};

export default timerObj;
