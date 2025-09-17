import { doc, getDocs, addDoc, deleteDoc, serverTimestamp, collection } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";
import { db } from "../account/firebaseConfig.js";

export const createPin = async (map, lat, lng, userName, pinColour, city, country, pinId = null) => {
    const marker = L.marker([lat, lng], { icon: getPinOfColour(pinColour) }).addTo(map);

    if (!pinId){    
        // Save to database here
        const location = await getCityName(lat, lng);
        const locationText = (location.city !== '') ? `${location.city}, ${location.country}` : `${location.country}`;
        const docRef = await savePin(lat, lng, location.city, location.country, userName, pinColour);
        pinId = docRef.id
        marker.bindPopup(`<h3>${locationText}</h1><br>
            Visited by ${userName} <br>
            <button id = "del-${lat}-${lng}" class = "delete-pin">Delete</button>
        `).openPopup();
    }
    else{
        const locationText = (city !== '') ? `${city}, ${country}` : `${country}`;
        marker.bindPopup(`<h3>${locationText}</h1><br>
            Visited by ${userName} <br>
            <button id = "del-${lat}-${lng}" class = "delete-pin">Delete</button>
        `);
    }

    //Add event listener to delete markers
    marker.on('popupopen', () => {
        document.getElementById(`del-${lat}-${lng}`).addEventListener('click', async () => {
            await deletePin(pinId);
            map.removeLayer(marker);
        });
    });
}

export const savePin = async (lat, lng, city = '', country, userName, pinColour) => {
    try{
        const docRef = await addDoc(collection(db, "travelPins"), {
            lat,
            lng,
            city,
            country,
            createdAt: serverTimestamp(),
            createdBy: userName,
            pinColour,
        });

        return docRef;
    } catch (err){
        console.log(err);
    }
}

export const loadPins = async (map) => {
    try {
        const pinsSnapshot = await getDocs(collection(db, "travelPins"));
        for (const pin of pinsSnapshot.docs) {
            const { lat, lng, city, country, createdBy, pinColour } = pin.data();
            await createPin(map, lat, lng, createdBy, pinColour, city, country, pin.id); // wait for each
        }
    } catch (err) {
        console.log(err);
    }
}

export const deletePin = async (pinId) => {
    try{
        await deleteDoc(doc(db, "travelPins", pinId));
    } catch (err){
        console.log(err);
    }
}

const getPinOfColour = (pinColour) => {
    return L.icon({
            iconUrl: `https://maps.google.com/mapfiles/ms/icons/${pinColour}-dot.png`,
            iconSize: [24, 24], // size of the icon
            iconAnchor: [12, 24], // point of the icon which will correspond to marker's location
            popupAnchor: [0, -24] // point from which the popup should open relative to the iconAnchor
    });
}

const getCityName = async (lat, lng) => {   //function that gets the nearest city from latitude/lingitude values using nominatim openstreetmap
    const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    const location = await response.json();
    return {
        city: location.address.city || location.address.town || location.address.village || location.hamlet || location.county || '',
        country: location.address.country
    };
}