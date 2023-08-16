import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('Quezon City');
  const [city, setCity] = useState('Quezon City');
  const [temp, setTemp] = useState();
  const [time, setTime] = useState();
  const [icon, setIcon] = useState();
  const [humidity, setHumidity] = useState();
  const [wind, setWind] = useState();
  const [desc, setDesc] = useState();
  const [error, setError] = useState(null);
  const [forecastResults,setForecastResults] = useState([])
  const [country,setCountry] = useState('PH')
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=';
  const url2 = 'https://api.openweathermap.org/data/2.5/forecast?q=';
  const apiKey = '&appid=382d37c7986f11736435a3022e041df8';

  const handleSubmit = async (cityName) => {
    try {
      const response = await fetch(url + cityName + apiKey);
      const response2 = await fetch(url2 + cityName + apiKey);
      
      console.log(countryDisplayName);
      if (response.ok) {
        const result = await response.json();
        const result2 = await response2.json();
        setWind(result.wind.speed);
        setIcon(result.weather[0].icon);
        setCity(result.name);
        setHumidity(result.main.humidity)
        setDesc(result.weather[0].description)
        setTemp((result.main.temp - 273.15).toFixed(2));
        setCountry(result.sys.country)
        setError(null);
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
  const countryDisplayName = regionNames.of(country);
 
  return (
    <>
      <header>
      <span>Weather App</span>
        <div className="search">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <button onClick={() => handleSubmit(name)}>Search</button>
        </div>
      </header>
       
      
       <div className="results">
        <div className='main'>
        {error && <p>{error}</p>}     
        <div className="header">
          <h1>{city},  <br/> {countryDisplayName}</h1>
          <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather Icon" />
        </div>
        <p>{desc}</p>
        <div className="details">
          <span>{temp } °C</span>
          <ul>
           <li>Humidity: {humidity}%</li>
           <li>Wind: {wind}m/s</li>
       </ul>
        </div>
         
        
        </div>
  
        <div className='forecast'>
        {forecastResults!=0 && forecastResults.slice(0,5).map((item) => (
        <div key={item.dt} className='item'>
        <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} width={48} alt="Weather Icon" />
        <ul>
        <li>{ item.dt_txt.split(" ")[1]}</li>
          <li>Temperature: {(item.main.temp  - 273.15).toFixed(2)} &#8451;</li>
         <li>Pressure: {item.main.pressure} hPa</li>
          <li>Humidity: {item.main.humidity}%</li>
        </ul>
         
          {/* You can add more details here as needed */}
        </div>
      ))}
        </div>
       </div>
      
       
     
    </>
  );
}

export default App;
