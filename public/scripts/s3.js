(function() {
  // listen for image upload to browser
  var imageInput = document.getElementById('imageFile');
  imageInput.addEventListener('change', function() {
    var file = imageInput.files[0];
    getSignedRequest(file);
  });

  // retrieve signed request from back end
  function getSignedRequest(file) {
    var url = '/sign-s3?file-name=' + file.name + '&file-type=' + file.type;

    // make request to server route /sign-s3
    indexModule.makeRequest(url, 'GET', null, function(err, response) {
      if (err) return console.log(err);

      // if successful, upload the file
      var parsedRes = JSON.parse(response);
      uploadFile(file, parsedRes.signedRequest, parsedRes.url);
    });
  };

  // upload the file to s3
  function uploadFile(file, signedRequest, dataUrl) {
    indexModule.makeRequest(signedRequest, 'PUT', file, function(err, response) {
      if (err) return console.log(err);

      // adjust form view
      document.getElementById('previewImage').src = dataUrl;
      document.getElementById('previewImage').classList.remove('hidden');
      document.getElementById('avatarUrl').value = dataUrl;
    });
  };
})();
