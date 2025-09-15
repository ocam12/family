import { getAllUserProfiles, getUserProfile } from "./auth.js";
import { convertDateStringToDisplay, convertDateToString } from "./common.js";
import { getCurrentUser } from "./firebaseAuth.js"

export const initialiseCountdown = async () => {
    const user = await getCurrentUser();
    if (!user){return;}

    const usersBdays = await findNearestBirthday();
    setCountdown(usersBdays);
}

const findNearestBirthday = async () => {
    const allUsersData = await getAllUserProfiles();

    const todaysDate = new Date();
    const usersUpcomingBdays = allUsersData.map(u => {
        const [year, month, day] = u.birthday.split('-').map(Number);

        let nextBday = new Date(todaysDate.getFullYear(), month - 1, day);
        if (nextBday < todaysDate){
            nextBday.setFullYear(todaysDate.getFullYear() + 1);
        }
        return {
            userName: u.userName,
            birthday: convertDateToString(nextBday)
        }
    });

    const nearest = usersUpcomingBdays.reduce((prev, curr) => {
        return curr.birthday < prev.birthday ? curr : prev;
    });
    
    return nearest;
}


const setCountdown = (usersBdays) => {
    const nextBday = document.getElementById('nextBday');
    nextBday.innerText = `${usersBdays.userName} on the ${convertDateStringToDisplay(usersBdays.birthday)}!`;

    const targetDate = new Date(usersBdays.birthday); // your next birthday Date object

    function updateCountdown() {
        const now = new Date();
        let diff = targetDate - now;

        if (diff <= 0) {
            clearInterval(timer);
            document.getElementById("countdown").innerText = "00:00:00";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        diff -= days * 1000 * 60 * 60 * 24;

        const hours = Math.floor(diff / (1000 * 60 * 60));
        diff -= hours * (1000 * 60 * 60);

        const minutes = Math.floor(diff / (1000 * 60));
        diff -= minutes * (1000 * 60);

        const seconds = Math.floor(diff / 1000);

        //format with leading zeros
        const formatted =
            String(days).padStart(2, "0") + ":" +
            String(hours).padStart(2, "0") + ":" +
            String(minutes).padStart(2, "0") + ":" +
            String(seconds).padStart(2, "0");

        document.getElementById("countdown").innerText = formatted;
    }

    updateCountdown(); // run once immediately
    const timer = setInterval(updateCountdown, 1000);
}