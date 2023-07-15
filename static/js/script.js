//Leaflet map that renders the users location


var map = L.map('map', {
    center: [53.251042, -6.150902],
    zoom: 9,
    minZoom: 9,
    maxZoom: 9,
    attribution: '© OpenStreetMap',
    preferCanvas: true
})

L.tileLayer(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'},
).addTo(map);


const getUserLocation = () => {
    let location = {};
    location.lat = 53.251042
        location.lng = -6.150902
    // if ('geolocation' in navigator) {
        
    //     // Geolocation is supported
    //     navigator.geolocation.getCurrentPosition(
    //         function (position) {
    //             location.lat = position.coords.latitude;
    //             location.lng = position.coords.longitude;
    //             console.log(location)
    //             // map.panTo([location.lat, location.lng])
                map.flyTo([location.lat, location.lng], 12)
                map.setMaxZoom(18);
                map.setMinZoom(5);

                for (let i = 1; i <= 3; i++) {
                    const id = `event-icon-nr${i}`
                    customMarker(id);
                }
    //         },
    //         // if no location is provided, set the location to Dublin
    //         // close to Code Institute's office
    //         function (error) {
    //             location.lat = 53.251042
                // location.lng = -6.150902
    //         }
    //     );

    // } else {
    //     // if Geolocation is not supported set the location to Dublin
    //     // close to Code Institute's office
        location.lat = 53.251042
        location.lng = -6.150902
    // }
    return location;
}


function customMarker(id) {
    
    const myElement = document.getElementById(id);
    myElement.style['background-image'] = myElement.dataset.image;
    const lat = myElement.dataset.lat;
    const lng = myElement.dataset.lng;
    const myIcon = L.divIcon({ html: myElement, className: 'event-icon' });

	L.marker([lat, lng], { icon: myIcon }).addTo(map);
}

getUserLocation();