const fs = require("fs");
const path = require("path");
import utils from "../utils.js";

const btnAddRoom = document.querySelector("#btn-add_room");
const formAddRoom = document.querySelector("#form-add_room");
const endTimerSoundList = document.querySelector("#end-timer_sound-list");
const ambientSoundList = document.querySelector("#ambient_sound-list");
const notificationSoundList = document.querySelector(
    "#notification_sound-list"
);

const addRoomObj = {
    init() {
        formAddRoom.addEventListener("submit", (e) => this.setupForm(e));
        btnAddRoom.addEventListener("click", this.listSounds.bind(this));
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
            utils.notification("Le timer ne peut pas avoir une durée de 0 !");
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

    addOptionsFromDirectory(directoryPath, listElement) {
        const soundFiles = fs.readdirSync(directoryPath);
        soundFiles.forEach((fileName) => {
            const option = document.createElement("option");
            option.textContent = fileName;
            option.value = fileName;
            option.classList.add("recover-sound");
            listElement.appendChild(option);
        });
    },

    listSounds() {
        const directories = [
            {
                path: path.join(__dirname, "../sounds/end_timer"),
                listId: "#end-timer_sound-list",
            },
            {
                path: path.join(__dirname, "../sounds/ambient"),
                listId: "#ambient_sound-list",
            },
            {
                path: path.join(__dirname, "../sounds/notification"),
                listId: "#notification_sound-list",
            },
        ];

        directories.forEach((directory) => {
            const soundOption = document.querySelectorAll(
                `${directory.listId} .recover-sound`
            );
            soundOption.forEach((el) => {
                el.remove();
            });

            const listElement = document.querySelector(directory.listId);
            addRoomObj.addOptionsFromDirectory(directory.path, listElement);
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
