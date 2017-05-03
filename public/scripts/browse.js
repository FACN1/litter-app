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
      createMarkers(res);
    });

    // create markers with database data
    function createMarkers(markers) {
      markers.map(function(marker) {
        L.marker(
          [marker.latitude, marker.longitude],
          {id: marker.post_id}
        ).addTo(myMap).on('click', logID);
      });
    };

    // log their alt text when clicked
    function logID(event) {
      console.log(event.target.options.id);
    };
  }

  // call functions
  setUpMap();
})();
