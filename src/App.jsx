import axios from 'axios'
import { useEffect, useState } from 'react';
import './App.css'
import Loading from './components/Loading';
import WeatherCard from './components/WeatherCard';

function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()

  const success = pos => {
    const obj = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    }
    setCoords(obj)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, [])

  useEffect(() => {
    if (coords) {
      const APIKEY = 'c51c82d3913d43ae76f8ca5465c3bf10'
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`

      axios.get(URL)
        .then(result => {
          const celsius = parseInt(result.data.main.temp - 273.15)
          const fahrenheit = parseFloat(celsius * 9 / 5 + 32).toFixed(2)
          setTemperature({ celsius, fahrenheit })
          setWeather(result.data)
        })
        .catch(err => console.log(err))
    }
  }, [coords])

  return (
    <div className="App">
      {
        weather
          ?
          <WeatherCard weather={weather} temperature={temperature} />
          :
          <Loading />
      }
    </div>
  )
}

export default App
