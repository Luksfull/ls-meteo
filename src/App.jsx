import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Geo } from 'react-bootstrap-icons'

import Search from './Search'
import CurrentWeather from './CurrentWeather'
import Forecast from './Forecast'

import './App.css'

function App() {

	const [location, setLocation] = useState('')
	const [formData, setFormData] = useState('')
	const [weatherData, setWeatherData] = useState(null)
	const [forecastData, setForecastData] = useState(null)

	useEffect(() => {
		fetch(`https://api.weatherapi.com/v1/forecast.json?key=69c788fac5954f2cb8e94409242001&q=${location}&days=3&aqi=no&alerts=no`)
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
				const forecast = data.forecast.forecastday.map(element => {
					return {
						date: new Date(element.date_epoch *1000).toDateString(),
						condition: element.day.condition.icon,
						maxTemp: element.day.maxtemp_c,
						minTemp: element.day.mintemp_c
					}
				})
				setWeatherData(weather)
				setForecastData(forecast)
		})
	}, [formData])

	console.log(forecastData)

	const handleSubmit = e => {
		e.preventDefault()
		setFormData(location)
	}

	const handleChange = e => {
		setLocation(e.target.value)
	}

	return (
		<div className='body'>
			<Search 
				handleChange={handleChange}
				handleSubmit={handleSubmit}
			/>      
			{weatherData && 
				<CurrentWeather
					weatherData={weatherData}
				/>
			}
			{forecastData && 
				<Forecast 
					forecastData={forecastData}
				/>
			}
		</div>
	)
}

export default App
