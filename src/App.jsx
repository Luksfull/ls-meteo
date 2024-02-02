import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import { GeoAltFill } from 'react-bootstrap-icons'

import { WEATHER_API_URL, weatherApiOptions } from './WeatherApi';
import Search from './Search'
import CurrentWeather from './CurrentWeather'
import Forecast from './Forecast'

import './App.css'

function App() {

	const [location, setLocation] = useState('')
	const [weatherData, setWeatherData] = useState(null)
	const [forecastData, setForecastData] = useState(null)

	const [isClicked, setIsClicked] = useState(false)

	useEffect(() => {
		fetch(`${WEATHER_API_URL}&q=${location}&days=3&aqi=no&alerts=no`, weatherApiOptions)
			.then(res => res.json())
			.then(data => {
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
						minTemp: element.day.mintemp_c,
						hour: element.hour.map(element => {
							return {
								time: element.time,
								temperatureCelsius: element.temp_c,
								condition: element.condition.icon,
								rainChance: element.chance_of_rain
							}
						})
					}
				})
				setWeatherData(weather)
				setForecastData(forecast)
		})
		.catch(err => console.error(err))
	}, [location])

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setLocation(`${position.coords.latitude},${position.coords.longitude}`)
				}
			)
		} else {
			console.error('Geolocation is not supported in this browser')
		}
	}, [isClicked])

	const handleClick = () => {
		setIsClicked(prevValue => !prevValue)
	}

	const handleSearchChange = (searchData) => {
		setLocation(searchData.label)
	}

	return (
		<div className='body'>
			<h4 className='brand'>Meteo-gray</h4>
			<GeoAltFill onClick={handleClick} className='get-location-btn'/>
			<Search 
				onSearchChange={handleSearchChange}
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


