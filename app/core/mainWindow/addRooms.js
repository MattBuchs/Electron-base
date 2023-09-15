const fs = require("fs");
const path = require("path");
import manageSoundObj from "./manageSound.js";

const containerHome = document.querySelector(".container-home");
const btnAddRoom = document.querySelector("#btn-add_room");
const modalAddRoom = document.querySelector(".modal-add_room");
const closeAddRoom = document.querySelector("#close-add_room");
const btnEndTimerMusic = document.querySelector("#listen-end_timer_sound");
const stopMusic1 = document.querySelector("#stop-music-1");
const stopMusic2 = document.querySelector("#stop-music-2");
const stopMusic3 = document.querySelector("#stop-music-3");
const endTimerSoundList = document.querySelector("#end-timer_sound-list");
const notificationSoundList = document.querySelector(
    "#notification_sound-list"
);
const ambientSoundList = document.querySelector("#ambient_sound-list");

const addRoomObj = {
    init() {
        closeAddRoom.addEventListener("click", this.closeModal.bind(this));
        endTimerSoundList.addEventListener("change", this.resetBtn.bind(this));
        this.setupForm();
        this.setupModal();
    },

    setupForm() {
        const formAddRoom = document.querySelector("#form-add_room");

        formAddRoom.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.querySelector("#room_name").value;
            const minutes = document.querySelector("#room_minutes").value;
            const endTimerSound = endTimerSoundList.value;
            const notificationSound = notificationSoundList.value;
            const ambientSound = ambientSoundList.value;

            this.addRoomToData({
                name,
                minutes,
                endTimerSound,
                notificationSound,
                ambientSound,
            });
        });
    },

    setupModal() {
        btnAddRoom.addEventListener("click", () => {
            modalAddRoom.style.display = "flex";
            containerHome.style.display = "none";

            this.listSounds();
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
                if (fileContent) {
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
            minutes: Number(newRoom.minutes - 1),
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

    closeModal() {
        modalAddRoom.style.display = "none";
        containerHome.style.display = "flex";

        if (manageSoundObj.audioEndTimer) {
            manageSoundObj.audioEndTimer.pause();
            manageSoundObj.audioEndTimer.currentTime = 0;
        }

        stopMusic1.style.display = "none";
        btnEndTimerMusic.style.display = "flex";
    },

    resetBtn() {
        stopMusic1.style.display = "none";
        btnEndTimerMusic.style.display = "flex";

        if (manageSoundObj.audioEndTimer) {
            manageSoundObj.audioEndTimer.pause();
            manageSoundObj.audioEndTimer.currentTime = 0;
        }
    },
};

export default addRoomObj;
