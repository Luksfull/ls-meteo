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
    fetch(`https://api.weatherapi.com/v1/current.json?key=69c788fac5954f2cb8e94409242001&q=${location}&aqi=no`)
      .then(res => {
        if(!res.ok) {
          throw Error('weather data not available')
        }
        return res.json()
      })
      .then(data => {
        // console.log(data)
        const weather = {
          location: data.location.name,
          date: data.location.localtime,
          temperatureCelsius: data.current.temp_c,
          feelsLike: data.current.feelslike_c
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
        <Form.Group>
          <Form.Label><Geo /> Location <Geo /></Form.Label>
          <Form.Control 
            type='text' 
            placeholder='Enter location' 
            id='location'
            name='location'
            onChange={handleChange}
            size='md'
          />
          <Button type='submit'>Submit</Button>
        </Form.Group>        
      </Form>
      {weatherData && 
        <div>
          <div>Location is {weatherData.location}</div>
          <div>Date is {weatherData.date}</div>
          <div>Temperature is {weatherData.temperatureCelsius}</div>
          <div>Feels like {weatherData.feelsLike}</div>
        </div>
      }
    </>
  )
}

export default App
