const fs = require("fs");
const path = require("path");
import { listSounds, notification } from "../../utils.js";

const btnAddRoom = document.querySelector("#btn-add_room");
const formAddRoom = document.querySelector("#form-add_room");
const endTimerSoundList = document.querySelector("#end-timer_sound-list");
const ambientSoundList = document.querySelector("#ambient_sound-list");
const notificationSoundList = document.querySelector(
    "#notification_sound-list"
);

const addRoomObj = {
    isOptionCreatedInAddRoom: false,
    soundDirectories: [
        {
            path: path.join(__dirname, "../../../public/sounds/end_timer"),
            listId: "#end-timer_sound-list",
        },
        {
            path: path.join(__dirname, "../../../public/sounds/ambient"),
            listId: "#ambient_sound-list",
        },
        {
            path: path.join(__dirname, "../../../public/sounds/notification"),
            listId: "#notification_sound-list",
        },
    ],

    init() {
        formAddRoom.addEventListener("submit", (e) => this.setupForm(e));
        btnAddRoom.addEventListener("click", () => {
            if (!this.isOptionCreatedInAddRoom) {
                listSounds(this.soundDirectories);
                this.isOptionCreatedInAddRoom = true;
            }
        });
    },

    setupForm(e) {
        e.preventDefault();

        const name = document.querySelector("#room_name").value;
        const time = document.querySelector("#room_times").value;
        const endTimerSound = endTimerSoundList.value || null;
        const notificationSound = notificationSoundList.value || null;
        const ambientSound = ambientSoundList.value || null;

        const hours = time.split(":")[0];
        const minutes = time.split(":")[1];

        if (hours === "00" && minutes === "00") {
            notification("Le timer ne peut pas avoir une durée de 0 !");
            return;
        }

        this.addRoomToData({
            name,
            hours,
            minutes,
            endTimerSound,
            notificationSound,
            ambientSound,
        });
    },

    addRoomToData(newRoom) {
        const dataFolderPath = path.join(__dirname, "../../data");
        const filePath = path.join(dataFolderPath, "rooms.json");

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

        const newData = {
            id: `btn-room_${existingData.length + 1}`,
            name: newRoom.name,
            end_timer_sound: newRoom.endTimerSound,
            notification_sound: newRoom.notificationSound,
            ambient_sound: newRoom.ambientSound,
            hours: Number(newRoom.hours),
            minutes: Number(newRoom.minutes),
            end_timer_volume: 1,
            notification_volume: 1,
            ambient_volume: 1,
            phrases: [],
        };

        const updatedData = [...existingData, newData];

        // Écrire dans le fichier JSON
        fs.writeFile(
            filePath,
            JSON.stringify(updatedData, null, 2),
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

export default addRoomObj;
