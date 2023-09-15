const btnNotificationSound = document.querySelector("#btn-notification_sound");
const btnAmbientSound = document.querySelector("#btn-ambient_sound");
const btnStopAmbientSound = document.querySelector("#btn-stop--ambient_sound");
const notificationSound = document.querySelector("#notification_sound");
const ambientSound = document.querySelector("#ambient_sound");

const manageSoundObj = {
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
};

export default manageSoundObj;
