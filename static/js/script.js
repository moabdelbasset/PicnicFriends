//Leaflet map that renders the users location


var map = L.map('map', {
    center: [53.251042, -6.150902],
    zoom: 9,
    maxZoom: 9,
    attribution: '© OpenStreetMap',
    preferCanvas: true,
})

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);


const getUserLocation = () => {
    console.log('getUserLocation')
    let location = {};
    if ('geolocation' in navigator) {
        
        // Geolocation is supported
        navigator.geolocation.getCurrentPosition(
            function (position) {
                location.lat = position.coords.latitude;
                location.lng = position.coords.longitude;
                console.log(location)
                map.flyTo([location.lat, location.lng], 15)
                customMarker(location.lat, location.lng);
            },
            // if no location is provided, set the location to Dublin
            // close to Code Institute's office
            function (error) {
                location = {lat: 53.251042, lng: -6.150902}
            }
        );

    } else {
        // if Geolocation is not supported set the location to Dublin
        // close to Code Institute's office
        location = {lat: 53.251042, lng: -6.150902}
    }
    return location;
}


function customMarker(lat, lng) {
    
    console.log(lat, lng);
    const myElement = document.getElementById('event-icon-nr1');
    myElement.style['background-image'] = myElement.dataset.image;
    const myIcon = L.divIcon({ html: myElement, className: 'event-icon' });


	L.marker([lat, lng], { icon: myIcon }).addTo(map);
}

getUserLocation();