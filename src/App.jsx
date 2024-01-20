import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Geo } from 'react-bootstrap-icons'

import './App.css'

function App() {

  const [location, setLocation] = useState('')
  const [formData, setFormData] = useState('')

  useEffect(() => {
    fetch(`https://api.weatherapi.com/v1/current.json?key=69c788fac5954f2cb8e94409242001&q=${location}&aqi=no`)
      .then(res => {
        if(!res.ok) {
          throw Error('weather data not available')
        }
        return res.json()
      })
      .then(data => console.log(data))
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
          />
          <Button type='submit'>Submit</Button>
        </Form.Group>        
      </Form>
      <h2>{formData}</h2>
    </>
  )
}

export default App
