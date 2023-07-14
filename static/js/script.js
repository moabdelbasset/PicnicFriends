//Leaflet map that renders the users location


var map = L.map('map', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
})

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

map.locate({ setView: true, maxZoom: 12 });

function customMarker(lat, lng) {
    
    console.log(lat, lng);
    const myElement = document.getElementById('event-icon-nr1');
    myElement.style['background-image'] = myElement.dataset.image;
    const myIcon = L.divIcon({ html: myElement, className: 'event-icon' });


	L.marker([lat, lng], { icon: myIcon }).addTo(map);
}

function onLocationFound(e) {
    const radius = e.accuracy;
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;

    customMarker(lat, lng);
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);