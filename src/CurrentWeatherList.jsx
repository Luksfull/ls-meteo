import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import ListGroup from 'react-bootstrap/ListGroup'

import './App.css'

function CurrentWeatherList({weatherData}) {
	return (
		<ListGroup>
			<ListGroup.Item className='list-color'><span>{weatherData.location}</span><span>{weatherData.date}</span></ListGroup.Item>
			<ListGroup.Item className='list-color'>Temperature is {weatherData.temperatureCelsius} °C</ListGroup.Item>
			<ListGroup.Item className='list-color'>Feels like {weatherData.feelsLike} °C</ListGroup.Item>
			<ListGroup.Item className='list-color'>
				{weatherData.condition}
				<img className='condition-icon' src={`${weatherData.conditionIcon}`} />
			</ListGroup.Item>
			<ListGroup.Item className='list-color'>Sunrise: {weatherData.sunrise} / Sunset: {weatherData.sunset}</ListGroup.Item>
			<ListGroup.Item className='list-color'>{weatherData.windKph} km/h wind, direction {weatherData.windDir}</ListGroup.Item>
		</ListGroup>
	)
}

export default CurrentWeatherList