//Leaflet map that renders the users location


const map = L.map('map', {
    center: [53.251042, -6.150902],
    zoom: 9,
    minZoom: 9,
    maxZoom: 9,
    attribution: '© OpenStreetMap',
    preferCanvas: true,
    dragging: false,
    scrollWheelZoom: false
})

L.tileLayer(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'},
).addTo(map);

// const events = document.getElementById('events');

const events = [
    { 
        time: "10:00 AM",
        date: "Saturday, 22nd July",
        title: "Beach Party",
        img: "url('./static/images/toa-heftiba.jpg')",
        lat: "53.2",
        lng: "-6.1"
    },
    { 
        time: "3:00 PM",
        date: "Saturday, 22nd July",
        title: "Picnic on the Heath",
        img: "url('./static/images/taisiia-shestopal.jpg')",
        lat: "53.27",
        lng: "-6.15"
    },
    { 
        time: "11:00 AM",
        date: "Sunday, 23rd July",
        title: "Sunday Brunch",
        img: "url('./static/images/calvin-shelwell.jpg')",
        lat: "53.22",
        lng: "-6.15"
    }
    

]


const getUserLocation = () => {
    let location = {};
    // a location in Dublin
    location.lat = 53.251042
    location.lng = -6.150902
    if ('geolocation' in navigator) {
        
        // Geolocation is supported
        navigator.geolocation.getCurrentPosition(
            function (position) {
                location.lat = position.coords.latitude;
                location.lng = position.coords.longitude;
                map.flyTo([location.lat, location.lng], 12)
                map.setMaxZoom(18);
                map.setMinZoom(5);

                for (let i = 1; i <= 3; i++) {
                    const id = `event-icon-nr${i}`
                    customMarker(id);
                }
            },
            function (error) {
                // render dummy events around Dublin
                map.flyTo([location.lat, location.lng], 12)
                map.setMaxZoom(18);
                map.setMinZoom(5);
                for (let i = 1; i <= 3; i++) {
                    const id = `event-icon-nr${i}`
                    customMarker(id);
        }
            })
    } 
    else {
        // render dummy events around Dublin
        map.flyTo([location.lat, location.lng], 12)
        map.setMaxZoom(18);
        map.setMinZoom(5);
        for (let i = 1; i <= 3; i++) {
            const id = `event-icon-nr${i}`
            customMarker(id);
        }
    }
}

function customMarker(time, date, title, img, lat, lng) {
    
    const myElement = document.createElement('div');
    myElement.style['background-image'] = img;

    const time = document.createElement('div');
    time.className = 'event-time';
    myElement.appendChild(time);
    time.textContent = time;

    const date = document.createElement('div');
    date.className = 'event-date';
    myElement.appendChild(date);
    date.textContent = date;

    const title = document.createElement('div');
    title.className = 'event-title';
    myElement.appendChild(title);
    title.textContent = title;

    const myIcon = L.divIcon({ html: myElement, className: 'event-icon' });

	L.marker([lat, lng], { icon: myIcon }).addTo(map);
}

getUserLocation();

