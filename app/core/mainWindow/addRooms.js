const fs = require("fs");
const path = require("path");

const containerHome = document.querySelector(".container-home");

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
            const minutes = document.querySelector("#room_minutes").value;
            const song = document.querySelector("#room_song").value;

            this.addRoomToData({ name, minutes, song });
        });
    },

    setupModal() {
        const btnAddRoom = document.querySelector("#btn-add_room");
        const modalAddRoom = document.querySelector(".modal-add_room");

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
                }
            }
        );
    },
};

export default addRoomObj;
