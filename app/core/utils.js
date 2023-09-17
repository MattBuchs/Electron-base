const notification = document.querySelector(".modal-notification");

const utils = {
    displayTimer(timer, hours, minutes) {
        timer.textContent = `${hours ? hours + "h : " : ""}${minutes}mn : 0s`;
    },

    notification(message) {
        notification.style.backgroundColor = "#ff0000";
        notification.querySelector("p").textContent = message;

        notification.style.transform = "translateY(0)";

        setTimeout(() => {
            notification.style.transform = "translateY(-100%)";
        }, 3000);
    },
};

export default utils;
