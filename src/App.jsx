import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('Quezon City');
  const [city, setCity] = useState('');
  const [temp, setTemp] = useState();
  const [time, setTime] = useState();
  const [icon, setIcon] = useState();
  const [humidity, setHumidity] = useState();
  const [wind, setWind] = useState();
  const [error, setError] = useState(null);
  const [forecastResults,setForecastResults] = useState([])
  const [weatherResults,setWeatherResults] = useState([])
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=';
  const url2 = 'https://api.openweathermap.org/data/2.5/forecast?q=';
  const apiKey = '&appid=382d37c7986f11736435a3022e041df8';

  const handleSubmit = async (cityName) => {
    try {
      const response = await fetch(url + cityName + apiKey);
      const response2 = await fetch(url2 + cityName + apiKey);

      if (response.ok) {
        const result = await response.json();
        const result2 = await response2.json();
        setWind(result.wind.speed);
        setIcon(result.weather[0].icon);
        setCity(result.name);
        setHumidity(result.main.humidity)
        setTemp((result.main.temp - 273.15).toFixed(2));
        setError(null);
        setWeatherResults(result.sys)
        setForecastResults(result2.list)
       console.log(result)
      } else {
        setError(`Error finding ${cityName}`);
      }
    } catch (error) {
      setError('An error occurred');
      console.log(error)
    }
  };

  useEffect(() => {
    handleSubmit(name);
  }, []);

  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
  const countryDisplayName = regionNames.of(weatherResults.country);
  console.log(countryDisplayName);
  return (
    <>
      <div>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={() => handleSubmit(name)}>Search</button>
       
        <ul>
        {error && <p>{error}</p>}
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather Icon" />
        <h1>{city},  {countryDisplayName}</h1>
          <li>Humidity: {humidity}%</li>
          <li>Wind: {wind}m/s</li>
          <li>Temp: {temp } °C</li>
        </ul>
  
        <div style={{display:'flex', gap:40}}>
        {forecastResults!=0 && forecastResults.slice(0,5).map((item) => (
        <div key={item.dt}>
        <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} width={48} alt="Weather Icon" />
          <p>{ item.dt_txt.split(" ")[1]}</p>
          <p>Temperature: {(item.main.temp  - 273.15).toFixed(2)} &#8451;</p>
          <p>Pressure: {item.main.pressure} hPa</p>
          <p>Humidity: {item.main.humidity}%</p>
          {/* You can add more details here as needed */}
        </div>
      ))}
        </div>
       
      </div>
    </>
  );
}

export default App;
