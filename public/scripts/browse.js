(function() {
  // set up map config (location and mapbox token)
  function setUpMap() {
    var mapDiv = document.getElementById('myMap');
    var mapBoxToken = mapDiv.dataset.token;

    // if no navigator on user's browser, default to London UK
    if (!navigator.geolocation) {
      createMap(mapBoxToken, 51.5285582, -0.2417011);
    }
    // else if present, get user's position from the browser
    else {
      navigator.geolocation.getCurrentPosition(function(position) {
        createMap(mapBoxToken, position.coords.latitude, position.coords.longitude);
      });
    }
  }

  // instantiate map
  function createMap(token, lat, lon) {
    // create new map
    var myMap = L.map('myMap').setView([lat, lon], 13);

    // move zoom buttons to bottom left of screen
    myMap.zoomControl.setPosition('bottomleft');

    // add tiles from mapbox
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: null,
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: token
    }).addTo(myMap);

    addSearchBar(myMap);

    addMarkers(myMap);
  }

  // add Leaflet Geosearch plugin to map
  function addSearchBar(myMap) {
    var GeoSearchControl = window.GeoSearch.GeoSearchControl;
    var OpenStreetMapProvider = window.GeoSearch.OpenStreetMapProvider;

    var provider = new OpenStreetMapProvider();

    var searchControl = new GeoSearchControl({
      provider: provider,
      autoClose: true,
      showMarker: false
    });

    myMap.addControl(searchControl);
  }

  // add markers to map
  function addMarkers(myMap) {
    // make XHR request for markers
    IndexModule.makeRequest('/get-markers', 'GET', null, function(err, res) {
      console.log(res);
    });

    // add 3 dummy markers for now
    // L.marker([32.701509, 35.310147], {id: 34812}).addTo(myMap).on('click', logID);
    // L.marker([32.693757, 35.299489], {id: 12493}).addTo(myMap).on('click', logID);
    // L.marker([32.705186, 35.296820], {id: 85434}).addTo(myMap).on('click', logID);

    // log their alt text when clicked
    function logID(event) {
      console.log(event.target.options.id);
    }
  }

  // call functions
  setUpMap();
})();
