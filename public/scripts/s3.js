(function() {
  // listen for image upload to browser
  document.getElementById('imageFile').addEventListener('change', function() {
    var file = document.getElementById('imageFile').files[0];
    getSignedRequest(file);
  });

  // retrieve signed request from back-end
  function getSignedRequest(file) {
    var url = '/sign-s3?file-name=' + file.name + '&file-type=' + file.type;

    // make request to server route /sign-s3
    IndexModule.makeRequest('GET', url, null, function(err, response) {
      if (err) return console.log(err);

      // if successful, upload the file
      uploadFile(file, response.signedRequest, response.url);
    });
  };
})();
