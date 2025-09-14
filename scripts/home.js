import { addEvent } from "./common.js";
import { authState } from "./firebaseAuth.js";

const initialiseHomePage = () => {
    window.addEventListener("scroll", function () {
        const body = document.body;
        if (window.scrollY > 50) {
            body.classList.add("scrolled");
        } else {
            body.classList.remove("scrolled");
        }
    });

    addCheckToLockedLinks();
}

const addCheckToLockedLinks = () => {
    const links = document.querySelectorAll('.locked-link');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            if (!authState.currentUser && link.id !== 'accountNavLink') {
                e.preventDefault();         //prevent any default action - here stops the href
                alert("We can't let you in until you log in first!");
                window.location.href = './account.html'; //redirects to account page
            }
        });
    });
};

initialiseHomePage();