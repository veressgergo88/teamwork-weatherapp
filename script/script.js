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
const apiKey = 'a3e3462b47bbc9a7e2cb32ec5dff6423';
const loadWeatherData = (city) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    const data = yield response.json();
    allCitiesArray.push(data.name);
    return data;
});
let city = '';
let allCitiesArray = [];
let userInput;
const inputBox = document.getElementById('input-box');
const suggestion = document.getElementById('suggestion-box');
let filteredArray = [];
const displayErrorMessage = (error) => {
    const resultParagraphElement = document.getElementById('result-paragraph');
    if (resultParagraphElement) {
        resultParagraphElement.textContent = `Hiba történt: ${error.message}`;
    }
};
const updateWeatherData = (city) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield loadWeatherData(city);
        displayWeatherData(data);
    }
    catch (error) {
        displayErrorMessage(error.message);
    }
});
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
    if (event instanceof KeyboardEvent && event.key === 'Enter') {
        selectCity(event);
    }
};
const updateWeatherDataForCities = (cities) => __awaiter(void 0, void 0, void 0, function* () {
    for (const city of cities) {
        yield updateWeatherData(city);
    }
});
const cities = ['New York', 'Budapest', 'Prága', 'Pozsony', 'Párizs', 'London'];
const selectCity = (event) => {
    const selectedCity = event.target.textContent;
    if (selectedCity) {
        userInput = selectedCity;
        inputBox.querySelector('input').value = userInput;
        updateWeatherData(userInput);
    }
};
const showMeButton = document.getElementById('show-me-button');
showMeButton.addEventListener('click', selectCity);
inputBox.querySelector('input').addEventListener('input', getInput);
suggestion.addEventListener('click', selectCity);
suggestion.addEventListener('mousedown', selectCity);
const filterArray = () => {
    filteredArray = allCitiesArray.filter((item) => item.toLowerCase().includes(userInput.toLowerCase()));
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
const displayWeatherData = (data) => {
    const celsius = document.getElementById('celsius');
    const celsiusValue = (data.main.temp - 273.15).toFixed(2);
    celsius.textContent = `${celsiusValue}°C`;
    const cityx = document.getElementById('city');
    cityx.textContent = data.name;
    const statusOfWeather = document.getElementById('statusOfWeather');
    statusOfWeather.textContent = data.weather[0].description;
    const picture = document.getElementById('pictureOfWeather');
    picture.innerHTML = `<svg ...></svg>`;
    const realFeel = document.getElementById('real-feel');
    const realFeelCelsius = (data.main.feels_like - 273.15).toFixed(2);
    realFeel.textContent = `Real Feel: ${realFeelCelsius}°C`;
    const humidity = document.getElementById('humidity');
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    const maxMin = document.getElementById('max-min');
    const maxCelsius = (data.main.temp_max - 273.15).toFixed(2);
    const minCelsius = (data.main.temp_min - 273.15).toFixed(2);
    maxMin.textContent = `Max/Min: ${maxCelsius}°C / ${minCelsius}°C`;
    const uvIndex = document.getElementById('uv-index');
    uvIndex.textContent = `UV-Index: ${data.uv_index}`;
    const wind = document.getElementById('wind');
    wind.textContent = `Wind: ${data.wind.speed} km/h`;
    const chance = document.getElementById('chance');
    chance.textContent = `Rain chance: ${data.rain ? data.rain["1h"] : 0}%`;
};
updateWeatherDataForCities(cities);
