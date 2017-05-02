(function() {
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
