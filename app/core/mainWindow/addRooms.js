const fs = require("fs");
const path = require("path");

const containerHome = document.querySelector(".container-home");
const btnAddRoom = document.querySelector("#btn-add_room");
const modalAddRoom = document.querySelector(".modal-add_room");
const endTimerSoundList = document.querySelector("#end-timer_sound-list");
const notificationSoundList = document.querySelector(
    "#notification_sound-list"
);
const ambientSoundList = document.querySelector("#ambient_sound-list");
const notification = document.querySelector(".modal-notification");

const addRoomObj = {
    init() {
        this.setupForm();
        this.setupModal();
    },

    setupForm() {
        const formAddRoom = document.querySelector("#form-add_room");

        formAddRoom.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.querySelector("#room_name").value;
            const time = document.querySelector("#room_times").value;
            const endTimerSound = endTimerSoundList.value;
            const notificationSound = notificationSoundList.value;
            const ambientSound = ambientSoundList.value;

            const hours = time.split(":")[0];
            const minutes = time.split(":")[1];

            if (hours === "00" && minutes === "00") {
                this.notification();
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
        console.log(newRoom);

        const newData = {
            id: `btn-room_${existingData.length + 1}`,
            name: newRoom.name,
            end_timer_sound: newRoom.endTimerSound,
            notification_sound: newRoom.notificationSound,
            ambient_sound: newRoom.ambientSound,
            hours: Number(newRoom.hours),
            minutes: Number(newRoom.minutes),
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

    notification() {
        notification.style.backgroundColor = "#ff0000";
        notification.querySelector("p").textContent =
            "Le timer ne peut pas avoir une durée de 0 !";

        notification.style.transform = "translateY(0)";

        setTimeout(() => {
            notification.style.transform = "translateY(-100%)";
        }, 3000);
    },
};

export default addRoomObj;
