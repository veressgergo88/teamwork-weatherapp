/* import { API_KEY } from './config';

const url = `http://api.weatherapi.com/v1?apiKey=${API_KEY}`;
 */
const dataArray: string[] = [
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
  
  let userInput: string;
  const inputBox = document.querySelector<HTMLInputElement>('.inp')!;  //querySelector megfogja az összes .className-en futó elementet
  const suggestion = document.querySelector<HTMLDivElement>('.suggestionBox')!;
  let filteredArray: string[] = [];
  
  const getInput = (event: Event) => {
    userInput = (event.target as HTMLInputElement).value;
    if (userInput === '') {
      filteredArray = [];
      renderSuggestions();
    } else {
      filterArray();
      renderSuggestions();
    }
  };

  const filterArray = () => {
    filteredArray = dataArray.filter((item) =>
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
  
  inputBox.addEventListener('input', getInput);


  let celsius = document.getElementById('celsius')
  const pElement1 = (celsius as HTMLElement).append('19')

  let city = document.getElementById('city')
  const pElement3 = (city as HTMLElement).append('New York')

  let statusOfWeather = document.getElementById('statusOfWeather')
  const pElement2 = (statusOfWeather as HTMLElement).append('Sunny')

  let picture = document.getElementById('pictureOfWeather')
  const svgElement = (picture as HTMLElement).append('')

  let resultParagraphElement = document.getElementById("result-paragraph")!

  let render = (content: string) => {
    resultParagraphElement.innerHTML = content
  }

  const load = async () => {
    let response = await fetch("http://api.weatherapi.com/v1/response.json?key=3bf837af50db4fa3855164954232506&q=bulk")
    let data = await response.json()
  
    
    render(data["info"]["pages"])
  }

  let loadButtonElement = document.getElementById("load")!
  loadButtonElement.addEventListener("click", load)