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
const API_KEY = '03fcf8b5ca40258e0d3fd862688c8848';
const AUTOCOMPLETE_URL = 'https://api.openweathermap.org/geo/1.0/direct';
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
// Input mező referencia
const cityInput = document.getElementById('city-input');
// Gomb referencia
const searchButton = document.getElementById('show-me-button');
// Időjárás adatok megjelenítése
function displayWeatherData(data) {
    const cityElement = document.getElementById('city');
    const weatherStatusElement = document.getElementById('statusOfWeather');
    const temperatureElement = document.getElementById('celsius');
    const realFeelElement = document.getElementById('real-feel');
    const humidityElement = document.getElementById('humidity');
    const maxMinElement = document.getElementById('max-min');
    const windElement = document.getElementById('wind');
    const chanceElement = document.getElementById('chance');
    const pictureElement = document.getElementById('pictureOfWeather');
    cityElement.textContent = data.name;
    weatherStatusElement.textContent = data.weather[0].main;
    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
    realFeelElement.textContent = `Real Feel: ${Math.round(data.main.feels_like)}°C`;
    humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
    maxMinElement.textContent = `Max/Min Temp: ${Math.round(data.main.temp_max)}°C / ${Math.round(data.main.temp_min)}°C`;
    windElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    chanceElement.textContent = `Chance of Rain: ${data.rain ? data.rain['1h'] : 0}%`;
    const weatherIconName = getWeatherIconName(data.weather[0].icon);
    pictureElement.src = weatherIconName;
    pictureElement.alt = 'Weather Icon';
}
// Az időjárási ikonok elérési útvonalai
const weatherIcons = {
    '01d': 'img/clearsky.png',
    '01n': 'img/clearsky.png',
    '02d': 'img/clouds.png',
    '02n': 'img/clouds.png',
    '03d': 'img/clouds.png',
    '03n': 'img/clouds.png',
    '04d': 'img/clouds.png',
    '04n': 'img/clouds.png',
    '09d': 'img/rain.png',
    '09n': 'img/rain.png',
    '10d': 'img/rain.png',
    '10n': 'img/rain.png',
    '11d': 'img/thunderstorm.png',
    '11n': 'img/thunderstorm.png',
    '13d': 'img/snow.png',
    '13n': 'img/snow.png',
    '50d': 'img/mist.png',
    '50n': 'img/mist.png',
};
// Az időjárási állapot alapján az ikon elérési útvonalának megszerzése
function getWeatherIconName(iconCode) {
    return weatherIcons[iconCode] || '';
}
// Időjárás lekérdezése
function getWeather(city) {
    return __awaiter(this, void 0, void 0, function* () {
        const weatherResponse = yield fetch(`${WEATHER_URL}?q=${city}&units=metric&appid=${API_KEY}`);
        const weatherData = yield weatherResponse.json();
        displayWeatherData(weatherData);
    });
}
// Autocomplete lekérdezése
function getAutocomplete(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const autocompleteResponse = yield fetch(`${AUTOCOMPLETE_URL}?q=${query}&limit=5&appid=${API_KEY}`);
        const autocompleteData = yield autocompleteResponse.json();
        displayAutocomplete(autocompleteData);
    });
}
// Autocomplete lista megjelenítése
function displayAutocomplete(data) {
    const suggestionsList = document.getElementById('suggestions-list');
    suggestionsList.innerHTML = '';
    data.forEach((item) => {
        const suggestionItem = document.createElement('div');
        suggestionItem.textContent = item.name;
        suggestionItem.classList.add('suggestion-item');
        suggestionItem.addEventListener('click', () => {
            cityInput.value = item.name;
            suggestionsList.innerHTML = '';
        });
        suggestionsList.appendChild(suggestionItem);
    });
}
// Keresés eseménykezelő
searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    getWeather(city);
});
// Input mező változás eseménykezelő
cityInput.addEventListener('input', () => {
    const query = cityInput.value;
    if (query.length > 2) {
        getAutocomplete(query);
    }
    else {
        const suggestionsList = document.getElementById('suggestions-list');
        suggestionsList.innerHTML = '';
    }
});
// Gomb lenyomásának eseménykezelő
searchButton.addEventListener('click', () => {
    const animateBox = document.getElementById('animate-box');
    animateBox.classList.add('animate-slide-up');
    const pictureElement = document.getElementById('pictureOfWeather');
    pictureElement.style.display = 'inline';
    // Gomb lenyomása után eltávolítjuk az eseménykezelőt, hogy a gomb ne mozogjon újra
    searchButton.removeEventListener('click', buttonClickHandler);
});
function buttonClickHandler() {
    const pictureElement = document.getElementById('pictureOfWeather');
    pictureElement.style.display = 'inline';
}
// Gomb lenyomásának eseménykezelő hozzáadása
searchButton.addEventListener('click', buttonClickHandler);
