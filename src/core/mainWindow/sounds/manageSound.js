const path = require("path");
import { sounds } from "./loadInput.js";

const btnNotificationSound = document.querySelector("#btn-notification_sound");
const btnAmbientSound = document.querySelector("#btn-ambient_sound");
const btnStopAmbientSound = document.querySelector("#btn-stop--ambient_sound");
const notificationSound = document.querySelector("#notification_sound");
const ambientSound = document.querySelector("#ambient_sound");

const manageSoundObj = {
    endTimer: null,

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
            this.stopAmbientSoundInRoom.bind(this)
        );
        sounds.forEach((obj) => {
            obj.btnListenMusic.addEventListener("click", () => {
                this.startSound(
                    obj.audioFolderName,
                    obj.soundList,
                    obj.btnStopMusic,
                    obj.btnListenMusic
                );
            });
        });
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

    stopAmbientSoundInRoom() {
        ambientSound.pause();
        ambientSound.currentTime = 0;

        btnStopAmbientSound.classList.add("hidden");
        btnAmbientSound.classList.remove("hidden");
    },

    startSound(audioName, soundList, btnStopMusic, btnListenMusic) {
        const audio = this[audioName];

        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }

        const soundValue = soundList.value;

        if (!soundValue) {
            alert("Veuillez sélectionner un son !");
            return null;
        }

        const soundPath = path.join(
            __dirname,
            `../../../public/sounds/${audioName}/${soundValue}`
        );

        this[audioName] = new Audio(soundPath);
        const newAudio = this[audioName];
        newAudio.play();

        btnStopMusic.style.display = "block";
        btnListenMusic.style.display = "none";

        this.managesSoundButtonEvents(
            btnStopMusic,
            newAudio,
            soundList,
            btnListenMusic
        );
    },

    resetBtn(stopMusic, btnListenMusic, audio) {
        stopMusic.style.display = "none";
        btnListenMusic.style.display = "flex";

        audio.pause();
        audio.currentTime = 0;
    },

    managesSoundButtonEvents(
        btnStopMusic,
        newAudio,
        soundList,
        btnListenMusic
    ) {
        // Retirer les gestionnaires d'événements existants
        btnStopMusic.removeEventListener("click", this.resetBtn);
        newAudio.removeEventListener("ended", this.resetBtn);
        soundList.removeEventListener("change", this.resetBtn);
        // closeAddRoom.removeEventListener("click", this.closeModal);

        btnStopMusic.addEventListener("click", () => {
            this.resetBtn(btnStopMusic, btnListenMusic, newAudio);
        });

        newAudio.addEventListener("ended", () => {
            this.resetBtn(btnStopMusic, btnListenMusic, newAudio);
        });

        soundList.addEventListener("change", () => {
            this.resetBtn(btnStopMusic, btnListenMusic, newAudio);
        });
    },
};

export default manageSoundObj;
