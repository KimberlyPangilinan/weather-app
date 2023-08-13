import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('Quezon City');
  const [city, setCity] = useState('');
  const [temp, setTemp] = useState();
  const [icon, setIcon] = useState();
  const [humidity, setHumidity] = useState();
  const [wind, setWind] = useState();
  const [error, setError] = useState(null);
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=';
  const apiKey = '&appid=382d37c7986f11736435a3022e041df8';

  const handleSubmit = async (cityName) => {
    try {
      const response = await fetch(url + cityName + apiKey);

      if (response.ok) {
        const result = await response.json();
        setWind(result.wind.speed);
        setIcon(result.weather[0].icon);
        setCity(result.name);
        setHumidity(result.main.humidity);
        setTemp((result.main.temp - 273.15).toFixed(2));
        setError(null);
      } else {
        setError(`Error finding ${cityName}`);
      }
    } catch (error) {
      setError('An error occurred');
    }
  };

  useEffect(() => {
    handleSubmit(name);
  }, []);

  return (
    <>
      <div>
        {error && <p>{error}</p>}
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather Icon" />
        <h1>{city}</h1>
        <ul>
          <li>Humidity: {humidity}%</li>
          <li>Wind: {wind}m/s</li>
          <li>Temp: {temp} °C</li>
        </ul>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={() => handleSubmit(name)}>Search</button>
      </div>
    </>
  );
}

export default App;
