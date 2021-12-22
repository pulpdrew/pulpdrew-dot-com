
function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), ms);
    });
}

const center = [
    +document.getElementById('map').getAttribute('data-lat'),
    +document.getElementById('map').getAttribute('data-lon'),
]

const map = L.map('map', {
    center
}).setView(center, 12);

L.tileLayer('https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=304145acc2694f428bc85ced82c8a129', {
    attribution: 'Maps © <a href="http://www.thunderforest.com">Thunderforest</a>, Data © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
    center
}).addTo(map);

for (item of document.getElementsByClassName("map-item")) {
    const lat = item.getAttribute("data-lat");
    const lon = item.getAttribute("data-lon");
    
    const marker = L.circleMarker([lat, lon], {
        stroke: true,
        color: "#FFFFFF",
        weight: 2,
        radius: 7,
        fill: true,
        fillColor: '#1E40AF',
        fillOpacity: 1
    });

    const popupHTML = item.querySelector(".popup-content").innerHTML;
    marker.bindPopup(popupHTML);

    link = item.querySelector(".map-link");
    link.addEventListener('click', async () => {
        map.closePopup();
        await delay(250);
        map.flyTo(marker.getLatLng(), 15, { duration: .25 });
        await delay(250);
        marker.openPopup();
    });

    marker.addTo(map);
}