// Toutes les API Node.js sont disponibles dans le processus de préchargement.
// Il a la même sandbox qu'une extension Chrome.
window.addEventListener("DOMContentLoaded", () => {
    const h1 = document.querySelector("h1");

    h1.textContent = "wow";
});
