const endTimerSoundList = document.querySelector("#end-timer_sound-list");
const updateAlarmSoundList = document.querySelector("#update-alarm_sound-list");
const notificationSoundList = document.querySelector(
    "#notification_sound-list"
);
const ambientSoundList = document.querySelector("#ambient_sound-list");
const updateAmbientSoundList = document.querySelector(
    "#update-ambient_sound-list"
);
const updateNotificationSoundList = document.querySelector(
    "#update-notification_sound-list"
);
const stopMusic = document.querySelectorAll(".stop-music");
const listenMusic = document.querySelectorAll(".listen-music");

export const sounds = [
    {
        id: 1,
        btnListenMusic: listenMusic[0],
        audioFolderName: "end_timer",
        soundList: endTimerSoundList,
        btnStopMusic: stopMusic[0],
    },
    {
        id: 2,
        btnListenMusic: listenMusic[1],
        audioFolderName: "notification",
        soundList: notificationSoundList,
        btnStopMusic: stopMusic[1],
    },
    {
        id: 3,
        btnListenMusic: listenMusic[2],
        audioFolderName: "ambient",
        soundList: ambientSoundList,
        btnStopMusic: stopMusic[2],
    },
    {
        id: 4,
        btnListenMusic: listenMusic[3],
        audioFolderName: "end_timer",
        soundList: updateAlarmSoundList,
        btnStopMusic: stopMusic[3],
    },
    {
        id: 5,
        btnListenMusic: listenMusic[4],
        audioFolderName: "notification",
        soundList: updateNotificationSoundList,
        btnStopMusic: stopMusic[4],
    },
    {
        id: 6,
        btnListenMusic: listenMusic[5],
        audioFolderName: "ambient",
        soundList: updateAmbientSoundList,
        btnStopMusic: stopMusic[5],
    },
];
