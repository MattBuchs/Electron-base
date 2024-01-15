const fs = require("fs");
const path = require("path");
import roomsObj from "../rooms/rooms.js";
import { openModal } from "../../utils.js";

const containerRoom = document.querySelector("#container-room");
const modalParamsSound = document.querySelector("#modal-params_sound");
const modalContent = document.querySelector("#modal-params_sound__content");
const openParamsSound = document.querySelector("#params-sound");
const closeParamsSound = document.querySelector("#close-params_sound");
const endTimerRange = document.querySelector("#volume-end_timer");
const notificationRange = document.querySelector("#volume-notification");
const amibentRange = document.querySelector("#volume-amibent");
const pourcentageVolume = document.querySelectorAll(".volume p");
const modalAddPhrases = document.querySelector("#modal-add_phrases");

const updateSoundObj = {
    init() {
        openParamsSound.addEventListener("click", () =>
            openModal(
                containerRoom,
                modalParamsSound,
                modalContent,
                modalAddPhrases
            )
        );
        endTimerRange.addEventListener("input", () =>
            this.percentageUpdate(endTimerRange, 0)
        );
        notificationRange.addEventListener("input", () =>
            this.percentageUpdate(notificationRange, 1)
        );
        amibentRange.addEventListener("input", () =>
            this.percentageUpdate(amibentRange, 2)
        );
        closeParamsSound.addEventListener(
            "click",
            this.closeModalUpdateSound.bind(this)
        );
        modalParamsSound.addEventListener(
            "click",
            this.closeModalUpdateSound.bind(this)
        );
    },

    closeModalUpdateSound() {
        modalParamsSound.classList.add("hidden");
        containerRoom.classList.remove("blur");

        const dataFolderPath = path.join(__dirname, "../data");
        const filePath = path.join(dataFolderPath, "rooms.json");

        // Charger les données JSON existantes
        const jsonData = require(filePath);

        // Trouver l'index de l'objet avec l'ID donné dans le tableau
        const index = jsonData.findIndex((obj) => obj.id === roomsObj.roomId);

        const endTimerCalc = Number(endTimerRange.value) / 100;
        const notificationCalc = Number(notificationRange.value) / 100;
        const ambientCalc = Number(amibentRange.value) / 100;

        if (
            jsonData[index].end_timer_volume === endTimerCalc &&
            jsonData[index].notification_volume === notificationCalc &&
            jsonData[index].ambient_volume === ambientCalc
        ) {
            return;
        }

        if (index !== -1) {
            jsonData[index].end_timer_volume = endTimerCalc;
            jsonData[index].notification_volume = notificationCalc;
            jsonData[index].ambient_volume = ambientCalc;
        }

        // Convertir les données en JSON
        const jsonString = JSON.stringify(jsonData);

        // Enregistrer le fichier JSON
        fs.writeFile(filePath, jsonString, (err) => {
            if (err) {
                console.error(err);
                return;
            }
        });

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
