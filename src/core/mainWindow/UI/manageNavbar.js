const path = require("path");

const header = document.querySelector("#header-load");
const btnExpandNavbar = document.querySelector("#expand-navbar");
const imgExpandNavbar = document.querySelector("#expand-navbar img");
const h1 = document.querySelector(".header__logo h1");
const btns = document.querySelectorAll(".header__nav button");
const paragraphs = document.querySelectorAll(".header__nav span");

const manageNavbarObj = {
    navbarExpanded: false,

    init() {
        btnExpandNavbar.addEventListener("click", this.expandNavbar.bind(this));
        // header.addEventListener("mouseenter", this.expandNavbar.bind(this));
        // header.addEventListener("mouseleave", this.resetStyle.bind(this));

        window.addEventListener("resize", () => {
            if (window.matchMedia("(max-width: 700px)").matches)
                this.resetStyle();
        });
    },

    expandNavbar() {
        if (this.navbarExpanded) return this.resetStyle();

        setTimeout(() => {
            h1.style.display = "initial";
        }, 250);

        imgExpandNavbar.src = path.join(
            __dirname,
            "../../../public/img/chevron-left.svg"
        );

        paragraphs.forEach((paragraph) => {
            paragraph.style.display = "initial";
        });

        btns.forEach((btn) => {
            btn.style.justifyContent = "start";
        });

        header.classList.add("navbar-anim");
        header.classList.remove("navbar-anim2");

        this.navbarExpanded = true;
    },

    resetStyle() {
        h1.style.display = "";
        imgExpandNavbar.src = path.join(
            __dirname,
            "../../../public/img/chevron-right.svg"
        );

        paragraphs.forEach((paragraph) => {
            paragraph.style.display = "";
        });

        btns.forEach((btn) => {
            btn.style.justifyContent = "";
        });

        header.classList.remove("navbar-anim");
        header.classList.add("navbar-anim2");

        this.navbarExpanded = false;
    },
};

export default manageNavbarObj;
