const fs = require("fs");
const path = require("path");

const checkAndCreateFolders = () => {
    const folders = [
        "../../../public/sounds/ambient",
        "../../../public/sounds/end_timer",
        "../../../public/sounds/notification",
    ];

    folders.forEach((folder) => {
        const pathFolder = path.join(__dirname, folder);

        // Vérifier si le dossier existe
        if (!fs.existsSync(pathFolder)) {
            // Si le dossier n'existe pas, le créer
            fs.mkdirSync(pathFolder);
        }
    });
};

export default checkAndCreateFolders;
