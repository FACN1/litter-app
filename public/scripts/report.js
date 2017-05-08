(function() {
  // add listener to get location button
  var locationButton = document.getElementById('getLocationButton');
  locationButton.addEventListener('click', getLocation);

  // get user's location
  function getLocation() {
    locationButton.innerHTML = 'Getting your location...';
    locationButton.classList.add('getting-location');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(storePosition, function(err) {
        console.log('error:', err);

        locationButton.innerHTML = 'Error Getting Location';
        locationButton.classList.remove('getting-location');
        locationButton.classList.add('error-getting-location');
      });
    } else {
      // non-support error handling
      console.log('Geolocation is not supported by this browser.');
    }
  };

  // store user's location in button attribute
  function storePosition(position) {
    var coords = position.coords.latitude + ',' + position.coords.longitude;

    locationButton.setAttribute('value', coords);
    locationButton.innerHTML = 'Using current location';
    locationButton.classList.remove('getting-location');
    locationButton.classList.add('using-location');
  };

  // add listener to report form
  var reportForm = document.getElementById('reportForm');
  reportForm.addEventListener('submit', submitHandler);

  function submitHandler(event){
    event.preventDefault();
    // validate form data here
    extractFormData(event);
  }

  // create report data object and post to server
  function extractFormData(event) {
    var form = event.target.elements;
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
      var data = JSON.parse(res);
      var url = '/posts?id='+data.post_id;

      // redirect user to new post URL
      location.href=url;
    });
  }
})();
