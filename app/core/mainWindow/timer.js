const { ipcRenderer } = require("electron");
import utils from "../utils.js";
import roomsObj from "./rooms.js";

const timer = document.querySelector(".container p");
const playTimer = document.querySelector("#play");
const stopTimer = document.querySelector("#stop");
const btnResetTimer = document.querySelector("#reset");
const stopAlert = document.querySelector("#stop-alert");
const sound = document.querySelector("#end-timer_sound");
const container = document.querySelector(".container");
const containerHome = document.querySelector(".container-home");
const confirmResetModal = document.querySelector("#request-reset");
const home = document.querySelector("#btn-home");
const ambientSound = document.querySelector("#ambient_sound");
const btnAmbientSound = document.querySelector("#btn-ambient_sound");
const btnStopAmbientSound = document.querySelector("#btn-stop--ambient_sound");

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
        sound.addEventListener("ended", this.resetAlert.bind(this));
        home.addEventListener("click", this.setupHomeButton.bind(this));
    },

    startTimer() {
        stopTimer.style.display = "initial";
        playTimer.style.display = "none";

        this.loop = setInterval(() => {
            this.seconds--;

            if (roomsObj.minutes === 0 && this.seconds === 0) {
                clearInterval(this.loop);
                stopTimer.style.display = "none";
                playTimer.style.display = "none";
                stopAlert.style.display = "initial";

                ambientSound.pause();
                ambientSound.currentTime = 0;
                btnStopAmbientSound.classList.add("hidden");
                btnAmbientSound.classList.remove("hidden");

                sound.play();
            } else {
                if (this.seconds === -1) {
                    roomsObj.minutes--;
                    this.seconds = 59;
                }
            }

            timer.textContent = `${roomsObj.minutes < 10 ? "0" : ""}${
                roomsObj.minutes
            }mn : ${this.seconds < 10 ? "0" : ""}${this.seconds}s`;
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

        roomsObj.minutes = roomsObj.resetMinutes;
        this.seconds = 60;

        utils.displayTimer(timer, roomsObj.minutes);

        sound.pause();
        sound.currentTime = 0;
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

            ipcRenderer.send("reset-timer", roomsObj.resetMinutes);
        });

        cancelReset.addEventListener("click", () => {
            confirmResetModal.style.display = "none";
            container.style.filter = "none";
        });
    },

    resetAlert() {
        sound.pause();
        sound.currentTime = 0;

        stopAlert.style.display = "none";
    },

    setupHomeButton() {
        container.style.display = "none";
        containerHome.style.display = "flex";

        this.resetTimer();
        ipcRenderer.send("reset-timer", roomsObj.resetMinutes);
        ipcRenderer.send("clear-message");
    },
};

export default timerObj;
