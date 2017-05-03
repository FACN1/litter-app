(function(){

  // GET USER'S LOCATION
  function getLocation(){

    var locationButton = document.getElementById('getLocationButton');

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(storePosition);
      } else {
        // non-supprt error handling
        console.log('Geolocation is not supported by this browser.');
      }
    };
    // store user's location in button attribute
    function storePosition(position) {
      var getLocationButton = document.getElementById('getLocationButton');

      var coords = {
        'latitude': position.coords.latitude,
        'longitude': position.coords.longitude
      };

      getLocationButton.setAttribute("value", JSON.stringify(coords));

      getLocationButton.innerHTML = 'Using current location';

      getLocationButton.className += " using-location";

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

    var form = event.target.elements;
    var reportData = {};
    reportData.location = form[1].value;
    reportData.description = form[2].value;
    reportData.size = form[3].value;
    reportData.description = form[2].value;
    reportData.description = form[2].value;
    reportData.description = form[2].value;
    reportData.description = form[2].value;

    console.dir(reportData.size);

  }


  getLocation();
  addSubmitListener();

})();
