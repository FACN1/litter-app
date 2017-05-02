(function() {
  // set up map config
  var lat = 50;
  var lon = 50;

  var mapBoxToken = document.getElementById('myMap').dataset.token;

  // instantiate map
  var myMap = L.map('myMap').setView([lat, lon], 13);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
  {
    attribution: null,
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: mapBoxToken
  }).addTo(myMap);

})();
