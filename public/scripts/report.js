(function(){

  // GET USER'S LOCATION
  function getLocation(){

    var locationButton = document.getElementById('getLocationButton');

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        // non-supprt error handling
        console.log('Geolocation is not supported by this browser.');
      }
    };

    function showPosition(position) {
      console.log(
        'Latitude: ' + position.coords.latitude +
        'Longitude: ' + position.coords.longitude
      );
    };

    locationButton.addEventListener('click', getLocation);

  }

  // INSERT SUBMISSION TO DB (SUBMIT HANDLER)
  function addSubmitListener(){

    var reportForm = document.getElementById('reportForm');

    reportForm.addEventListener('submit', submitHandler)

    function submitHandler(event){
      event.preventDefault();

      extractFormData(event);
    }

  }

  function extractFormData(event){
    console.dir(event.target.elements);

  }


  getLocation();
  addSubmitListener();

})();
