var locationButton = document.getElementById('getLocationButton');

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    console.log(
    "Latitude: " + position.coords.latitude +
    "Longitude: " + position.coords.longitude
  )
}

locationButton.addEventListener('click', getLocation)
