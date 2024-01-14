import timerObj from "./timer.js";
import messagesObj from "./messages.js";
import roomsObj from "./rooms.js";
import addRoomObj from "./addRooms.js";
import paramsObj from "./params.js";
import manageSoundObj from "./manageSound.js";
import deleteRoomsObj from "./deleteRooms.js";
import updateSoundObj from "./updateSound.js";
import addPhrasesObj from "./addPhrases.js";
import updateColorObj from "./updateColor.js";
import manageTabsObj from "./manageTabs.js";
import updateRoomObj from "./updateRoom.js";
import deletePhrasesObj from "./deletePhrases.js";

// Initialisation du chronomètre
timerObj.init();
// Initialisation des fonctionnalités liées aux messages
messagesObj.init();
// Initialisation des fonctionnalités liées aux salles de jeux
roomsObj.init();
// Initialisation des fonctionnalités liées à l'ajout de timer
addRoomObj.init();
// Initialisation des fonctionnalités liées aux paramètres du home
paramsObj.init();
// Initialisation des fonctionnalités liées à la gestion du son
manageSoundObj.init();
// Initialisation des fonctionnalités liées à la suppression de salles
deleteRoomsObj.init();
// Initialisation des fonctionnalités liées à la mise à jour du son
updateSoundObj.init();
// Initialisation des fonctionnalités liées aux paramètres de la room
addPhrasesObj.init();
// Initialisation des fonctionnalités liées au changement de couleur de l'app
updateColorObj.init();
// Initialisation des fonctionnalités liées aux onglets de la navbar
manageTabsObj.init();
// Initialisation des fonctionnalités liées à l'update d'un timer
updateRoomObj.init();
// Initialisation des fonctionnalités liées à la suppression d'une phrase
deletePhrasesObj.init();
