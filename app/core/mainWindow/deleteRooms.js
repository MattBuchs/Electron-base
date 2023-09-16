const path = require("path");
const fs = require("fs");

const btnDeleteRoom = document.querySelector("#params-delete_room");
const modal = document.querySelector(".modal-params");
const btnAddRoom = document.querySelector("#btn-add_room");
const btnParams = document.querySelector("#btn-params");
const btnRemoveDelete = document.querySelector("#btn-remove_delete");

const deleteRoomsObj = {
    init() {
        btnDeleteRoom.addEventListener("click", this.deleteRoom.bind(this));
        btnRemoveDelete.addEventListener(
            "click",
            this.removeDeleteRoom.bind(this)
        );
    },

    deleteRoom() {
        const btnsDelete = document.querySelectorAll(".btn-delete_room");

        btnAddRoom.classList.add("hidden");
        btnParams.classList.add("hidden");
        btnRemoveDelete.classList.remove("hidden");

        btnsDelete.forEach((el) => {
            const id = el.parentNode.id;

            el.classList.remove("hidden");
            el.addEventListener("click", function () {
                const deleteConfirm = confirm(
                    "Etes-vous sur de vouloir supprimé le timer ?"
                );

                if (deleteConfirm) {
                    deleteRoomsObj.deleteRoomFromJson(id);
                }
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

    removeDeleteRoom() {
        const btnDeleteRooms = document.querySelectorAll(".btn-delete_room");

        btnAddRoom.classList.remove("hidden");
        btnParams.classList.remove("hidden");
        btnRemoveDelete.classList.add("hidden");

        btnDeleteRooms.forEach((el) => {
            el.classList.add("hidden");
        });
    },
};

export default deleteRoomsObj;
