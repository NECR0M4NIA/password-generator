const lengthInput = document.getElementById('length');
const selectedLength = document.querySelector('.selected-length');

lengthInput.addEventListener('input', function() {
    selectedLength.textContent = this.value;
});
