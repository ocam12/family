import { doc, getDocs, addDoc, deleteDoc, serverTimestamp, collection } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";
import { db } from "../account/firebaseConfig.js";

const redIcon = L.icon({
    iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
    iconSize: [32, 32], // size of the icon
    iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -32] // point from which the popup should open relative to the iconAnchor
});

export const createPin = async (map, lat, lng, userName, pinId = null) => {
    const marker = L.marker([lat, lng], { icon: redIcon }).addTo(map);

    marker.bindPopup(`Visited by ${userName} <br>
    <button id="deletePin-${lat}-${lng}">Delete</button>
    `).openPopup();

    if (!pinId){    
        // Save to database here
        const docRef = await savePin(lat, lng, userName);
        pinId = docRef.id
    }

    //Add event listener to delete markers
    marker.on('popupopen', () => {
        document.getElementById(`deletePin-${lat}-${lng}`).addEventListener('click', async () => {
            await deletePin(pinId);
            map.removeLayer(marker);
        });
    });
}

export const savePin = async (lat, lng, userName) => {
    try{
        const docRef = await addDoc(collection(db, "travelPins"), {
            lat,
            lng,
            createdAt: serverTimestamp(),
            createdBy: userName
        });

        return docRef;
    } catch (err){

    }
}

export const loadPins = async (map) => {
    try {
        const pinsSnapshot = await getDocs(collection(db, "travelPins"));
        for (const pin of pinsSnapshot.docs) {
            const { lat, lng, createdBy } = pin.data();
            await createPin(map, lat, lng, createdBy, pin.id); // wait for each
        }
    } catch (err) {
        console.log(err);
    }
}

export const deletePin = async (pinId) => {
    try{
        await deleteDoc(doc(db, "travelPins", pinId));
        console.log('Pin deleted');
    } catch (err){
        console.log(err);
    }
}