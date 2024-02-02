import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import { useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import { GEO_API_URL, geoApiOptions } from './GeoApi'

function Search({onSearchChange}) {
	
	const [search, setSearch] = useState(null)

	const loadOptions = (inputValue) => {
		return fetch (`${GEO_API_URL}/cities?minPopulation=40000&namePrefix=${inputValue}`, geoApiOptions)
				.then(res => res.json())
				.then(res => {
					return {
						options: res.data.map(city => {
							return {
								label: `${city.name}, ${city.countryCode}`,
							}
						})
					}
				})
				.catch(err => console.error(err))
	}

	const handleChange = (searchData) => {
		setSearch(searchData)
		onSearchChange(searchData)
		setSearch(null)
	}

	const customStyles = {
		control: (provided, state) => ({
			...provided,
			borderRadius: '8px',
		}),
		option: (provided, state) => ({
			...provided,
			backgroundColor: state.isFocused ? '#828991' : null,
			color: state.isFocused ? '#FAF5FF' : null,
		})
	}

	return (
		<AsyncPaginate
		  styles={customStyles}
			className='search-bar'
			placeholder='Search for location'
			debounceTimeout={500}
			value={search}
			onChange={handleChange}
			loadOptions={loadOptions}
		/>
	)

}

export default Search


