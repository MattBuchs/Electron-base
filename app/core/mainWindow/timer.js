const { ipcRenderer } = require("electron");
import utils from "../utils.js";
import roomsObj from "./rooms.js";

const timer = document.querySelector(".container p");
const playTimer = document.querySelector("#play");
const stopTimer = document.querySelector("#stop");
const btnResetTimer = document.querySelector("#reset");
const stopAlert = document.querySelector("#stop-alert");
const endTimerSound = document.querySelector("#end-timer_sound");
const container = document.querySelector(".container");
const containerHome = document.querySelector(".container-home");
const confirmResetModal = document.querySelector("#request-reset");
const home = document.querySelector("#btn-home");
const ambientSound = document.querySelector("#ambient_sound");
const btnAmbientSound = document.querySelector("#btn-ambient_sound");
const btnStopAmbientSound = document.querySelector("#btn-stop--ambient_sound");
const notificationSound = document.querySelector("#notification_sound");
const message = document.querySelector("#message");

const timerObj = {
    seconds: 60,
    loop: null,

    init() {
        playTimer.addEventListener("click", this.startTimer.bind(this));
        stopTimer.addEventListener("click", this.stopTimer.bind(this));
        btnResetTimer.addEventListener(
            "click",
            this.confirmResetTimer.bind(this)
        );
        stopAlert.addEventListener("click", this.resetAlert.bind(this));
        endTimerSound.addEventListener("ended", this.resetAlert.bind(this));
        home.addEventListener("click", this.setupHomeButton.bind(this));
    },

    startTimer() {
        stopTimer.style.display = "initial";
        playTimer.style.display = "none";
        roomsObj.minutes--;

        this.loop = setInterval(() => {
            this.seconds--;

            if (
                roomsObj.hours === 0 &&
                roomsObj.minutes === 0 &&
                this.seconds === 0
            ) {
                clearInterval(this.loop);
                stopTimer.style.display = "none";
                playTimer.style.display = "none";
                stopAlert.style.display = "initial";

                ambientSound.pause();
                ambientSound.currentTime = 0;
                btnStopAmbientSound.classList.add("hidden");
                btnAmbientSound.classList.remove("hidden");

                endTimerSound.play();
            } else {
                if (this.seconds === -1) {
                    roomsObj.minutes--;
                    this.seconds = 59;
                }

                if (roomsObj.minutes === -1) {
                    roomsObj.hours--;
                    roomsObj.minutes = 59;
                }
            }

            timer.textContent = `${
                roomsObj.hours === 0 ? "" : roomsObj.hours + "h : "
            }${roomsObj.minutes < 10 && roomsObj.minutes > 0 ? "0" : ""}${
                roomsObj.minutes
            }mn : ${this.seconds < 10 && this.seconds > 0 ? "0" : ""}${
                this.seconds
            }s`;
        }, 1000);

        ipcRenderer.send("play-timer");
    },

    stopTimer() {
        playTimer.textContent = "Reprendre";
        playTimer.style.display = "initial";
        stopTimer.style.display = "none";

        clearInterval(this.loop);

        ipcRenderer.send("stop-timer");
    },

    resetTimer() {
        playTimer.textContent = "Commencer";
        playTimer.style.display = "initial";
        stopTimer.style.display = "none";

        clearInterval(this.loop);

        roomsObj.hours = roomsObj.resetHours;
        roomsObj.minutes = roomsObj.resetMinutes;
        this.seconds = 60;

        utils.displayTimer(timer, roomsObj.hours, roomsObj.minutes);

        endTimerSound.pause();
        endTimerSound.currentTime = 0;

        message.value = "";
        ipcRenderer.send("clear-message");
    },

    confirmResetTimer() {
        confirmResetModal.style.display = "flex";
        container.style.filter = "blur(10px)";

        const confirmReset = document.querySelector("#confirm_reset");
        const cancelReset = document.querySelector("#cancel_reset");

        confirmReset.addEventListener("click", () => {
            this.resetTimer();

            confirmResetModal.style.display = "none";
            container.style.filter = "none";

            ipcRenderer.send(
                "reset-timer",
                roomsObj.resetHours,
                roomsObj.resetMinutes
            );
        });

        cancelReset.addEventListener("click", () => {
            confirmResetModal.style.display = "none";
            container.style.filter = "none";
        });
    },

    resetAlert() {
        endTimerSound.pause();
        endTimerSound.currentTime = 0;

        stopAlert.style.display = "none";
    },

    setupHomeButton() {
        container.style.display = "none";
        containerHome.style.display = "flex";

        if (ambientSound.currentTime > 0) {
            ambientSound.pause();
            ambientSound.currentTime = 0;
        }

        if (notificationSound.currentTime > 0) {
            notificationSound.pause();
            notificationSound.currentTime = 0;
        }

        if (message.value !== "") {
            message.value = "";
        }

        btnStopAmbientSound.classList.add("hidden");
        btnAmbientSound.classList.remove("hidden");

        this.resetTimer();
        ipcRenderer.send(
            "reset-timer",
            roomsObj.resetHours,
            roomsObj.resetMinutes
        );
        ipcRenderer.send("clear-message");
    },
};

export default timerObj;
