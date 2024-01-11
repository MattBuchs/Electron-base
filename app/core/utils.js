const notification = document.querySelector("#notification");

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

    openModal(container, modal, modalContent, otherModal) {
        modalContent.addEventListener("click", (e) => e.stopPropagation());

        modal.classList.remove("hidden");
        container.classList.add("blur");

        if (!otherModal.classList.contains("hidden")) {
            otherModal.classList.add("hidden");
        }
    },

    closeModal(modal, container) {
        modal.classList.add("hidden");
        container.classList.remove("blur");
    },
};

export const { openModal, closeModal } = utils;
export default utils;
