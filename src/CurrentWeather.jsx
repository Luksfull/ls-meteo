import 'bootstrap/dist/css/bootstrap.min.css'

import ListGroup from 'react-bootstrap/ListGroup'

import './App.css'

function CurrentWeather({weatherData}) {
	return (
		<ListGroup className='list'>
			<ListGroup.Item className='list-item column'>
				<span>{weatherData.location}</span>
				<span>{weatherData.date}</span>
			</ListGroup.Item>
			<ListGroup.Item className='list-item'>Temperature is {weatherData.temperatureCelsius} °C</ListGroup.Item>
			<ListGroup.Item className='list-item'>Feels like {weatherData.feelsLike} °C</ListGroup.Item>
			<ListGroup.Item className='list-item'>
				{weatherData.condition}
				<img className='condition-icon' src={`${weatherData.conditionIcon}`} />
			</ListGroup.Item>
			<ListGroup.Item className='list-item sun-item'><span className='sun'>Sunrise: {weatherData.sunrise}</span><span className='sun'>Sunset: {weatherData.sunset}</span></ListGroup.Item>
			<ListGroup.Item className='list-item'>{weatherData.windKph} km/h wind, direction {weatherData.windDir}</ListGroup.Item>
		</ListGroup>
	)
}

export default CurrentWeather