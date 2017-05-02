(function() {
  // add event listener to toggle dropdown panel when button is clicked
  var dropdownButton = document.getElementById('toggleDropdown');
  var dropdownPanel = document.getElementById('dropdownPanel');

  dropdownButton.addEventListener('click', function() {
    if (!dropdownPanel.classList.contains('show-dropdown')) {
      dropdownPanel.classList.add('show-dropdown');
    } else {
      dropdownPanel.classList.remove('show-dropdown');
    }
  });
})();
