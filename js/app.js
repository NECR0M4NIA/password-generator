const $passwordText = document.querySelector('.generated-password');
const $range = document.querySelector('#length');
const $selectedLength = document.querySelector('.selected-length');
const $checkUppercase = document.querySelector('#uppercase');

console.log($passwordText);
console.log($range);
console.log($selectedLength);
console.log("---");
console.log($checkUppercase);

$range.addEventListener("input", function() {
    $selectedLength.textContent = this.value;
})

const $checkLowercase = document.querySelector('#lowercase');
const $checkNumbers = document.querySelector('#numbers');
const $checkSymbols = document.querySelector('#symbols');
const $strengthIndicator = document.querySelector('.strength-indicator');
const $indicators = document.querySelectorAll('.indicator');
const $form = document.querySelector('.password-generator-form');
const $copyBtn = document.querySelector('.copy-to-clipboard-btn');

const getRandomChar = (min, max) => {
    return String.fromCharCode(Math.floor(Math.random() * (max - min + 1)) + min);
};

const generatePassword = () => {
    let chars = '';
    let password = '';
    
    if ($checkUppercase.checked) chars += getRandomChar(65, 90);
    if ($checkLowercase.checked) chars += getRandomChar(97, 122);
    if ($checkNumbers.checked) chars += getRandomChar(48, 57);
    if ($checkSymbols.checked) chars += getRandomChar(33, 47);
    
    const length = parseInt($range.value);
    
    for (let i = chars.length; i < length; i++) {
        const randomType = Math.floor(Math.random() * 4);
        if (randomType === 0 && $checkUppercase.checked) chars += getRandomChar(65, 90);
        if (randomType === 1 && $checkLowercase.checked) chars += getRandomChar(97, 122);
        if (randomType === 2 && $checkNumbers.checked) chars += getRandomChar(48, 57);
        if (randomType === 3 && $checkSymbols.checked) chars += getRandomChar(33, 47);
    }
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }
    
    return password;
};

const updateStrengthIndicator = () => {
    let strength = 0;
    if ($checkUppercase.checked) strength++;
    if ($checkLowercase.checked) strength++;
    if ($checkNumbers.checked) strength++;
    if ($checkSymbols.checked) strength++;
    
    $indicators.forEach(indicator => {
        indicator.className = 'indicator';
    });
    
    for (let i = 0; i < strength; i++) {
        $indicators[i].classList.add(`indicator-${i + 1}`);
    }
    
    const strengthTexts = ['Too Weak', 'Weak', 'Medium', 'Strong'];
    $strengthIndicator.textContent = strengthTexts[strength - 1] || '';
};

$form.addEventListener('submit', (e) => {
    e.preventDefault();
    $passwordText.textContent = generatePassword();
});

$copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText($passwordText.textContent);
    alert('Password copied to clipboard!');
});

[$checkUppercase, $checkLowercase, $checkNumbers, $checkSymbols].forEach(checkbox => {
    checkbox.addEventListener('change', updateStrengthIndicator);
});
