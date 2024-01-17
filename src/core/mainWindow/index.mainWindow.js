import timerObj from "./timer/timer.js";
import messagesObj from "./UI/messages.js";
import roomsObj from "./rooms/rooms.js";
import addRoomObj from "./rooms/addRooms.js";
import paramsObj from "./settings/settings.js";
import manageSoundObj from "./sounds/manageSound.js";
import deleteRoomsObj from "./rooms/deleteRooms.js";
import updateSoundObj from "./sounds/updateSound.js";
import addPhrasesObj from "./phrases/addPhrases.js";
import updateColorObj from "./settings/updateColor.js";
import manageTabsObj from "./UI/manageTabs.js";
import updateRoomObj from "./rooms/updateRoom.js";
import deletePhrasesObj from "./phrases/deletePhrases.js";
import dragAndDropObj from "./settings/DragAndDrop.js";
import deleteSongFileObj from "./settings/deleteSongFile.js";
import manageNavbarObj from "./UI/manageNavbar.js";

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
// Initialisation des fonctionnalités liées au drag and drop
dragAndDropObj.init();

deleteSongFileObj.init();

manageNavbarObj.init();
