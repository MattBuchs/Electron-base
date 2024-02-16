const fs = require("fs");
const path = require("path");
import { notification } from "../UI/notification.js";

const dropContainers = document.querySelectorAll(".file-import");

const dragAndDropObj = {
    pathNameList: ["end_timer", "notification", "ambient"],

    init() {
        // Ajoutez les écouteurs d'événements à chaque conteneur
        dropContainers.forEach((container, index) => {
            this.addDragDropListeners(container, index);
        });
    },

    addDragDropListeners(element, index) {
        const button = element.parentNode.querySelector("button");
        const img = element.parentNode.querySelector("img");

        element.addEventListener("dragenter", (e) =>
            this.handleDragEnter(e, button, img)
        );
        element.addEventListener("dragleave", (e) =>
            this.handleDragLeave(e, button, img)
        );
        document.addEventListener("dragover", (e) => e.preventDefault());
        element.addEventListener("drop", (e) =>
            this.handleDrop(e, this.pathNameList[index], button, img)
        );
    },

    handleDragEnter(e, button, img) {
        e.preventDefault();
        e.currentTarget.style.backgroundColor = "#dbdbdb4d";

        button.style.zIndex = "0";
        img.style.zIndex = "0";
    },

    handleDragLeave(e, button, img) {
        e.preventDefault();
        e.currentTarget.style.backgroundColor = "";

        button.style.zIndex = "1";
        img.style.zIndex = "1";
    },

    handleDrop(e, pathName, btn, img) {
        e.preventDefault();

        // Récupère les fichiers déposés
        const files = e.dataTransfer.files;

        Array.from(files).forEach((file) => {
            if (file.type !== "audio/mpeg") return;

            this.handleFolder(file, pathName);
        });

        btn.style.zIndex = "1";
        img.style.zIndex = "1";
        e.currentTarget.style.backgroundColor = "";
    },

    handleFolder(file, pathName) {
        const fileName = path.basename(file.path); // Obtenir le nom de fichier
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
    },
};

export default dragAndDropObj;
