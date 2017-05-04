(function(){

  function getLocationListener(){

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

      var coords = position.coords.latitude+","+position.coords.longitude;

      locationButton.setAttribute("value", coords);

      locationButton.innerHTML = 'Using current location';

      locationButton.classList.remove('getting-location');

      locationButton.classList.add('using-location');

    };

  }

    // INSERT SUBMISSION TO DB (SUBMIT HANDLER)
    function submitFormListener(){

      var reportForm = document.getElementById('reportForm');

      reportForm.addEventListener('submit', submitHandler)

      function submitHandler(event){
        event.preventDefault();

        extractFormData(event);

      }

    }

  function extractFormData(event){

    var form = event.target.elements;
    var reportData = {};
    reportData.location = form[1].value;
    reportData.description = form[2].value;
    reportData.size = form[3].value;

    reportData.type_tags = [];

    if (form[5].checked === true) {
      reportData.type_tags.push(Number(form[5].value))
    };
    if (form[6].checked === true) {
      reportData.type_tags.push(Number(form[6].value))
    };
    if (form[7].checked === true) {
      reportData.type_tags.push(Number(form[7].value))
    };
    if (form[8].checked === true) {
      reportData.type_tags.push(Number(form[8].value))
    };
    if (form[9].checked === true) {
      reportData.type_tags.push(Number(form[9].value))
    };

    // console.dir(reportData.type_tags);

    // Validate and Format input.

    IndexModule.makeRequest('/post-report', 'POST', JSON.stringify(reportData), function(err, res){
      if (err) console.log(err);

      // front-end post request callback
    });

  }

  getLocationListener();
  submitFormListener();

})();
