import {useState} from 'react';
import './index.css';


const api = {
  key: "7df42336ed3f4cd8e98e2c3a198255cc",
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');
  const [error, setError] = useState(false);

  const search = (e) => {
    if (e.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res =>{
          if (!res.ok){
            throw Error('Network response was not ok');
          }
          return res.json();
        }) 
        .then(result =>{
          setWeather(result);
          setQuery('');
          console.log(weather)
          setError(false);
        })
        .catch(err => {
          console.log(err);
          setError(true);
        })      
    }
  }

  const dataBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August",
      "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Sunday"];

    let day = days[d.getDay()];
     let date = d.getDate();
    let month = months[d.getMonth()];

    let year = d.getFullYear();
 
    return `${day} ${date} ${month} ${year}`
      
  }

  return (
    <div className={
      (typeof weather.main !== "undefined")
        ? (weather.main.temp <= 23
          ? "App rain"
          : weather.main.temp <= 29
            ? "App"
            : "App hot")
        : "App"
    }>
      <main>:
          <div className="search-box">
            <input
            type="text"
            className='search-bar'
            placeholder='Search..'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress = {search}
            />
          </div>

          { (typeof weather.main !== "undefined") ? (
            <div>
               <div className="location-box">
                  <p>{ error }</p>
                  <div className="location"> {weather.name}, {weather.sys.country} </div>
                  <div className="date">{ dataBuilder (new Date())}</div>
                </div>

                <div className="weather-box">
                   <div className="temp">
                    {Math.round(weather.main.temp)}°c
                   </div>
                  <div className="weather">{ weather.weather[0].main }</div>
                </div>
            </div>
          ): ('')}
      </main>
    </div>
  );
}

export default App;
