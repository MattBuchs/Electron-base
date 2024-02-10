const { ipcRenderer } = require("electron");
const fs = require("fs");
const path = require("path");
import addRoomObj from "../rooms/addRooms.js";
import updateRoomObj from "../rooms/updateRoom.js";
import { notification } from "../../utils.js";

const btnAddFileEndTimer = document.querySelector("#btn-add_file-endtimer");
const btnAddFileNotification = document.querySelector(
    "#btn-add_file-notification"
);
const btnAddFileAmbient = document.querySelector("#btn-add_file-ambient");

const paramsObj = {
    init() {
        btnAddFileEndTimer.addEventListener("click", () =>
            this.uploadFile("end_timer")
        );
        btnAddFileNotification.addEventListener("click", () =>
            this.uploadFile("notification")
        );
        btnAddFileAmbient.addEventListener("click", () =>
            this.uploadFile("ambient")
        );
    },

    async uploadFile(pathName) {
        const fileContent = await ipcRenderer.invoke("open-file-dialog");

        if (fileContent) {
            const { file, fileName } = fileContent;
            // Créez le chemin du fichier destination dans le dossier "sound"
            const destinationPath = path.join(
                __dirname,
                `../../../public/sounds/${pathName}`,
                fileName
            );

            if (fs.existsSync(destinationPath)) {
                // Affiche une notification d'erreur
                return notification("Le fichier existe déjà !", "error");
            }

            // Écrie le contenu du fichier dans le fichier destination
            fs.writeFileSync(destinationPath, file, "binary");

            // Ajout de "false" pour que ça reload les endroits ou il y a besoin d'ajouter le nouveau fichier
            addRoomObj.isOptionCreatedInAddRoom = false;
            updateRoomObj.isOptionCreatedInUpdateRoom = false;

            // Affiche une notification
            notification("Le fichier a bien été ajouté !", "success");
        }
    },
};

export default paramsObj;
