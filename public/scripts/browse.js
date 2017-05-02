(function() {
  // set up map config - get mapbox token and location
  var mapBoxToken = document.getElementById('myMap').dataset.token;

  // if no geolocation, set default location to London, UK
  if (!navigator.geolocation) {
    setUpMap(51.5285582, -0.2417011);
  } else {
    navigator.geolocation.getCurrentPosition(function(position) {
      setUpMap(position.coords.latitude, position.coords.longitude);
    });
  }

  // instantiate map
  function setUpMap(lat, lon) {
    var myMap = L.map('myMap').setView([lat, lon], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
    {
      attribution: null,
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: mapBoxToken
    }).addTo(myMap);
  }
})();
