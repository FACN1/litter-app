(function() {
  var mapDiv = document.getElementById('myMap');

  // set up map config - get mapbox token and location
  var mapBoxToken = mapDiv.dataset.token;

  // if no navigator on user's browser, default to London UK
  if (!navigator.geolocation) {
    setUpMap(51.5285582, -0.2417011);
  }
  // else if present, get user's position from the browser
  else {
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

    addMarkers(myMap);
  }

  // add markers to map
  function addMarkers(myMap) {
    // add 3 dummy markers for now
    L.marker([32.701509, 35.310147], {id: 34812}).addTo(myMap).on('click', logID);
    L.marker([32.693757, 35.299489], {id: 12493}).addTo(myMap).on('click', logID);
    L.marker([32.705186, 35.296820], {id: 85434}).addTo(myMap).on('click', logID);

    // log their alt text when clicked
    function logID(event) {
      console.log(event.target.options.id);
    }
  }
})();
