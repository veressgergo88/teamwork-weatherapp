let load = async () => {
  let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=04e4c702cf3b4efc921170534232706&q=${city}&days=3&aqi=no&alerts=no`)
  let data: String[] = await response.json()

  return data
}
  
load()

let city: string

/* let load2 = async () => {
  let response = await fetch("http://api.weatherapi.com/v1/forecast.json")
  let data: String[] = await response.json()
  
  return data
}
    
load2()

let load3 = async () => {
  let response = await fetch("http://api.weatherapi.com/v1/history.json")
  let data: String[] = await response.json()
  
  return data
}
    
load3() */

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
  const inputBox = document.querySelector<HTMLDivElement>('.inp')!;
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
  const pElement1 = (celsius as HTMLElement).append('19°')

  let cityx = document.getElementById('city')
  const pElement3 = (cityx as HTMLElement).append('New York')

  let statusOfWeather = document.getElementById('statusOfWeather')
  const pElement2 = (statusOfWeather as HTMLElement).append('Sunny')

  let picture = document.getElementById('pictureOfWeather')
  const svgElement = (picture as HTMLElement).append('')

  let resultParagraphElement = document.getElementById("result-paragraph")!


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
