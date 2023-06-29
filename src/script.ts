const API_KEY: string = '03fcf8b5ca40258e0d3fd862688c8848';
const AUTOCOMPLETE_URL: string = 'https://api.openweathermap.org/geo/1.0/direct';
const WEATHER_URL: string = 'https://api.openweathermap.org/data/2.5/weather';

// Input mező referencia
const cityInput: HTMLInputElement = document.getElementById('city-input') as HTMLInputElement;

// Gomb referencia
const searchButton: HTMLButtonElement = document.getElementById('show-me-button') as HTMLButtonElement;

// Időjárás adatok megjelenítése
function displayWeatherData(data: any): void {
  const cityElement: HTMLElement = document.getElementById('city')!;
  const weatherStatusElement: HTMLElement = document.getElementById('statusOfWeather')!;
  const temperatureElement: HTMLElement = document.getElementById('celsius')!;
  const realFeelElement: HTMLElement = document.getElementById('real-feel')!;
  const humidityElement: HTMLElement = document.getElementById('humidity')!;
  const maxMinElement: HTMLElement = document.getElementById('max-min')!;
  const windElement: HTMLElement = document.getElementById('wind')!;
  const chanceElement: HTMLElement = document.getElementById('chance')!;
  const pictureElement: HTMLImageElement = document.getElementById('pictureOfWeather') as HTMLImageElement;

  cityElement.textContent = data.name;
  weatherStatusElement.textContent = data.weather[0].main;
  temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
  realFeelElement.textContent = `Real Feel: ${Math.round(data.main.feels_like)}°C`;
  humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
  maxMinElement.textContent = `Max/Min Temp: ${Math.round(data.main.temp_max)}°C / ${Math.round(data.main.temp_min)}°C`;
  windElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;
  chanceElement.textContent = `Chance of Rain: ${data.rain ? data.rain['1h'] : 0}%`;

  const weatherIconName: string = getWeatherIconName(data.weather[0].icon);
  pictureElement.src = weatherIconName;
  pictureElement.alt = 'Weather Icon';
}

// Az időjárási ikonok elérési útvonalai
const weatherIcons: { [key: string]: string } = {
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
function getWeatherIconName(iconCode: string): string {
  return weatherIcons[iconCode] || '';
}

// Időjárás lekérdezése
async function getWeather(city: string): Promise<void> {
  const weatherResponse = await fetch(`${WEATHER_URL}?q=${city}&units=metric&appid=${API_KEY}`);
  const weatherData = await weatherResponse.json();
  displayWeatherData(weatherData);
}

// Autocomplete lekérdezése
async function getAutocomplete(query: string): Promise<void> {
  const autocompleteResponse = await fetch(`${AUTOCOMPLETE_URL}?q=${query}&limit=5&appid=${API_KEY}`);
  const autocompleteData = await autocompleteResponse.json();
  displayAutocomplete(autocompleteData);
}

// Autocomplete lista megjelenítése
function displayAutocomplete(data: any[]): void {
  const suggestionsList: HTMLElement = document.getElementById('suggestions-list')!;
  suggestionsList.innerHTML = '';

  data.forEach((item: any) => {
    const suggestionItem: HTMLDivElement = document.createElement('div');
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
  const city: string = cityInput.value;
  getWeather(city);
});

// Input mező változás eseménykezelő
cityInput.addEventListener('input', () => {
  const query: string = cityInput.value;
  if (query.length > 2) {
    getAutocomplete(query);
  } else {
    const suggestionsList: HTMLElement = document.getElementById('suggestions-list')!;
    suggestionsList.innerHTML = '';
  }
});

// Gomb lenyomásának eseménykezelő
searchButton.addEventListener('click', () => {
  const animateBox: HTMLElement = document.getElementById('animate-box')!;
  animateBox.classList.add('animate-slide-up');
  
  const pictureElement: HTMLImageElement = document.getElementById('pictureOfWeather') as HTMLImageElement;
  pictureElement.style.display = 'inline';

  // Gomb lenyomása után eltávolítjuk az eseménykezelőt, hogy a gomb ne mozogjon újra
  searchButton.removeEventListener('click', buttonClickHandler);
});

function buttonClickHandler() {
  const pictureElement: HTMLImageElement = document.getElementById('pictureOfWeather') as HTMLImageElement;
  pictureElement.style.display = 'inline';
}

// Gomb lenyomásának eseménykezelő hozzáadása
searchButton.addEventListener('click', buttonClickHandler);
