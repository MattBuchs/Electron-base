const notificationContainer = document.querySelector("#container_notification");

const notificationObj = {
    id: 1,
    notificationQueue: [], // File d'attente pour les notifications

    notification(message, tag) {
        const messageExists = notificationObj.notificationQueue.some(
            (obj) => obj.message === message
        );

        if (!messageExists) {
            // Ajoute la notification à la file d'attente
            notificationObj.notificationQueue.push({
                id: notificationObj.id,
                message,
                tag,
            });

            notificationObj.createNotification(
                message,
                tag,
                notificationObj.id
            );
            notificationObj.displayNextNotification(notificationObj.id);

            notificationObj.id++;
        }
    },

    displayNextNotification(id) {
        // Vérifie s'il y a des notifications en attente dans la file
        if (notificationObj.notificationQueue.length > 0) {
            const notificationContent = document.querySelector(
                `#notification-${id}`
            );

            notificationContent.classList.add("activeNotification");

            setTimeout(() => {
                notificationContent.classList.remove("activeNotification");
                notificationObj.notificationQueue.shift();

                notificationObj.deleteNotification(id);
            }, 6000);
        }
    },

    createNotification(message, tag, id) {
        const notification = document.createElement("div");
        const img = document.createElement("img");
        const notificationContent = document.createElement("div");
        const h4 = document.createElement("h4");
        const p = document.createElement("p");

        notification.id = `notification-${id}`;
        notification.classList.add("notification");
        notificationContent.classList.add("notification__content");
        h4.classList.add("notification__content--title");
        p.classList.add("notification__content--paragraph");

        const color = tag === "success" ? "#2bde3f" : "#fd3f3f";
        const title = tag === "success" ? "Succès" : "Erreur";
        const src =
            tag === "success"
                ? "../../../public/img/check.svg"
                : "../../../public/img/error.svg";

        notification.style.borderColor = color;
        img.src = src;
        img.style.backgroundColor = color;
        h4.textContent = title;
        p.textContent = message;

        notification.appendChild(img);
        notificationContent.appendChild(h4);
        notificationContent.appendChild(p);
        notification.appendChild(notificationContent);
        notificationContainer.appendChild(notification);
    },

    deleteNotification(id) {
        const child = document.querySelector(`#notification-${id}`);

        notificationContainer.removeChild(child);
    },
};

export const { notification } = notificationObj;
