const fs = require("fs");
const path = require("path");
import roomsObj from "./rooms.js";

const container = document.querySelector(".container");
const modalParamsSound = document.querySelector(".modal-params_sound");
const openParamsSound = document.querySelector(".params-sound");
const closeParamsSound = document.querySelector("#close-params_sound");
const endTimerRange = document.querySelector("#volume-end_timer");
const notificationRange = document.querySelector("#volume-notification");
const amibentRange = document.querySelector("#volume-amibent");
const pourcentageVolume = document.querySelectorAll(".volume p");

const updateSoundObj = {
    init() {
        openParamsSound.addEventListener("click", this.openModal.bind(this));
        endTimerRange.addEventListener(
            "input",
            function () {
                this.percentageUpdate(endTimerRange, 0);
            }.bind(this)
        );
        notificationRange.addEventListener(
            "input",
            function () {
                this.percentageUpdate(notificationRange, 1);
            }.bind(this)
        );
        amibentRange.addEventListener(
            "input",
            function () {
                this.percentageUpdate(amibentRange, 2);
            }.bind(this)
        );
        closeParamsSound.addEventListener("click", this.closeModal.bind(this));
    },

    openModal() {
        modalParamsSound.classList.remove("hidden");
        closeParamsSound.classList.remove("hidden");
        container.classList.add("blur");
    },

    closeModal() {
        modalParamsSound.classList.add("hidden");
        closeParamsSound.classList.add("hidden");
        container.classList.remove("blur");

        const dataFolderPath = path.join(__dirname, "../../data");
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
