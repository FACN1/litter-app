(function() {
  // add listener to get location button
  var locationButton = document.getElementById('getLocation');
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
        document.getElementById('getLocation').classList.add('danger');
        return false;
      }
      document.getElementById('getLocation').classList.remove('danger');
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
    if (!validate.location(data.getLocation.value)) pass = false;
    if (!validate.description(data.description.value)) pass = false;
    if (!validate.size(data.size.value)) pass = false;
    if (!validate.type(data.type.elements)) pass = false;

    return pass;
  }

  // add event listeners to form inputs to check for validation completion
  var form = document.getElementById('reportForm');

  form.imageInputLabel.addEventListener('click', function() {
    form.imageInputLabel.classList.remove('danger');
  });

  form.getLocation.addEventListener('click', function() {
    form.getLocation.classList.remove('danger');
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
    });
  }
})();
