import './App.css';
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const api = {
  key: "8e00164b629db34b2848c86dcf9ebf5c",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [search, setSearch] = useState("")
  const [weather, setWeather] = useState({})

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&lang=it&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result)
      })
  }

  return (

    <div className="App wrapper">
      <header className="App-header">
        <h1 className='h-100 w-100'>Rainbow WeatherMap</h1>

        {/* Search Box*/}
        <div className='row mt-3'>
            <input type="text" className='form-control h-100 w-100' placeholder="Inserisci città..." onChange={(citta) => setSearch(citta.target.value)}></input>

            <button className="btn btn-primary mt-4 h-100 w-100" onClick={searchPressed}>Cerca</button>
        </div>

        {/*Condizione tale*/}
        {typeof weather.main !== "undefined" ? (
          <div>
            {/*Città*/}
            <p className='mt-3'> {weather.name}, {weather.main.temp} °C</p>

            {/*Temperatura*/}
            <p>Max: {weather.main.temp_max} °C</p>
            <p>Min: {weather.main.temp_min} °C</p>
            <img id="image" src={"https://openweathermap.org/img/w/" + weather.weather[0].icon + ".png"} />

            {/*Condizioni meteo (sole, pioggia,...)*/}
            <p>{date}: {weather.weather[0].main}, {weather.weather[0].description}</p>

            {/*Condizione che verifica in base alla condizione meteo la proposizione
            da aggiungere come consiglio per l'utente*/}
            {weather.weather[0].main === "Clear" ?
                (<p>Giornata perfetta per fare una corsetta!</p>) : 
                (weather.weather[0].main === "Rain" || weather.weather[0].main === "Clouds") ?
                (<div>Si consiglia di prendere su un ombrello.</div>) :
                (<div>Un giorno senza sorriso è un giorno perso.</div>)
            }
          </div>
        ) : (
          <div className='row mt-3'>
            <p>Prova a cercare qualcosa!</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
