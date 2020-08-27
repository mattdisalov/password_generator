// dom elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');
const statusEl = document.getElementById('status');

const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
}

// generate event listeners
generate.addEventListener('click', () => {
    const length = lengthEl.value;
	const hasLower = lowercaseEl.checked;
	const hasUpper = uppercaseEl.checked;
	const hasNumber = numbersEl.checked;
	const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

// copy pass to clipboard
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    
    statusEl.innerHTML = '<div class="outer">Password copied!</div>';
    generateEl.addEventListener('click', () => {
        statusEl.innerHTML = '<div class="outer"></div>';
    });
})

// generate password function
function generatePassword(lower, upper, number, symbol, length) {
    
    // 1. init pass var
    let generatedPassword = '';

    const typesCount = lower + upper + number + symbol;

    // 2. filter out unchecked types
    const typesArray = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item) [0]);

    if(typesCount === 0) {
        return '';
    }

    // 3. loop over length, call generator function for each type
    for (let i = 0; i < length; i += typesCount) {
        typesArray.forEach(type => {
            const funcName = Object.keys(type)[0];
            //console.log('funcName: ', funcName);

            generatedPassword += randomFunc[funcName]();
        });
    }

    // 4. add final pass to pass var and return
    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
}

// generator functions
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

// dark theme toggle
const chk = document.getElementById('chk');
const theme = document.querySelector("#theme-link");
chk.addEventListener('change', () => {
	if (theme.getAttribute("href") == "assets/css/style.css") {
        theme.href = "assets/css/style-dark.css";
      } else {
        theme.href = "assets/css/style.css";
      }
});