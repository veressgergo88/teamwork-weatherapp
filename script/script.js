"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* import { API_KEY } from './config';

const url = `http://api.weatherapi.com/v1?apiKey=${API_KEY}`;
 */
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
const pElement1 = celsius.append('19°');
let city = document.getElementById('city');
const pElement3 = city.append('New York');
let statusOfWeather = document.getElementById('statusOfWeather');
const pElement2 = statusOfWeather.append('Sunny');
let picture = document.getElementById('pictureOfWeather');
const svgElement = picture.append('');
let resultParagraphElement = document.getElementById("result-paragraph");
let render = (content) => {
    resultParagraphElement.innerHTML = content;
};
const load = () => __awaiter(void 0, void 0, void 0, function* () {
    let response = yield fetch("http://api.weatherapi.com/v1/response.json?key=3bf837af50db4fa3855164954232506&q=bulk");
    let data = yield response.json();
    render(data["info"]["pages"]);
});
let loadButtonElement = document.getElementById("load");
loadButtonElement.addEventListener("click", load);
