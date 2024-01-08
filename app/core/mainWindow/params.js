const { ipcRenderer } = require("electron");
const fs = require("fs");
const path = require("path");

const btnAddFileEndTimer = document.querySelector("#btn-add_file-endtimer");
const btnAddFileNotification = document.querySelector(
    "#btn-add_file-notification"
);
const btnAddFileAmbient = document.querySelector("#btn-add_file-ambient");
const notification = document.querySelector(".modal-notification");

const paramsObj = {
    init() {
        btnAddFileEndTimer.addEventListener(
            "click",
            function () {
                this.uploadFile("end_timer");
            }.bind(this)
        );
        btnAddFileNotification.addEventListener(
            "click",
            function () {
                this.uploadFile("notification");
            }.bind(this)
        );
        btnAddFileAmbient.addEventListener(
            "click",
            function () {
                this.uploadFile("ambient");
            }.bind(this)
        );
    },

    async uploadFile(pathName) {
        try {
            const fileContent = await ipcRenderer.invoke("open-file-dialog");

            if (fileContent) {
                const { file, fileName } = fileContent;
                // Créez le chemin du fichier destination dans le dossier "sound"
                const destinationPath = path.join(
                    __dirname,
                    `../sounds/${pathName}`,
                    fileName
                );

                if (fs.existsSync(destinationPath)) {
                    // Affiche une notification d'erreur
                    this.displayNotification(true);
                    return;
                }

                // Écrie le contenu du fichier dans le fichier destination
                fs.writeFileSync(destinationPath, file, "binary");

                // Affiche une notification
                this.displayNotification();
            }
        } catch (error) {
            console.error("Erreur lors de la sélection du fichier :", error);
        }
    },

    displayNotification(isError = false) {
        if (isError) {
            notification.style.backgroundColor = "#ff0000";
            notification.querySelector("p").textContent =
                "Le fichier existe déjà !";
        } else {
            notification.style.backgroundColor = "#00ff00";
            notification.querySelector("p").textContent =
                "Le fichier a bien été ajouté !";
        }

        notification.style.transform = "translateY(0)";

        setTimeout(() => {
            notification.style.transform = "translateY(-100%)";
        }, 3000);
    },
};

export default paramsObj;
