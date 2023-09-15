const path = require("path");

const btnNotificationSound = document.querySelector("#btn-notification_sound");
const btnAmbientSound = document.querySelector("#btn-ambient_sound");
const btnStopAmbientSound = document.querySelector("#btn-stop--ambient_sound");
const notificationSound = document.querySelector("#notification_sound");
const ambientSound = document.querySelector("#ambient_sound");
const endTimerSoundList = document.querySelector("#end-timer_sound-list");
const notificationSoundList = document.querySelector(
    "#notification_sound-list"
);
const ambientSoundList = document.querySelector("#ambient_sound-list");
const stopMusic1 = document.querySelector("#stop-music-1");
const stopMusic2 = document.querySelector("#stop-music-2");
const stopMusic3 = document.querySelector("#stop-music-3");
const btnEndTimerMusic = document.querySelector("#listen-end_timer_sound");
const btnNotificationMusic = document.querySelector(
    "#listen-notification_sound"
);
const btnAmbientMusic = document.querySelector("#listen-ambient_sound");

const manageSoundObj = {
    audioEndTimer: null,
    audioNotification: null,
    audioAmbient: null,

    init() {
        btnNotificationSound.addEventListener(
            "click",
            this.startNotificationSound.bind(this)
        );
        btnAmbientSound.addEventListener(
            "click",
            this.startAmbientSound.bind(this)
        );
        btnStopAmbientSound.addEventListener(
            "click",
            this.stopAmbientSound.bind(this)
        );
        this.startSound();
    },

    startNotificationSound() {
        notificationSound.play();

        if (notificationSound.duration > 6) {
            setTimeout(() => {
                notificationSound.pause();
                notificationSound.currentTime = 0;
            }, 6000);
        }
    },

    startAmbientSound() {
        ambientSound.play();

        // Loop the sound
        ambientSound.addEventListener(
            "ended",
            function () {
                this.currentTime = 0;
                this.play();
            },
            false
        );

        btnStopAmbientSound.classList.remove("hidden");
        btnAmbientSound.classList.add("hidden");
    },

    stopAmbientSound() {
        ambientSound.pause();
        ambientSound.currentTime = 0;

        btnStopAmbientSound.classList.add("hidden");
        btnAmbientSound.classList.remove("hidden");
    },

    startSound() {
        btnEndTimerMusic.addEventListener("click", () => {
            if (this.audioEndTimer) {
                this.audioEndTimer.pause();
                this.audioEndTimer.currentTime = 0;
            }
            const endTimerSoundValue = endTimerSoundList.value;

            if (!endTimerSoundValue) {
                alert("Veuillez selectionner un son !");
                return;
            }

            const soundPath = path.join(
                __dirname,
                `../sounds/end_timer/${endTimerSoundValue}`
            );

            this.audioEndTimer = new Audio(soundPath);
            this.audioEndTimer.play();

            stopMusic1.style.display = "block";
            btnEndTimerMusic.style.display = "none";

            stopMusic1.addEventListener("click", () => {
                this.audioEndTimer.pause();
                this.audioEndTimer.currentTime = 0;

                stopMusic1.style.display = "none";
                btnEndTimerMusic.style.display = "flex";
            });

            this.audioEndTimer.addEventListener("ended", () => {
                stopMusic1.style.display = "none";
                btnEndTimerMusic.style.display = "flex";
            });
        });

        btnNotificationMusic.addEventListener("click", () => {
            if (this.audioNotification) {
                this.audioEndTimer.pause();
                this.audioEndTimer.currentTime = 0;
            }
            const notificationSoundValue = notificationSoundList.value;

            if (!notificationSoundValue) {
                alert("Veuillez selectionner un son !");
                return;
            }

            const soundPath = path.join(
                __dirname,
                `../sounds/notification/${notificationSoundValue}`
            );

            this.audioNotification = new Audio(soundPath);
            this.audioNotification.play();

            stopMusic2.style.display = "block";
            btnNotificationMusic.style.display = "none";

            stopMusic2.addEventListener("click", () => {
                this.audioNotification.pause();
                this.audioNotification.currentTime = 0;

                stopMusic2.style.display = "none";
                btnNotificationMusic.style.display = "flex";
            });

            this.audioNotification.addEventListener("ended", () => {
                stopMusic2.style.display = "none";
                btnNotificationMusic.style.display = "flex";
            });
        });

        btnAmbientMusic.addEventListener("click", () => {
            if (this.audioAmbient) {
                this.audioAmbient.pause();
                this.audioAmbient.currentTime = 0;
            }
            const ambientSoundValue = ambientSoundList.value;

            if (!ambientSoundValue) {
                alert("Veuillez selectionner un son !");
                return;
            }

            const soundPath = path.join(
                __dirname,
                `../sounds/ambient/${ambientSoundValue}`
            );

            this.audioAmbient = new Audio(soundPath);
            this.audioAmbient.play();

            stopMusic3.style.display = "block";
            btnAmbientMusic.style.display = "none";

            stopMusic3.addEventListener("click", () => {
                this.audioAmbient.pause();
                this.audioAmbient.currentTime = 0;

                stopMusic3.style.display = "none";
                btnAmbientMusic.style.display = "flex";
            });

            this.audioAmbient.addEventListener("ended", () => {
                stopMusic3.style.display = "none";
                btnAmbientMusic.style.display = "flex";
            });
        });
    },
};

export default manageSoundObj;
