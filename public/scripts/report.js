(function() {
  // location buttons
  var searchLocationButton = document.getElementById('searchLocation');
  var useLocationButton = document.getElementById('getLocation');
  useLocationButton.addEventListener('click', getLocation);

  // find user's location
  function getLocation() {
    useLocationButton.innerHTML = 'Getting your location...';
    useLocationButton.classList.add('pending');

    if (navigator.geolocation) {
      // store user's current location in the browser
      navigator.geolocation.getCurrentPosition(storeCurrentLocation, function(err) {
        console.log('error:', err);

        useLocationButton.innerHTML = 'Error Getting Location';
        useLocationButton.classList.remove('pending');
        useLocationButton.classList.add('error-pending');
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
    useLocationButton.classList.remove('pending');
    useLocationButton.classList.add('success');

    searchLocationButton.innerHTML = 'Search Location';
    searchLocationButton.classList.remove('success');
  };

  // SELECT LOCATION

  // close map view onclick
  document.getElementById('closeButton').addEventListener('click', closeMapView);

  function closeMapView(event) {
    return document.getElementById('selectView').classList.remove('expanded');
  };

  // expand map view for location selection
  searchLocationButton.addEventListener('click', expandSearchView);

  function expandSearchView() {
    document.getElementById('selectView').classList.add('expanded');
  };

  // onclick: pass lat long coords back to locationButton value
  document.getElementById('selectedLocation').addEventListener('click', storeChosenCoords);

  function storeChosenCoords(e) {
    document.getElementById('selectView').classList.remove('expanded');
    document.getElementById('location').setAttribute('value', e.target.value);

    useLocationButton.innerHTML = 'Use Current Location';
    useLocationButton.classList.remove('success');

    searchLocationButton.innerHTML = 'Location Selected';
    searchLocationButton.classList.add('success');
  };

  // add listener to report form
  var reportForm = document.getElementById('reportForm');
  reportForm.addEventListener('submit', submitHandler);

  function submitHandler(event) {
    event.preventDefault();

    if (validateWholeForm(event.target.elements)) {
      extractFormData(event);
    }
  }

  // validate functions
  var validate = {
    // validate image url - if present, must start with a certain string
    imageUrl: function(value) {
      if (value) {
        if (!/https:\/\/tipofftest.s3.amazonaws.com\//g.test(value)) {
          document.getElementById('imageInputLabel').classList.add('danger');
          return false;
        }
        document.getElementById('imageInputLabel').classList.remove('danger');
        return true;
      }
      document.getElementById('imageInputLabel').classList.remove('danger');
      return true;
    },

    // validate location - only numbers, commas, periods and not empty
    location: function(value) {
      if (!/^[0-9,\.]+$/g.test(value)) {
        document.getElementById('provideLocation').classList.add('danger');
        return false;
      }
      document.getElementById('provideLocation').classList.remove('danger');
      return true;
    },

    // validate description - can't be empty
    description: function(value) {
      if (!value.trim()) {
        document.getElementById('description').classList.add('danger');
        return false;
      }
      document.getElementById('description').classList.remove('danger');
      return true;
    },

    // validate size input - can't be null
    size: function(value) {
      if (!value.trim()) {
        document.getElementById('size').classList.add('danger');
        return false;
      }
      document.getElementById('size').classList.remove('danger');
      return true;
    },

    // validate type - at least one must be checked
    type: function(elements) {
      var typeArray = Array.from(elements);
      var checked = typeArray.filter(function(field) {
        return field.checked;
      });
      if (!checked.length > 0) {
        document.getElementById('type').classList.add('danger');
        return false;
      }
      document.getElementById('type').classList.remove('danger');
      return true;
    }
  }

  // validate form data before posting to server
  function validateWholeForm(data) {
    var pass = true;

    // check each form input
    if (!validate.imageUrl(data.avatarUrl.value)) pass = false;
    if (!validate.location(data.location.value)) pass = false;
    if (!validate.description(data.description.value)) pass = false;
    if (!validate.size(data.size.value)) pass = false;
    if (!validate.type(data.type.elements)) pass = false;

    return pass;
  }

  // add event listeners to form inputs to check for validation completion
  var form = document.getElementById('reportForm');
  var imageLabel = document.getElementById('imageInputLabel');
  var locationDiv = document.getElementById('provideLocation');

  imageLabel.addEventListener('click', function() {
    imageLabel.classList.remove('danger');
  });

  locationDiv.addEventListener('click', function() {
    locationDiv.classList.remove('danger');
  });

  form.description.addEventListener('input', function() {
    validate.description(form.description.value);
  });

  form.size.addEventListener('input', function() {
    validate.size(form.size.value);
  });

  form.type.addEventListener('click', function() {
    validate.type(form.type.elements);
  });

  // create report data object and post to server
  function extractFormData(event) {
    var form = event.target.elements;
    var reportData = {};

    // add main info to reportData
    reportData.imageUrl = form.avatarUrl.value;
    reportData.location = form.getLocation.value;
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
