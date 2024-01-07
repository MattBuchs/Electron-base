const tabs = document.querySelectorAll(".tabs");
const content = document.querySelectorAll(".content");

const manageTabsObj = {
    index: 0,

    init() {
        tabs.forEach((tab) => {
            tab.addEventListener("click", () => {
                if (tab.classList.contains("active")) {
                    return;
                } else {
                    tab.classList.add("active");
                }

                this.index = tab.getAttribute("data-onglet");

                for (let i = 0; i < tabs.length; i++) {
                    if (tabs[i].getAttribute("data-onglet") !== this.index) {
                        tabs[i].classList.remove("active");
                    }
                }

                for (let j = 0; j < content.length; j++) {
                    if (content[j].getAttribute("data-onglet") === this.index) {
                        content[j].classList.add("activeContent");
                    } else {
                        content[j].classList.remove("activeContent");
                    }
                }
            });
        });
    },
};

export default manageTabsObj;
