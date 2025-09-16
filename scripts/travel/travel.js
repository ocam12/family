import { getUserProfile } from "../account/auth.js";
import { getCurrentUser } from "../account/firebaseAuth.js";
import { createPin, loadPins } from "./pins.js";

const initialiseTravel = async () => {
    const user = await getCurrentUser();
    if (!user){return;}

    const userName = (await getUserProfile(user.uid)).userName;
    const map = L.map('map').setView([20, 0], 2); //create centered world map

    //Add base tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    await loadPins(map);

    //add on click event that places marker
    map.on('click', function (e) {
        const { lat, lng } = e.latlng;
        createPin(map, lat, lng, userName);
    });
}

initialiseTravel();