import 'bootstrap/dist/css/bootstrap.min.css'

import ListGroup from 'react-bootstrap/ListGroup'

function Forecast({forecastData}) {
	

	return (
		<ListGroup horizontal className='forecast-container'>
			{forecastData.map(element => {
				return (
					<ListGroup.Item className='forecast-item list'>
						<div>{element.date}</div>
						<img className='condition-icon' src={element.condition}/>
						<div className='min-max'>
							<span className='min-max-text'>Max</span>
							<span>{element.maxTemp}</span>
						</div>
						<div className='min-max'>
							<span className='min-max-text'>Min</span>
							<span>{element.minTemp}</span>
						</div>
					</ListGroup.Item>
				)
			})}
		</ListGroup>
	)
}

export default Forecast