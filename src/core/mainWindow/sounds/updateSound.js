import roomsObj from "../rooms/rooms.js";
import { openModal, writeFile, dataloaded, closeModal } from "../../utils.js";

const containerRoom = document.querySelector("#container-room");
const modalParamsSound = document.querySelector("#modal-params_sound");
const modalContent = document.querySelector("#modal-params_sound__content");
const openParamsSound = document.querySelector("#params-sound");
const validateParamsSound = document.querySelector("#btn-validate_sound");
const closeParamsSound = document.querySelector("#close-params_sound");
const endTimerRange = document.querySelector("#volume-end_timer");
const notificationRange = document.querySelector("#volume-notification");
const amibentRange = document.querySelector("#volume-amibent");
const pourcentageVolume = document.querySelectorAll(".volume p");
const modalAddPhrases = document.querySelector("#modal-add_phrases");
const btnAddPhrases = document.querySelector("#btn-add_phrases");

const updateSoundObj = {
    init() {
        openParamsSound.addEventListener("click", () => {
            roomsObj.updateRangeAndSound(roomsObj.roomId);
            openModal(
                containerRoom,
                modalParamsSound,
                modalContent,
                modalAddPhrases,
                openParamsSound,
                btnAddPhrases
            );
        });
        endTimerRange.addEventListener("input", () =>
            this.percentageUpdate(endTimerRange, 0)
        );
        notificationRange.addEventListener("input", () =>
            this.percentageUpdate(notificationRange, 1)
        );
        amibentRange.addEventListener("input", () =>
            this.percentageUpdate(amibentRange, 2)
        );
        validateParamsSound.addEventListener("click", () =>
            this.updateSound(openParamsSound)
        );
        modalParamsSound.addEventListener("click", () =>
            closeModal(modalParamsSound, openParamsSound)
        );
        closeParamsSound.addEventListener("click", () =>
            closeModal(modalParamsSound, openParamsSound)
        );
    },

    updateSound(btn) {
        modalParamsSound.classList.add("hidden");
        containerRoom.classList.remove("blur");

        if (btn.classList.contains("active")) btn.classList.remove("active");

        // Trouver l'index de l'objet avec l'ID donné dans le tableau
        const index = dataloaded.findIndex((obj) => obj.id === roomsObj.roomId);

        const endTimerCalc = Number(endTimerRange.value) / 100;
        const notificationCalc = Number(notificationRange.value) / 100;
        const ambientCalc = Number(amibentRange.value) / 100;

        if (
            dataloaded[index].end_timer_volume === endTimerCalc &&
            dataloaded[index].notification_volume === notificationCalc &&
            dataloaded[index].ambient_volume === ambientCalc
        ) {
            return;
        }

        if (index !== -1) {
            dataloaded[index].end_timer_volume = endTimerCalc;
            dataloaded[index].notification_volume = notificationCalc;
            dataloaded[index].ambient_volume = ambientCalc;
        }

        // Enregistrer le fichier JSON
        writeFile(dataloaded);

        const endTimerSound = document.querySelector("#end-timer_sound");
        const notificationSound = document.querySelector("#notification_sound");
        const ambientSound = document.querySelector("#ambient_sound");

        endTimerSound.volume = endTimerCalc;
        notificationSound.volume = notificationCalc;
        ambientSound.volume = ambientCalc;

        roomsObj.rangeValue[index].end_timer_volume = endTimerCalc;
        roomsObj.rangeValue[index].notification_volume = notificationCalc;
        roomsObj.rangeValue[index].ambient_volume = ambientCalc;
    },

    percentageUpdate(range, index) {
        const percentage = range.value + "%";
        pourcentageVolume[index].textContent = percentage;
    },
};

export default updateSoundObj;
