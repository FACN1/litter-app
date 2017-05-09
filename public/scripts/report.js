(function() {
  // add listener to get location button
  var locationButton = document.getElementById('location');
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

    if (validateFormData(event.target.elements)) {
      extractFormData(event);
    }
  }

  // validate form data before posting to server
  function validateFormData(data) {
    var pass = true;

    // check location
    if (!data.location.value.trim()) {
      document.getElementById('location').classList.add('danger');
      pass = false;
    }

    // check description
    if (!data.description.value.trim()) {
      document.getElementById('description').classList.add('danger');
      pass = false;
    }

    // check size
    if (!data.size.value.trim()) {
      document.getElementById('size').classList.add('danger');
      pass = false;
    }

    // check type
    var typeArray = Array.from(data.type.elements);
    var checked = typeArray.filter(function(field) {
      return field.checked;
    });

    if (!checked.length > 0) {
      document.getElementById('type').classList.add('danger');
      pass = false;
    }

    return pass;
  }

  // add event listeners to form inputs - checking for validation completion
  var formInputs = document.getElementsByClassName('listen');
  Array.from(formInputs).forEach(function(input) {
    if (input.id === 'description' || input.id === 'size') {
      input.addEventListener('input', function(e) {
        removeWarning(e.target);
      });
    } else {
      input.addEventListener('click', function(e) {
        if (e.target.type === 'checkbox') {
          removeWarning(document.getElementById('type'));
        } else {
          removeWarning(e.target);
        }
      });
    }

    function removeWarning(target) {
      if (target.classList.contains('danger')) {
        target.classList.remove('danger');
      }
    }
  });

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
    });
  }
})();
