const passwordDisplay = document.getElementById('password-display');
const copyBtn = document.getElementById('copy-btn');
const lengthSlider = document.getElementById('length-slider');
const lengthVal = document.getElementById('length-val');
const uppercaseCb = document.getElementById('uppercase');
const lowercaseCb = document.getElementById('lowercase');
const numbersCb = document.getElementById('numbers');
const symbolsCb = document.getElementById('symbols');
const generateBtn = document.getElementById('generate-btn');
const strengthBar = document.getElementById('strength-bar');
const strengthLabel = document.getElementById('strength-label');
const btnRandom = document.getElementById('btn-random');
const btnMemorable = document.getElementById('btn-memorable');
const btnPin = document.getElementById('btn-pin');
let currentType = 'random';
const words = ["alpha", "bravo", "delta", "eagle", "stone", "river", "shadow", "rocket", "forest", "shield", "portal", "quantum", "galaxy", "matrix", "beacon", "vector", "horizon", "timber", "summit", "vortex"];
const chars = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>/?'
};
function setActiveType(selectedBtn, type) {
    [btnRandom, btnMemorable, btnPin].forEach(btn => {
        if (btn) btn.classList.remove('active');
    });
    if (selectedBtn) selectedBtn.classList.add('active');
    currentType = type;
    if (type === 'memorable') {
        lengthSlider.min = 3;
        lengthSlider.max = 15;
        if (parseInt(lengthSlider.value) > 15 || parseInt(lengthSlider.value) < 3) {
            lengthSlider.value = 4; 
        }
    } else if (type === 'pin') {
        lengthSlider.min = 4;
        lengthSlider.max = 12;
        if (parseInt(lengthSlider.value) > 12 || parseInt(lengthSlider.value) < 4) {
            lengthSlider.value = 6; 
        }
    } else {
        lengthSlider.min = 6;
        lengthSlider.max = 50;
        if (parseInt(lengthSlider.value) < 6 || parseInt(lengthSlider.value) > 50) {
            lengthSlider.value = 12; 
        }
    }
    lengthVal.textContent = lengthSlider.value;
    if (passwordDisplay.textContent !== 'Your password will appear here' && passwordDisplay.textContent !== 'Please select an option!') {
        generatePassword();
    }
}
if (btnRandom) btnRandom.addEventListener('click', () => setActiveType(btnRandom, 'random'));
if (btnMemorable) btnMemorable.addEventListener('click', () => setActiveType(btnMemorable, 'memorable'));
if (btnPin) btnPin.addEventListener('click', () => setActiveType(btnPin, 'pin'));

lengthSlider.addEventListener('input', () => {
    lengthVal.textContent = lengthSlider.value;
    if (passwordDisplay.textContent !== 'Your password will appear here' && passwordDisplay.textContent !== 'Please select an option!') {
        generatePassword();
    }
});
[uppercaseCb, lowercaseCb, numbersCb, symbolsCb].forEach(cb => {
    if (cb) {
        cb.addEventListener('change', () => {
            if (passwordDisplay.textContent !== 'Your password will appear here' && passwordDisplay.textContent !== 'Please select an option!') {
                generatePassword();
            }
        });
    }
});
function calculateStrength(password, length, typesCount) {
    if (password === '' || password === 'Please select an option!' || password === 'Your password will appear here') return { width: '0%', color: '#e2e8f0', text: 'Strength: -' };
    if (currentType === 'memorable') {
        if (length <= 3) return { width: '25%', color: '#ef4444', text: 'Strength: Weak 🔴' };
        if (length <= 5) return { width: '60%', color: '#f59e0b', text: 'Strength: Medium 🟡' };
        return { width: '100%', color: '#16a34a', text: 'Strength: Strong 🟢' };
    }
    if (currentType === 'pin') {
        if (length <= 6) return { width: '25%', color: '#ef4444', text: 'Strength: Weak 🔴' };
        if (length <= 9) return { width: '60%', color: '#f59e0b', text: 'Strength: Medium 🟡' };
        return { width: '100%', color: '#16a34a', text: 'Strength: Strong 🟢' };
    }
    let score = 0;
    if (length >= 8) score++;
    if (length >= 14) score++;
    if (typesCount >= 2) score++;
    if (typesCount >= 4) score++;
    if (score <= 1) {
        return { width: '25%', color: '#ef4444', text: 'Strength: Weak 🔴' };
    } else if (score <= 3) {
        return { width: '60%', color: '#f59e0b', text: 'Strength: Medium 🟡' };
    } else {
        return { width: '100%', color: '#16a34a', text: 'Strength: Strong 🟢' };
    }
}
function generatePassword() {
    let generatedPassword = '';
    const passwordLength = parseInt(lengthSlider.value);
    let typesCount = 0;

    if (currentType === 'memorable') {
        let selectedWords = [];
        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * words.length);
            selectedWords.push(words[randomIndex]);
        }
        generatedPassword = selectedWords.join('-');
    } 
    else if (currentType === 'pin') {
        for (let i = 0; i < passwordLength; i++) {
            generatedPassword += Math.floor(Math.random() * 10);
        }
    } 
    else {
        let charPool = '';
        if (uppercaseCb && uppercaseCb.checked) { charPool += chars.uppercase; typesCount++; }
        if (lowercaseCb && lowercaseCb.checked) { charPool += chars.lowercase; typesCount++; }
        if (numbersCb && numbersCb.checked) { charPool += chars.numbers; typesCount++; }
        if (symbolsCb && symbolsCb.checked) { charPool += chars.symbols; typesCount++; }
        if (charPool === '') {
            passwordDisplay.textContent = 'Please select an option!';
            if (strengthBar) strengthBar.style.width = '0%';
            if (strengthLabel) strengthLabel.textContent = 'Strength: -';
            return;
        }
        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * charPool.length);
            generatedPassword += charPool[randomIndex];
        }
    }
    passwordDisplay.textContent = generatedPassword;
    if (strengthBar && strengthLabel) {
        const strength = calculateStrength(generatedPassword, passwordLength, typesCount);
        strengthBar.style.width = strength.width;
        strengthBar.style.background = strength.color;
        strengthLabel.textContent = strength.text;
    }
}
async function copyToClipboard() {
    const password = passwordDisplay.textContent;
    if (password === 'Your password will appear here' || password === 'Please select an option!') {
        return;
    }
    try {
        await navigator.clipboard.writeText(password);
        copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('copied');
        setTimeout(() => {
            copyBtn.textContent = 'Copy';
            copyBtn.classList.remove('copied');
        }, 1800);
    } catch (err) {
        alert('Failed to copy password.');
    }
}
if (generateBtn) generateBtn.addEventListener('click', generatePassword);
if (copyBtn) copyBtn.addEventListener('click', copyToClipboard);
setActiveType(btnRandom, 'random');
