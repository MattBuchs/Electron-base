const path = require("path");
const fs = require("fs");

const btnDeleteRoom = document.querySelector("#params-delete_room");
const modal = document.querySelector(".modal-params");

const deleteRoomsObj = {
    init() {
        btnDeleteRoom.addEventListener("click", this.deleteRoom.bind(this));
    },

    deleteRoom() {
        const btnsDelete = document.querySelectorAll(".btn-delete_room");
        btnsDelete.forEach((el) => {
            const id = el.parentNode.id;

            el.classList.remove("hidden");
            el.addEventListener("click", function () {
                deleteRoomsObj.deleteRoomFromJson(id);
            });
        });

        modal.classList.add("hidden");
    },

    deleteRoomFromJson(objectIdToDelete) {
        const dataFolderPath = path.join(__dirname, "../../data");
        const filePath = path.join(dataFolderPath, "rooms.json");

        // Charge le contenu du fichier JSON
        const jsonData = require(filePath);

        // Trouver l'index de l'objet avec l'ID donné dans le tableau
        const indexToDelete = jsonData.findIndex(
            (obj) => obj.id === objectIdToDelete
        );
        console.log(indexToDelete);

        // Vérifie si l'objet a été trouvé
        if (indexToDelete !== -1) {
            // Supprime l'objet du tableau
            jsonData.splice(indexToDelete, 1);

            // Enregistre le tableau mis à jour dans le fichier JSON
            fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
        }

        window.location.reload();
    },
};

export default deleteRoomsObj;
