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
}