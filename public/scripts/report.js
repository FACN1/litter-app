(function() {

  var searchLocationButton = document.getElementById('searchLocation');
  // add listener to get location button
  var useLocationButton = document.getElementById('getLocation');
  useLocationButton.addEventListener('click', getLocation);

  // find user's location
  function getLocation() {
    useLocationButton.innerHTML = 'Getting your location...';
    useLocationButton.classList.add('getting-location');

    if (navigator.geolocation) {
      // store user's current location in the browser
      navigator.geolocation.getCurrentPosition(storeCurrentLocation, function(err) {
        console.log('error:', err);

        useLocationButton.innerHTML = 'Error Getting Location';
        useLocationButton.classList.remove('getting-location');
        useLocationButton.classList.add('error-getting-location');
      });
    } else {
      // non-support error handling
      console.log('Geolocation is not supported by this browser.');
    }
  };

  // store user's location in button attribute
  function storeCurrentLocation(position) {
    var coords = position.coords.latitude + ',' + position.coords.longitude;

    document.getElementById('location').setAttribute('value', coords);
    useLocationButton.innerHTML = 'Using current location';
    useLocationButton.classList.remove('getting-location');
    useLocationButton.classList.add('using-location');
    searchLocationButton.innerHTML = 'Search Location';
    searchLocationButton.classList.remove('using-location');

  };

  // SELECT LOCATION:
  // close map view onclick
  document.getElementById('closeButton').addEventListener('click', closeMapView);

  function closeMapView(event) {
    return document.getElementById('selectView').classList.remove('expanded');
  };

  // expand map view for location selection
  searchLocationButton.addEventListener('click', expandSearchView);

  function expandSearchView() {
    document.getElementById('selectView').classList.add('expanded');
  }

  // onclick: pass lat long coords back to locationButton value
  document.getElementById('selectedLocation').addEventListener('click', storeChosenCoords);

  function storeChosenCoords(e) {
    document.getElementById('selectView').classList.remove('expanded');
    document.getElementById('location').setAttribute('value', e.target.value);
    useLocationButton.innerHTML = 'Use Current Location';
    useLocationButton.classList.remove('using-location');

    searchLocationButton.innerHTML = 'Location Selected';
    searchLocationButton.classList.add('using-location');
  }

  // add listener to report form
  var reportForm = document.getElementById('reportForm');
  reportForm.addEventListener('submit', submitHandler);

  function submitHandler(event) {
    event.preventDefault();
    // validate form data here
    extractFormData(event);
  }

  // create report data object and post to server
  function extractFormData(event) {
    var form = event.target.elements;
    console.log(form);
    var reportData = {};

    // add main info to reportData
    reportData.imageUrl = form.avatarUrl.value;
    reportData.location = form.location.value;
    reportData.description = form.description.value;
    reportData.size = form.size.value;

    // add tags to reportData
    var typesList = Array.from(form.type.elements);

    reportData.type_tags = typesList
      .filter(function(typeBox) {
        if (typeBox.checked) return typeBox.value;
      })
      .map(function(typeBox) {
        return typeBox.value;
      });

    // post reportData to server
    indexModule.makeRequest('/post-report', 'POST', JSON.stringify(reportData), function(err, res) {
      if (err) console.log(err);

      // extract url from response
      var url = '/posts?id=' + res;

      // redirect user to new post URL
      location.href = url;
    });

  }




})();
