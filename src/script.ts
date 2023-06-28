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
  const pictureElement: HTMLElement = document.getElementById('pictureOfWeather')!;

  cityElement.textContent = data.name;
  weatherStatusElement.textContent = data.weather[0].main;
  temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
  realFeelElement.textContent = `Real Feel: ${Math.round(data.main.feels_like)}°C`;
  humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
  maxMinElement.textContent = `Max/Min Temp: ${Math.round(data.main.temp_max)}°C / ${Math.round(data.main.temp_min)}°C`;
  windElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;
  chanceElement.textContent = `Chance of Rain: ${data.rain ? data.rain['1h'] : 0}%`;

  // SVG kép vagy ikon beállítása az időjárás alapján
  const weatherIconName: string = getWeatherIconName(data.weather[0].main);
  pictureElement.innerHTML = `<svg class="h-32 w-32" viewBox="0 -32 512 512" xmlns="http://www.w3.org/2000/svg"><use xlink:href="/path/to/icons.svg#${weatherIconName}"></use></svg>`;
}

// Az időjárási állapot alapján visszaadja a megfelelő ikon nevét
function getWeatherIconName(weatherStatus: string): string {
  // Az időjárási állapotokhoz tartozó ikonok és nevek
  const weatherIcons: { [key: string]: string } = {
    Clear: 'icon-clear',
    Clouds: 'icon-clouds',
    Rain: 'icon-rain',
    // ... további időjárási állapotok és ikonok
  };

  return weatherIcons[weatherStatus] || 'icon-default'; // Alapértelmezett ikon, ha nincs meghatározott ikon az adott állapothoz
}

// Autocomplete funkció
async function autocomplete(input: HTMLInputElement): Promise<void> {
  const suggestionsList: HTMLDivElement = document.getElementById('suggestions-list') as HTMLDivElement;

  input.addEventListener('input', async () => {
    const inputValue: string = input.value;

    if (inputValue.length >= 3) {
      try {
        const response: Response = await fetch(
          `${AUTOCOMPLETE_URL}?q=${inputValue}&limit=5&appid=${API_KEY}`
        );

        if (response.ok) {
          const data: any[] = await response.json();
          const suggestions: string[] = data.map((city: any) => city.name);

          // Töröljük a korábbi sugestiókat
          suggestionsList.innerHTML = '';

          // Sugestiók hozzáadása a listához
          suggestions.forEach((suggestion: string) => {
            const suggestionItem: HTMLDivElement = document.createElement('div');
            suggestionItem.textContent = suggestion;
            suggestionItem.classList.add('px-4', 'py-2', 'hover:bg-gray-100', 'cursor-pointer');
            suggestionItem.addEventListener('click', () => {
              input.value = suggestion;
              suggestionsList.innerHTML = '';
            });
            suggestionsList.appendChild(suggestionItem);
          });
        } else {
          console.error('Hiba a városnév lekérdezésekor.');
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      // Töröljük a sugestiókat, ha a beviteli érték kevesebb, mint 3 karakter
      suggestionsList.innerHTML = '';
    }
  });
}


// Gomb lenyomás eseménykezelő
searchButton.addEventListener('click', async () => {
  const city: string = cityInput.value;

  try {
    const response: Response = await fetch(
      `${WEATHER_URL}?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (response.ok) {
      const data: any = await response.json();
      displayWeatherData(data);
    } else {
      console.error('Hiba az időjárás lekérdezésekor.');
    }
  } catch (error) {
    console.error(error);
  }
});

// Autocomplete inicializálása
autocomplete(cityInput);
