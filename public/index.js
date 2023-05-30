document.getElementById("services").addEventListener('change', function() {
    let selectedOption = this.value;
    if (selectedOption !== '') {
      window.location.href = selectedOption;
    }
  })