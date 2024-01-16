const fs = require("fs");
const path = require("path");

const dropAlarm = document.querySelector("#container-addFile_alarm");
const dropNotification = document.querySelector(
    "#container-addFile_notification"
);
const dropAmbient = document.querySelector("#container-addFile_ambient");

const dragAndDropObj = {
    init() {
        dropAlarm.addEventListener("dragover", (e) => {
            e.preventDefault();
            dropAlarm.style.border = "3px solid blue";
        });
        dropNotification.addEventListener("dragover", (e) => {
            e.preventDefault();
            dropNotification.style.border = "3px solid blue";
        });
        dropAmbient.addEventListener("dragover", (e) => {
            e.preventDefault();
            dropAmbient.style.border = "3px solid blue";
        });
        dropAlarm.addEventListener("drop", (e) =>
            this.handleDrop(e, "end_timer")
        );
        dropNotification.addEventListener("drop", (e) =>
            this.handleDrop(e, "notification")
        );
        dropAmbient.addEventListener("drop", (e) =>
            this.handleDrop(e, "ambient")
        );
    },

    handleDrop(e, pathName) {
        e.preventDefault();

        // Récupère les fichiers déposés
        const files = e.dataTransfer.files;

        Array.from(files).forEach((file) => {
            if (file.type !== "audio/mpeg") return;

            this.handleFolder(file, pathName);
        });

        dropAlarm.style.border = "3px solid red";
    },

    handleFolder(file, pathName) {
        console.log(file);
        const fileName = path.basename(file.path); // Obtenir le nom de fichier
        const fileContent = fs.readFileSync(file.path, "binary"); // Lire le contenu du fichier

        const destinationPath = path.join(
            __dirname,
            `../../public/sounds/${pathName}`,
            fileName
        );

        if (fs.existsSync(destinationPath)) {
            // Affiche une notification d'erreur
            return this.displayNotification(true);
        }

        // Écrie le contenu du fichier dans le fichier destination
        fs.writeFileSync(destinationPath, fileContent, "binary");
    },
};

export default dragAndDropObj;
