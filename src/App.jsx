import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [name, setName] = useState("")
  const [city,setCity] = useState("")
  const [temp,setTemp] = useState()
  const [icon,setIcon] = useState()
  const [humidity,setHumidity] = useState()
  const [wind,setWind] = useState()
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=';
  const apiKey = "&appid=382d37c7986f11736435a3022e041df8"

  const handleSubmit = async(city1)=>{
      const response = await fetch(url+city1+apiKey );
      const result = await response.json(); 
      setWind(result.wind.speed)
 
      setIcon(result.weather[0].icon)
      setCity(result.name)
      setHumidity(result.main.humidity)
      setTemp((result.main.temp -273.15).toFixed(2))

  }

  useEffect(()=>{
    handleSubmit(name || "Quezon City")
  })
  return (
    <>
      <div>

      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`}/>
      <h1>{city}</h1>
      <ul>
        <li>Humidity: {humidity}%</li>
        <li>Wind: {wind}m/s</li>
        <li>Temp: {temp} °C</li>{icon}
        
      </ul>
      <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
      <button onClick={()=>handleSubmit(name)}/>
      </div>
    </>
  )
}

export default App
