const path = require("path");
const fs = require("fs");
import utils from "../utils.js";

const btnDeleteRoom = document.querySelector("#params-delete_room");
const roomsSelect = document.querySelector("#rooms-select");

const dataFolderPath = path.join(__dirname, "../../data");
const filePath = path.join(dataFolderPath, "rooms.json");

const deleteRoomsObj = {
    init() {
        this.loadRooms();
        btnDeleteRoom.addEventListener("click", this.deleteRoom.bind(this));
    },

    loadRooms() {
        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            if (data.length > 2) {
                const rooms = JSON.parse(data);

                rooms.forEach((room) => {
                    const option = document.createElement("option");
                    option.textContent = room.name;
                    option.value = room.name;

                    roomsSelect.appendChild(option);
                });
            }
        });
    },

    deleteRoom() {
        const optionSelected =
            roomsSelect.options[roomsSelect.selectedIndex].value;

        if (optionSelected === "")
            return utils.notification("Veuillez choisir une salle");
        this.deleteRoomFromJson(optionSelected);
    },

    deleteRoomFromJson(valueSelectedOption) {
        // Charge le contenu du fichier JSON
        const jsonData = require(filePath);

        // Trouver l'index de l'objet avec l'ID donné dans le tableau
        const index = jsonData.findIndex(
            (obj) => obj.name === valueSelectedOption
        );

        // Vérifie si l'objet a été trouvé
        if (index !== -1) {
            // Supprime l'objet du tableau
            jsonData.splice(index, 1);

            // Enregistre le tableau mis à jour dans le fichier JSON
            fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
        }

        window.location.reload();
    },
};

export default deleteRoomsObj;
