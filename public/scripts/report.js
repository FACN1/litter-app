(function(){

  // GET USER'S LOCATION
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

  // INSERT SUBMISSION TO DB (SUBMIT HANDLER)
  var submitButton = document.getElementById('submitReport');

  submitButton.addEventListener('submit', function(event){

    event.preventDefault();

    // var form = document.getElementById()
    console.log('event.target');
  })




})();
