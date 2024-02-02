import 'bootstrap/dist/css/bootstrap.min.css'

import ListGroup from 'react-bootstrap/ListGroup'
import Dropdown from 'react-bootstrap/Dropdown'

function Forecast({forecastData}) {
	

	return (
		<>
			{forecastData.map(element => {
				return (
					<Dropdown className='forecast-container'>
						<Dropdown.Toggle className='forecast-item list'>
							<div className='forecast-date'>{element.date.slice(0, -4)}</div>
							<img className='condition-icon' src={element.condition}/>
							<div className='min-max-container'>
								<div className='min-max'>
									<span className='min-max-text'>Max</span>
									<span className='min-max-value'>{element.maxTemp}°</span>
								</div>
								<div className='min-max'>
									<span className='min-max-text'>Min</span>
									<span className='min-max-value'>{element.minTemp}°</span>
								</div>
							</div>
						</Dropdown.Toggle>
						<Dropdown.Menu className='hour-forecast-container'>
							{element.hour.map(hour => (
								<Dropdown.ItemText className='hour-forecast-item'>
									<span>{hour.time.slice(-5)}</span>
									<img src={hour.condition} className='hour-condition' />
									<span>💧{hour.rainChance}%</span>
									<span className='hour-temp'>{hour.temperatureCelsius}°</span>
								</Dropdown.ItemText>
							))}
						</Dropdown.Menu>
					</Dropdown>
				)
			})}
		</>
	)
}

export default Forecast
