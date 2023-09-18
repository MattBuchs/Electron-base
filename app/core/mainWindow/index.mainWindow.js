import timerObj from "./timer.js";
import messagesObj from "./messages.js";
import roomsObj from "./rooms.js";
import addRoomObj from "./addRooms.js";
import paramsObj from "./params.js";
import manageSoundObj from "./manageSound.js";
import deleteRoomsObj from "./deleteRooms.js";
import updateSoundObj from "./updateSound.js";

// Initialisation du chronomètre
timerObj.init();
// Initialisation des fonctionnalités liées aux messages
messagesObj.init();
// Initialisation des fonctionnalités liées aux salles de jeux
roomsObj.init();
// Initialisation des fonctionnalités liées à l'ajout de timer
addRoomObj.init();
// Initialisation des fonctionnalités liées aux paramètres
paramsObj.init();
// Initialisation des fonctionnalités liées à la gestion du son
manageSoundObj.init();
// Initialisation des fonctionnalités liées à la suppression de salles
deleteRoomsObj.init();
// Initialisation des fonctionnalités liées à la mise à jour du son
updateSoundObj.init();
