import { listSounds } from "../../utils.js";
import roomsObj from "./rooms.js";
import { loadPhrases } from "../phrases/deletePhrases.js";
const fs = require("fs");
const path = require("path");

const btnUpdateRoom = document.querySelector("#update-timer");
const formUpdateTimer = document.querySelector("#update-timer_value");
const nameInput = document.querySelector("#update-title");
const timerInput = document.querySelector("#update-timer_input");
const updateAlarmSoundList = document.querySelector("#update-alarm_sound-list");
const updateAmbientSoundList = document.querySelector(
    "#update-ambient_sound-list"
);
const updateNotificationSoundList = document.querySelector(
    "#update-notification_sound-list"
);

const dataFolderPath = path.join(__dirname, "../data");
const filePath = path.join(dataFolderPath, "rooms.json");

const updateRoomObj = {
    isOptionCreatedInUpdateRoom: false,
    soundDirectories: [
        {
            path: path.join(__dirname, "../../public/sounds/end_timer"),
            listId: "#update-alarm_sound-list",
        },
        {
            path: path.join(__dirname, "../../public/sounds/ambient"),
            listId: "#update-ambient_sound-list",
        },
        {
            path: path.join(__dirname, "../../public/sounds/notification"),
            listId: "#update-notification_sound-list",
        },
    ],

    init() {
        formUpdateTimer.addEventListener("submit", (e) => this.setupForm(e));
        btnUpdateRoom.addEventListener("click", () => {
            if (!this.isOptionCreatedInUpdateRoom) {
                listSounds(this.soundDirectories);
                this.isOptionCreatedInUpdateRoom = true;
            }
            this.addValuesInInputs();
            loadPhrases();
        });
    },

    addValuesInInputs() {
        // Charger les données JSON existantes (si le fichier existe)
        let existingData = [];
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, "utf8");
            try {
                if (fileContent.length > 1) {
                    existingData = JSON.parse(fileContent);
                }
            } catch (err) {
                console.error(
                    "Erreur lors de la lecture des données JSON existantes :",
                    err
                );
                return;
            }
        }

        const indexRoom = existingData.findIndex(
            (el) => el.id === roomsObj.roomId
        );

        const roomValue = existingData[indexRoom];

        nameInput.value = roomValue.name;
        timerInput.value = `${
            roomValue.hours > 10 ? roomValue.hours : "0" + roomValue.hours
        }:${
            roomValue.minutes > 10 ? roomValue.minutes : "0" + roomValue.minutes
        }`;

        updateAlarmSoundList.value = roomValue.end_timer_sound;
        updateAmbientSoundList.value = roomValue.ambient_sound;
        updateNotificationSoundList.value = roomValue.notification_sound;
    },

    setupForm(e) {
        e.preventDefault();

        const name = nameInput.value || null;
        const time = timerInput.value || null;
        const endTimerSound = updateAlarmSoundList.value || null;
        const notificationSound = updateNotificationSoundList.value || null;
        const ambientSound = updateAmbientSoundList.value || null;

        let hours = null;
        let minutes = null;
        if (time !== null) {
            hours = time.split(":")[0];
            minutes = time.split(":")[1];
        }

        if (hours === "00" && minutes === "00") {
            notification("Le timer ne peut pas avoir une durée de 0 !");
            return;
        }

        this.updateRoomToData({
            name,
            hours,
            minutes,
            endTimerSound,
            notificationSound,
            ambientSound,
        });
    },

    updateRoomToData(obj) {
        // Charger les données JSON existantes (si le fichier existe)
        let existingData = [];
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, "utf8");
            try {
                if (fileContent.length > 1) {
                    existingData = JSON.parse(fileContent);
                }
            } catch (err) {
                console.error(
                    "Erreur lors de la lecture des données JSON existantes :",
                    err
                );
                return;
            }
        }

        existingData.map((el) => {
            if (el.id === roomsObj.roomId) {
                if (obj.name !== null) el.name = obj.name;
                if (obj.hours !== null) el.hours = Number(obj.hours);
                if (obj.minutes !== null) el.minutes = Number(obj.minutes);
                if (obj.endTimerSound !== null)
                    el.end_timer_sound = obj.endTimerSound;
                if (obj.ambientSound !== null)
                    el.ambient_sound = obj.ambientSound;
                if (obj.notificationSound !== null)
                    el.notification_sound = obj.notificationSound;
            }
        });

        // Écrire dans le fichier JSON
        fs.writeFile(
            filePath,
            JSON.stringify(existingData, null, 2),
            "utf8",
            (err) => {
                if (err) {
                    console.error(
                        "Erreur lors de l'écriture des données dans le fichier :",
                        err
                    );
                } else {
                    window.location.reload();
                }
            }
        );
    },
};

export default updateRoomObj;
