import 'bootstrap/dist/css/bootstrap.min.css'

import ListGroup from 'react-bootstrap/ListGroup'

function Forecast({forecastData}) {
	

	return (
		<ListGroup horizontal className='forecast-container'>
			{forecastData.map(element => {
				return (
					<ListGroup.Item className='forecast-item list'>
						<div className='forecast-date'>{element.date}</div>
						<img className='condition-icon' src={element.condition}/>
						<div className='min-max-container'>
							<div className='min-max'>
								<span className='min-max-text'>Max</span>
								<span className='min-max-value'>{element.maxTemp}</span>
							</div>
							<div className='min-max'>
								<span className='min-max-text'>Min</span>
								<span className='min-max-value'>{element.minTemp}</span>
							</div>
						</div>
					</ListGroup.Item>
				)
			})}
		</ListGroup>
	)
}

export default Forecast