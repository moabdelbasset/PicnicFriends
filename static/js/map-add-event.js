// map.js

let marker; // Declare the marker variable

const map = L.map('map').setView([53.251042, -6.150902], 9);

L.tileLayer(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' },
).addTo(map);

const getUserLocation = (callback) => {
    let location = { lat: 53.251042, lng: -6.150902 };
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                location.lat = position.coords.latitude;
                location.lng = position.coords.longitude;
                map.flyTo([location.lat, location.lng], 12);
                callback([location.lat, location.lng]);
            },
            function (error) {
                map.flyTo([location.lat, location.lng], 12);
                callback([location.lat, location.lng]);
            }
        );
    } else {
        map.flyTo([location.lat, location.lng], 12);
        callback([location.lat, location.lng]);
    }
};

function addMarker(latlng) {
    if (marker) {
        map.removeLayer(marker);
    }
    marker = L.marker(latlng).addTo(map);
    document.getElementById('latitude').value = latlng.lat.toFixed(6);
    document.getElementById('longitude').value = latlng.lng.toFixed(6);
}

// Add click event listener to the map
map.on('click', function (e) {
    addMarker(e.latlng);
});

getUserLocation((location) => {
    addMarker(location);
});
