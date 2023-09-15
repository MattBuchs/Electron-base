const fs = require("fs");
const path = require("path");

const containerHome = document.querySelector(".container-home");
const btnAddRoom = document.querySelector("#btn-add_room");
const modalAddRoom = document.querySelector(".modal-add_room");
const closeAddRoom = document.querySelector("#close-add_room");
const btnListenMusic = document.querySelector("#listen-to-music");
const stopMusic = document.querySelector("#stop-music");
const soundSelected = document.querySelector("#room_sound");
let audio;

const addRoomObj = {
    init() {
        closeAddRoom.addEventListener("click", this.closeModal.bind(this));
        btnListenMusic.addEventListener("click", this.startSound.bind(this));
        soundSelected.addEventListener("change", this.resetBtn.bind(this));
        this.setupForm();
        this.setupModal();
    },

    setupForm() {
        const formAddRoom = document.querySelector("#form-add_room");

        formAddRoom.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.querySelector("#room_name").value;
            const minutes = document.querySelector("#room_minutes").value;
            const end_timer_sound = document.querySelector("#room_sound").value;

            this.addRoomToData({ name, minutes, end_timer_sound });
        });
    },

    setupModal() {
        btnAddRoom.addEventListener("click", () => {
            modalAddRoom.style.display = "flex";
            containerHome.style.display = "none";

            this.listSounds();
        });
    },

    listSounds() {
        const soundOption = document.querySelectorAll(".recover-sound");

        if (soundOption) {
            soundOption.forEach((el) => {
                el.remove();
            });
        }

        const soundFolder = path.join(__dirname, "../sounds/end_timer");
        const soundList = document.querySelector("#room_sound");

        fs.readdir(soundFolder, (err, files) => {
            if (err) {
                console.error(err);
                return;
            }

            files.forEach((el) => {
                const option = document.createElement("option");
                option.textContent = el;
                option.value = el;
                option.classList.add("recover-sound");

                soundList.appendChild(option);
            });
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
                existingData = JSON.parse(fileContent);
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
            end_timer_sound: newRoom.end_timer_sound,
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

        audio.pause();
        audio.currentTime = 0;

        stopMusic.style.display = "none";
        btnListenMusic.style.display = "flex";
    },

    startSound() {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
        const sound = document.querySelector("#room_sound").value;

        if (!sound) {
            alert("Pas de musique selectionnée");
            return;
        }

        const soundPath = path.join(__dirname, `../sounds/end_timer/${sound}`);

        audio = new Audio(soundPath);
        audio.play();

        stopMusic.style.display = "block";
        btnListenMusic.style.display = "none";

        stopMusic.addEventListener("click", () => {
            audio.pause();
            audio.currentTime = 0;

            stopMusic.style.display = "none";
            btnListenMusic.style.display = "flex";
        });

        audio.addEventListener("ended", () => {
            stopMusic.style.display = "none";
            btnListenMusic.style.display = "flex";
        });
    },

    resetBtn() {
        stopMusic.style.display = "none";
        btnListenMusic.style.display = "flex";

        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    },
};

export default addRoomObj;
