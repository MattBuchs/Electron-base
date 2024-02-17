const { ipcRenderer } = require("electron");
const fs = require("fs");
const path = require("path");
import addRoomObj from "../rooms/addRooms.js";
import updateRoomObj from "../rooms/updateRoom.js";
import deleteSongFileObj from "./deleteSongFile.js";
import { showLoadingIndicator, hideLoadingIndicator } from "../../utils.js";
import { notification } from "../UI/notification.js";

const btnAddFileEndTimer = document.querySelector("#btn-add_file-endtimer");
const btnAddFileNotification = document.querySelector(
    "#btn-add_file-notification"
);
const btnAddFileAmbient = document.querySelector("#btn-add_file-ambient");

const uploadFilesObj = {
    MAX_FILE_SIZE: 524288000, // 500 Mo (en octets)

    init() {
        btnAddFileEndTimer.addEventListener("click", () =>
            this.loadFiles("end_timer")
        );
        btnAddFileNotification.addEventListener("click", () =>
            this.loadFiles("notification")
        );
        btnAddFileAmbient.addEventListener("click", () =>
            this.loadFiles("ambient")
        );
    },

    async loadFiles(pathName) {
        const files = await ipcRenderer.invoke("open-file-dialog");

        if (files) this.uploadFiles(files, pathName);
    },

    handleFolder(file, pathName) {
        const fileName = file.name; // Obtenir le nom de fichier
        const fileContent = fs.readFileSync(file.path, "binary"); // Lire le contenu du fichier

        const destinationPath = path.join(
            __dirname,
            `../../../public/sounds/${pathName}`,
            fileName
        );

        if (fs.existsSync(destinationPath)) {
            // Affiche une notification d'erreur
            return notification(
                `Le fichier ${fileName} est déja présent.`,
                "error"
            );
        }

        // Écrie le contenu du fichier dans le fichier destination
        fs.writeFileSync(destinationPath, fileContent, "binary");

        // Ajout de "false" pour reload les endroits ou il y a besoin d'ajouter le nouveau fichier
        addRoomObj.isOptionCreatedInAddRoom = false;
        updateRoomObj.isOptionCreatedInUpdateRoom = false;

        notification(`Le fichier ${fileName} à été ajouté.`, "success");
    },

    uploadFiles(files, pathName) {
        // Affiche l'élément de chargement si un fichier est déposé
        if (files.length > 0) {
            showLoadingIndicator();
        }

        Array.from(files).forEach((file) => {
            if (file.size === 0)
                return notification(
                    "Une erreur est survenue, veuillez réésayer.",
                    "error"
                );
            if (file.type !== "audio/mpeg")
                return notification(
                    "Le fichier n'est pas de type audio.",
                    "error"
                );
            if (file.size > this.MAX_FILE_SIZE)
                return notification("Le fichier est trop volumineux.", "error");

            this.handleFolder(file, pathName);
            deleteSongFileObj.loadSong();
        });

        // Masque le chargement une fois le traitement terminé
        setTimeout(() => {
            hideLoadingIndicator();
        }, 300);
    },
};

export default uploadFilesObj;
