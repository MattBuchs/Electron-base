const fs = require("fs");
const path = require("path");

const containerHome = document.querySelector(".container-home");
const btnAddRoom = document.querySelector("#btn-add_room");
const modalAddRoom = document.querySelector(".modal-add_room");
const closeAddRoom = document.querySelector("#close-add_room");
const btnListenMusic = document.querySelector("#listen-to-music");
const stopMusic = document.querySelector("#stop-music");
const songSelected = document.querySelector("#room_song");
let audio;

const addRoomObj = {
    init() {
        closeAddRoom.addEventListener("click", this.closeModal.bind(this));
        btnListenMusic.addEventListener("click", this.startSong.bind(this));
        songSelected.addEventListener("change", this.resetBtn.bind(this));
        this.setupForm();
        this.setupModal();
    },

    setupForm() {
        const formAddRoom = document.querySelector("#form-add_room");

        formAddRoom.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.querySelector("#room_name").value;
            const minutes = document.querySelector("#room_minutes").value;
            const song = document.querySelector("#room_song").value;

            this.addRoomToData({ name, minutes, song });
        });
    },

    setupModal() {
        btnAddRoom.addEventListener("click", () => {
            modalAddRoom.style.display = "flex";
            containerHome.style.display = "none";

            this.listSongs();
        });
    },

    listSongs() {
        const songFolder = path.join(__dirname, "../song");
        const songList = document.querySelector("#room_song");

        fs.readdir(songFolder, (err, files) => {
            if (err) {
                console.error(err);
                return;
            }

            files.forEach((el) => {
                const option = document.createElement("option");
                option.textContent = el;
                option.value = el;

                songList.appendChild(option);
            });
        });
    },

    addRoomToData(newRoom) {
        const dataFolderPath = path.join(__dirname, "../../data");
        const filePath = path.join(dataFolderPath, "rooms.json");

        // Charger les données JSON existantes (si le fichier existe)
        let existingData;
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
        } else {
            existingData = [];
        }

        const newData = {
            id: `btn-room_${existingData.length + 1}`,
            ...newRoom,
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
    },

    startSong() {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
        const song = document.querySelector("#room_song").value;

        if (!song) {
            alert("Pas de musique selectionnée");
            return;
        }

        const songPath = path.join(__dirname, `../song/${song}`);

        audio = new Audio(songPath);
        audio.play();

        stopMusic.style.display = "block";
        btnListenMusic.style.display = "none";

        stopMusic.addEventListener("click", () => {
            audio.pause();
            audio.currentTime = 0;

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
