"use strict";
/* import { API_KEY } from './config';

const url = `http://api.weatherapi.com/v1?apiKey=${API_KEY}`;
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let load = () => __awaiter(void 0, void 0, void 0, function* () {
    let response = yield fetch("http://api.weatherapi.com/v1/forecast.json?key=04e4c702cf3b4efc921170534232706&q=New York&days=3&aqi=no&alerts=no");
    let data = yield response.json();
    return data;
});
load();
let load2 = () => __awaiter(void 0, void 0, void 0, function* () {
    let response = yield fetch("http://api.weatherapi.com/v1/forecast.json");
    let data = yield response.json();
    return data;
});
load2();
let load3 = () => __awaiter(void 0, void 0, void 0, function* () {
    let response = yield fetch("http://api.weatherapi.com/v1/history.json");
    let data = yield response.json();
    return data;
});
load3();
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
const inputBox = document.querySelector('.inp');
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
/*   function clock(){

    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let ora = String(today.getHours()).padStart(2, '0');
    let perc = String(today.getMinutes()).padStart(2, '0');
    let masodperc = String(today.getSeconds()).padStart(2, '0');
    let dateTime = ora + ":" + perc  + ":" + masodperc;
    
        document.getElementById("ido")!.innerHTML = "A pontos idő: " + date + " " +  dateTime
    
    let t = setTimeout(function(){ clock() }, 1000);
    }
    clock();
 */
