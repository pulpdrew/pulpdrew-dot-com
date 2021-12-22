const center = [
    +document.getElementById('map').getAttribute('data-lat'),
    +document.getElementById('map').getAttribute('data-lon'),
]

var map = L.map('map', {
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
    const title = item.getAttribute("data-title");

    console.log(item)

    var marker = L.marker([lat, lon], {
        title,
        riseOnHover: true,
    }).bindPopup(item.querySelector(".popup-content").innerHTML).addTo(map);
}