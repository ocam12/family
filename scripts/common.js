export const addEvent = (item, action, func, params = []) => {      //shortcut for adding events to elements
    item.addEventListener(action, () => {
        func(...params);
    });
}