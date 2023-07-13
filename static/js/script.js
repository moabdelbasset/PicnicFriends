//Leaflet map that renders the users location

var map = L.map('map').fitWorld();

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

map.locate({ setView: true, maxZoom: 12 });

function onLocationFound(e) {
    var radius = e.accuracy;
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are here <br>" + "Latitude: " + lat.toFixed(5) + "<br> Longitude: " + lng.toFixed(5))
        .openPopup()
        .on('popupopen', function(e) {
            e.popup.setContent("You are here <br>" + "Latitude: " + lat.toFixed(5) + "<br> Longitude: " + lng.toFixed(5));
        });

    L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);