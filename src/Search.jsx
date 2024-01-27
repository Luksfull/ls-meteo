import 'bootstrap/dist/css/bootstrap.min.css'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Geo } from 'react-bootstrap-icons'

import './App.css'

function Search({handleSubmit, handleChange}) {

	return (
		<Form onSubmit={handleSubmit}>
				<Form.Group className='form-group'>
					<Form.Label className='label'><Geo /> Location <Geo /></Form.Label>
					<Form.Control 
						type='text' 
						placeholder='Enter location' 
						id='location'
						name='location'
						onChange={handleChange}
						size='md'
						className='search-bar'
					/>
					<Button type='submit' variant='outline' className='submit-btn'>Submit</Button>
				</Form.Group>        
		</Form>
	)

}

export default Search