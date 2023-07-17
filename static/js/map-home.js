//Leaflet map that renders the 3 events closest to user's browser location


const map = L.map('map', {
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

const events = JSON.parse(document.getElementById('events_script_json').textContent);


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
    
    const {event_date, name, image, latitude, longitude} = event;

    const dateTime = new Date(event_date);

    // Get date
    const date = dateTime.toLocaleDateString(undefined, { dateStyle: 'medium' });

    // Get time
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    const time = dateTime.toLocaleTimeString(undefined, options);

    const myElement = document.createElement('div');
    myElement.className = 'event-icon'
    myElement.style['background-image'] = `url('${image}')`;

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
    eventTitle.textContent = name;

    const myIcon = L.divIcon({ html: myElement, className: 'event-icon' });

	L.marker([latitude, longitude], { icon: myIcon }).addTo(map);
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
        const loc2 = [e.latitude, e.longitude]
        const dist = findDistance(loc1, loc2)
        distances[dist] = e.id 
    }
    return distances
}

function findClosestEvent(location) {
    const distances = eventDistances(location, events);

    // render the closest 3 events on the map
    for (let i = 0; i < 3; i++ ) {

        const minDistance = Math.min(...Object.keys(distances))

        const closestEventId = distances[minDistance]

        const closestEvent = events.find(e => e.id === closestEventId)
        if (closestEvent) {
            customMarker(closestEvent)
        }
        
        // delete the found element from the distances object
        delete distances[minDistance]
    }
    
}

getUserLocation(findClosestEvent);
