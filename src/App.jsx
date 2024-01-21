import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Geo } from 'react-bootstrap-icons'

import './App.css'

function App() {

  const [location, setLocation] = useState('')
  const [formData, setFormData] = useState('')
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=69c788fac5954f2cb8e94409242001&q=${location}&aqi=no&alerts=no`)
      .then(res => {
        if(!res.ok) {
          throw Error('weather data not available')
        }
        return res.json()
      })
      .then(data => {
        console.log(data)
        const weather = {
          location: data.location.name,
          date: new Date(data.forecast.forecastday[0].date_epoch * 1000).toDateString(),
          condition: data.current.condition.text,
          sunrise: data.forecast.forecastday[0].astro.sunrise,
          sunset: data.forecast.forecastday[0].astro.sunset,
          conditionIcon: data.current.condition.icon,
          temperatureCelsius: data.current.temp_c,
          feelsLike: data.current.feelslike_c,
          windKph: data.current.wind_kph,
          windDir: data.current.wind_dir,
        }
        setWeatherData(weather)
    })
  }, [formData])

  const handleSubmit = e => {
    e.preventDefault()
    setFormData(location)
  }

  const handleChange = e => {
    setLocation(e.target.value)
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='form-group'>
          <Form.Label><Geo /> Location <Geo /></Form.Label>
          <Form.Control 
            type='text' 
            placeholder='Enter location' 
            id='location'
            name='location'
            onChange={handleChange}
            size='md'
          />
          <Button type='submit' variant='outline-info'>Submit</Button>
        </Form.Group>        
      </Form>
      {weatherData && 
        <div>
          <div>{weatherData.location}</div>
          <div>{weatherData.date}</div>
          <div>Temperature is {weatherData.temperatureCelsius} °C</div>
          <div>Feels like {weatherData.feelsLike} °C</div>
          <div>
             {weatherData.condition}
            <img src={`${weatherData.conditionIcon}`} />
          </div>
          <div>Sunrise: {weatherData.sunrise} / Sunset: {weatherData.sunset}</div>
          <div>{weatherData.windKph} km/h wind, direction {weatherData.windDir}</div>
        </div>
      }
    </>
  )
}

export default App
