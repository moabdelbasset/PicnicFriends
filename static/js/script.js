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

// Create a custom control for the title
const titleControl = L.control({ position: 'topright' });

// Create title as a 'control' on the map
// Otherwise it's impossible to put a title on top of the map!
titleControl.onAdd = function(map) {
  const container = L.DomUtil.create('div', 'app-title');
  container.innerHTML = '<h1 class="app-title">Picnic Friends</h1>';
  return container;
};

titleControl.addTo(map);

// const events = document.getElementById('events');

// Dummy events
const events = [
    { 
        id: 1,
        time: "10:00 AM",
        date: "Saturday, 22nd July",
        title: "Beach Party",
        img: "url('./static/images/toa-heftiba.jpg')",
        lat: "53.2",
        lng: "-6.1"
    },
    { 
        id: 2,
        time: "3:00 PM",
        date: "Saturday, 22nd July",
        title: "Picnic on the Heath",
        img: "url('./static/images/taisiia-shestopal.jpg')",
        lat: "53.22",
        lng: "-6.15"
    },
    { 
        id: 3,
        time: "11:00 AM",
        date: "Sunday, 23rd July",
        title: "Sunday Brunch",
        img: "url('./static/images/calvin-shelwell.jpg')",
        lat: "53.27",
        lng: "-6.17"
    }
    
]


const getUserLocation = (callback) => {
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
                console.log(location)
                map.flyTo([location.lat, location.lng], 12)
                map.setMaxZoom(18);
                map.setMinZoom(5);

                callback([location.lat, location.lng]);

            },
            function (error) {
                // render dummy events around Dublin
                map.flyTo([location.lat, location.lng], 12)
                map.setMaxZoom(18);
                map.setMinZoom(5);

                callback([location.lat, location.lng]);

            })
    } 
    else {
        // render dummy events around Dublin
        map.flyTo([location.lat, location.lng], 12)
        map.setMaxZoom(18);
        map.setMinZoom(5);

        callback([location.lat, location.lng]);
    }
}

function customMarker(event) {
    
    const {time, date, title, img, lat, lng} = event;

    const myElement = document.createElement('div');
    myElement.className = 'event-icon'
    myElement.style['background-image'] = img;

    const eventTime = document.createElement('div');
    eventTime.className = 'event-time';
    myElement.appendChild(eventTime);
    eventTime.textContent = time;

    const eventDate = document.createElement('div');
    eventDate.className = 'event-date';
    myElement.appendChild(eventDate);
    eventDate.textContent = date;

    const eventTitle = document.createElement('div');
    eventTitle.className = 'event-title';
    myElement.appendChild(eventTitle);
    eventTitle.textContent = title;

    const myIcon = L.divIcon({ html: myElement, className: 'event-icon' });

	L.marker([lat, lng], { icon: myIcon }).addTo(map);
}

function findDistance(loc1, loc2) {
    const [x1, y1] = loc1;
    const [x2, y2] = loc2;
    const distance = Math.sqrt((x2 - x1) ** 2 + (y1 - y2) ** 2);
    return distance
}

function eventDistances(loc1, events) {
    distances = {};
    for (const e of events) {
        const loc2 = [e.lat, e.lng]
        const dist = findDistance(loc1, loc2)
        distances[dist] = e.id 
    }
    console.log(distances)
    return distances
}

function findClosestEvent(location) {
    const distances = eventDistances(location, events);
    console.log(Object.keys(distances))

    // render the closest 3 events on the map and delete them from the array
    for (let i = 0; i < 3; i++ ) {

        const minDistance = Math.min(...Object.keys(distances))
        console.log(minDistance)

        const closestEventId = distances[minDistance]

        const closestEvent = events.find(e => e.id === closestEventId)
        customMarker(closestEvent)
        
        // delete the found element from the events array
        delete distances[minDistance]
        console.log(distances)
    }
    
}

getUserLocation(findClosestEvent);

