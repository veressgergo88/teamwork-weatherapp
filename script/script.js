"use strict";
const dataArray = [
    'Budapest',
    'Miskolc',
    'Salgótarján',
    'Mikolc',
    'Nyíregyháza',
    'Debrecen',
    'Békéscsaba',
    'Szolnok',
    'Eger',
    'Szeged',
    'Kecskemét',
    'Tatabánya',
    'Székesfehérvár',
    'Szekszárd',
    'Pécs',
    'Győr',
    'Veszprém',
    'Kaposvár',
    'Zalaegerszeg',
    'Szombathely'
];
let userInput;
const inputBox = document.querySelector('.inp'); //querySelector megfogja az összes .className-en futó elementet
const suggestion = document.querySelector('.suggestionBox');
let filteredArray = [];
const getInput = (event) => {
    userInput = event.target.value;
    if (userInput === '') {
        filteredArray = [];
        renderSuggestions();
    }
    else {
        filterArray();
        renderSuggestions();
    }
};
const filterArray = () => {
    filteredArray = dataArray.filter((item) => item.toLowerCase().includes(userInput.toLowerCase()));
};
const renderSuggestions = () => {
    suggestion.innerHTML = '';
    if (filteredArray.length > 0) {
        filteredArray.forEach((item) => {
            const divElement = document.createElement('div');
            divElement.textContent = item;
            suggestion.appendChild(divElement);
        });
    }
};
inputBox.addEventListener('input', getInput);
let celsius = document.getElementById('celsius');
const pElement1 = celsius.append('19');
let city = document.getElementById('city');
const pElement3 = city.append('New York');
let statusOfWeather = document.getElementById('statusOfWeather');
const pElement2 = statusOfWeather.append('Sunny');
let picture = document.getElementById('pictureOfWeather');
const svgElement = picture.append('');
