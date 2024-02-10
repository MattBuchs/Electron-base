import roomsObj from "./rooms.js";
import { notification, dataloaded, writeFile } from "../../utils.js";

const btnDeleteRoom = document.querySelector("#params-delete_room");
const roomsSelect = document.querySelector("#rooms-select");

const deleteRoomsObj = {
    init() {
        this.loadRooms();
        btnDeleteRoom.addEventListener("click", this.deleteRoom.bind(this));
    },

    loadRooms() {
        roomsSelect.length = 1;

        dataloaded.forEach((room) => {
            const option = document.createElement("option");
            option.textContent = room.name;
            option.value = room.name;

            roomsSelect.appendChild(option);
        });
    },

    deleteRoom() {
        const optionSelected =
            roomsSelect.options[roomsSelect.selectedIndex].value;

        if (optionSelected === "")
            return notification("Veuillez choisir une salle", "error");
        this.deleteRoomFromJson(optionSelected);
    },

    deleteRoomFromJson(valueSelectedOption) {
        // Trouver l'index de l'objet avec l'ID donné dans le tableau
        const index = dataloaded.findIndex(
            (obj) => obj.name === valueSelectedOption
        );

        // Vérifie si l'objet a été trouvé
        if (index !== -1) {
            // Supprime l'objet du tableau
            dataloaded.splice(index, 1);

            // Enregistre le tableau mis à jour dans le fichier JSON
            writeFile(dataloaded);
        }

        this.loadRooms();
        roomsObj.loadRooms();
    },
};

export default deleteRoomsObj;
