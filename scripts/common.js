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

export const convertDateToString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export const convertDateStringToDisplay = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString("default", { month: "long" });
    let subscript;
    switch (day){
        case 1: 
            subscript = 'st';
            break;
        case 2: 
            subscript = 'nd';
            break;
        case 3: 
            subscript = 'rd';
            break;
        case 21: 
            subscript = 'st';
            break;
        case 22: 
            subscript = 'nd';
            break;
        case 23: 
            subscript = 'rd';
            break;
        case 31: 
            subscript = 'st';
            break;
        default:
            subscript = 'th';
            break;
    }

    return `${day}${subscript} of ${month}`;
}

window.addEventListener("scroll", function () {
        const body = document.body;
        if (window.scrollY > 50) {
            body.classList.add("scrolled");
        } else {
            body.classList.remove("scrolled");
        }
    });