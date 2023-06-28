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
    // SVG kép vagy ikon beállítása az időjárás alapján
    const weatherIconName = getWeatherIconName(data.weather[0].main);
    pictureElement.innerHTML = `<svg class="h-32 w-32" viewBox="0 -32 512 512" xmlns="http://www.w3.org/2000/svg"><use xlink:href="/path/to/icons.svg#${weatherIconName}"></use></svg>`;
}
// Az időjárási állapot alapján visszaadja a megfelelő ikon nevét
function getWeatherIconName(weatherStatus) {
    // Az időjárási állapotokhoz tartozó ikonok és nevek
    const weatherIcons = {
        Clear: 'icon-clear',
        Clouds: 'icon-clouds',
        Rain: 'icon-rain',
        // ... további időjárási állapotok és ikonok
    };
    return weatherIcons[weatherStatus] || 'icon-default'; // Alapértelmezett ikon, ha nincs meghatározott ikon az adott állapothoz
}
// Autocomplete funkció
function autocomplete(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const suggestionsList = document.getElementById('suggestions-list');
        input.addEventListener('input', () => __awaiter(this, void 0, void 0, function* () {
            const inputValue = input.value;
            if (inputValue.length >= 3) {
                try {
                    const response = yield fetch(`${AUTOCOMPLETE_URL}?q=${inputValue}&limit=5&appid=${API_KEY}`);
                    if (response.ok) {
                        const data = yield response.json();
                        const suggestions = data.map((city) => city.name);
                        // Töröljük a korábbi sugestiókat
                        suggestionsList.innerHTML = '';
                        // Sugestiók hozzáadása a listához
                        suggestions.forEach((suggestion) => {
                            const suggestionItem = document.createElement('div');
                            suggestionItem.textContent = suggestion;
                            suggestionItem.classList.add('px-4', 'py-2', 'hover:bg-gray-100', 'cursor-pointer');
                            suggestionItem.addEventListener('click', () => {
                                input.value = suggestion;
                                suggestionsList.innerHTML = '';
                            });
                            suggestionsList.appendChild(suggestionItem);
                        });
                    }
                    else {
                        console.error('Hiba a városnév lekérdezésekor.');
                    }
                }
                catch (error) {
                    console.error(error);
                }
            }
            else {
                // Töröljük a sugestiókat, ha a beviteli érték kevesebb, mint 3 karakter
                suggestionsList.innerHTML = '';
            }
        }));
    });
}
// Gomb lenyomás eseménykezelő
searchButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    const city = cityInput.value;
    try {
        const response = yield fetch(`${WEATHER_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        if (response.ok) {
            const data = yield response.json();
            displayWeatherData(data);
        }
        else {
            console.error('Hiba az időjárás lekérdezésekor.');
        }
    }
    catch (error) {
        console.error(error);
    }
}));
// Autocomplete inicializálása
autocomplete(cityInput);
