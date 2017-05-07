(function(){

  var locationButton = document.getElementById('getLocationButton');

  locationButton.addEventListener('click', getLocation);

  // GET USER'S LOCATION
  function getLocation() {
    locationButton.innerHTML = 'Getting your location...';
    locationButton.classList.add('getting-location');

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(storePosition, function(err){

        console.log('error :',err);

        locationButton.innerHTML = 'Error Getting Location';

        locationButton.classList.remove('getting-location');
        locationButton.classList.add('error-getting-location');

      });

    } else {
      // non-supprt error handling
      console.log('Geolocation is not supported by this browser.');
    }
  };

  // store user's location in button attribute
  function storePosition(position) {
    var coords = position.coords.latitude+','+position.coords.longitude;

    locationButton.setAttribute('value', coords);

    locationButton.innerHTML = 'Using current location';

    locationButton.classList.remove('getting-location');

    locationButton.classList.add('using-location');
  };

  // INSERT SUBMISSION TO DB (SUBMIT HANDLER)
  var reportForm = document.getElementById('reportForm');

  reportForm.addEventListener('submit', submitHandler)

  function submitHandler(event){
    event.preventDefault();

    extractFormData(event);
  }

  function extractFormData(event){
    var form = event.target.elements;
    var reportData = {};
    reportData.location = form.location.value;
    reportData.description = form.description.value;
    reportData.size = form.size.value;

    var typesList = Array.from(form.type.elements);

    reportData.type_tags = typesList
      .filter(function(typeBox){
        if(typeBox.checked) return typeBox.value;
      })
      .map(function(typeBox){
        return typeBox.value;
      });

    // Validate and Format input.

    indexModule.makeRequest('/post-report', 'POST', JSON.stringify(reportData), function(err, res){
      if (err) console.log(err);

      // front-end post request callback
    });
  }

})();
