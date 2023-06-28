const apiKey = 'a3e3462b47bbc9a7e2cb32ec5dff6423';

interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  rain?: {
    "1h": number;
    "3h": number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
  uv_index: number;
}

const loadWeatherData = async (city: string): Promise<WeatherData> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  );
  const data: WeatherData = await response.json();
  allCitiesArray.push(data.name);
  return data;
};

let city: string = '';

let allCitiesArray: string[] = [];

let userInput: string;
const inputBox = document.getElementById('input-box')!;
const suggestion = document.getElementById('suggestion-box')!;
let filteredArray: string[] = [];

const displayErrorMessage = (error: unknown) => {
  const resultParagraphElement = document.getElementById('result-paragraph');
  if (resultParagraphElement) {
    resultParagraphElement.textContent = `Hiba történt: ${(error as Error).message}`;
  }
};

const updateWeatherData = async (city: string) => {
  try {
    const data = await loadWeatherData(city);
    displayWeatherData(data);
  } catch (error) {
    displayErrorMessage((error as Error).message);
  }
};

const getInput = (event: Event) => {
  userInput = (event.target as HTMLInputElement).value;
  if (userInput === '') {
    filteredArray = [];
    renderSuggestions();
  } else {
    filterArray();
    renderSuggestions();
  }

  if (event instanceof KeyboardEvent && event.key === 'Enter') {
    selectCity(event);
  }
};

const updateWeatherDataForCities = async (cities: string[]) => {
  for (const city of cities) {
    await updateWeatherData(city);
  }
};

const cities = ['New York', 'Budapest', 'Prága', 'Pozsony', 'Párizs', 'London'];

const selectCity = (event: Event) => {
  const selectedCity = (event.target as HTMLDivElement).textContent;
  if (selectedCity) {
    userInput = selectedCity;
    inputBox.querySelector('input')!.value = userInput;
    updateWeatherData(userInput);
  }
};

const showMeButton = document.getElementById('show-me-button')!;
showMeButton.addEventListener('click', selectCity);

inputBox.querySelector('input')!.addEventListener('input', getInput);
suggestion.addEventListener('click', selectCity);
suggestion.addEventListener('mousedown', selectCity);
const filterArray = () => {
  filteredArray = allCitiesArray.filter((item) =>
    item.toLowerCase().includes(userInput.toLowerCase())
  );
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

const displayWeatherData = (data: WeatherData) => {
  const celsius = document.getElementById('celsius') as HTMLElement;
  const celsiusValue = (data.main.temp - 273.15).toFixed(2);
  celsius.textContent = `${celsiusValue}°C`;

  const cityx = document.getElementById('city') as HTMLElement;
  cityx.textContent = data.name;

  const statusOfWeather = document.getElementById('statusOfWeather') as HTMLElement;
  statusOfWeather.textContent = data.weather[0].description;

  const picture = document.getElementById('pictureOfWeather') as HTMLElement;
  picture.innerHTML = `<svg ...></svg>`;

  const realFeel = document.getElementById('real-feel') as HTMLElement;
  const realFeelCelsius = (data.main.feels_like - 273.15).toFixed(2);
  realFeel.textContent = `Real Feel: ${realFeelCelsius}°C`;

  const humidity = document.getElementById('humidity') as HTMLElement;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;

  const maxMin = document.getElementById('max-min') as HTMLElement;
  const maxCelsius = (data.main.temp_max - 273.15).toFixed(2);
  const minCelsius = (data.main.temp_min - 273.15).toFixed(2)
  maxMin.textContent = `Max/Min: ${maxCelsius}°C / ${minCelsius}°C`;

  const uvIndex = document.getElementById('uv-index') as HTMLElement;
  uvIndex.textContent = `UV-Index: ${data.uv_index}`;

  const wind = document.getElementById('wind') as HTMLElement;
  wind.textContent = `Wind: ${data.wind.speed} km/h`;

  const chance = document.getElementById('chance') as HTMLElement;
  chance.textContent = `Rain chance: ${data.rain ? data.rain["1h"] : 0}%`;
};

updateWeatherDataForCities(cities);
