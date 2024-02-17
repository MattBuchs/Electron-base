import uploadFilesObj from "./uploadFiles.js";

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

        if (files) uploadFilesObj.uploadFiles(files, pathName);

        btn.style.zIndex = "1";
        img.style.zIndex = "1";
        e.currentTarget.style.backgroundColor = "";
    },
};

export default dragAndDropObj;
