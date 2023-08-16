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


export const handleSubmit = async (cityName) => {
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
