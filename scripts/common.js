import { authState } from "./firebaseAuth.js";

export const addEvent = (item, action, func, params = []) => {      //shortcut for adding events to elements
    item.addEventListener(action, () => {
        func(...params);
    });
}

export const addCheckToLockedLinks = () => {
    const links = document.querySelectorAll('.locked-link');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            if (!authState.currentUser) {
                alert("We can't let you in until you log in first!");
                e.preventDefault();         //prevent any default action - here stops the href
                if (window.location.pathname !== '/account.html') {
                    window.location.href = './account.html'; //redirects to account page
                }
            }
        });
    });
};