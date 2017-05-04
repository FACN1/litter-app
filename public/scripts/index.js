var IndexModule = (function() {
  // XHR request function
  var makeRequest = function(url, method, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback(null, xhr.responseText);
      }
    }
    xhr.open(method, url);

    if (method === 'POST') {
      xhr.send(data);
    } else {
      xhr.send();
    }
  }

  // add event listener to toggle dropdown panel when button is clicked
  var dropdownListener = function() {
    var dropdownButton = document.getElementById('toggleDropdown');
    var dropdownPanel = document.getElementById('dropdownPanel');

    dropdownButton.addEventListener('click', function() {
      if (!dropdownPanel.classList.contains('show-dropdown')) {
        dropdownPanel.classList.add('show-dropdown');
      } else {
        dropdownPanel.classList.remove('show-dropdown');
      }
    });
  }

  // run these automatically
  dropdownListener();

  // expose these functions
  return {
    makeRequest: makeRequest
  }
})();
