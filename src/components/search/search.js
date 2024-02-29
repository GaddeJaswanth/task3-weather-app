import { useState } from 'react';
import { GEO_API_URL, geoApiOptions } from '../../api';
import {AsyncPaginate} from 'react-select-async-paginate';
const Search = ({onSearchChange}) => {
    const [search, setSearch] = useState(null);

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    const loadOptions = (inputValue) => {
        return fetch(`${GEO_API_URL}?minPopulation=100000&namePrefix=${inputValue}`, geoApiOptions)
        .then((response) => response.json()).then((response)=>{
            return {
                options: response.data.map((city)=>{
                    return {
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name}, ${city.country}`,
                    }
                })
            }
        }).catch((error)=>console.log(error));
    }

    return (
        <AsyncPaginate
        placeholder="Search for City" debounceTimeout={600}
        value={search} onChange={handleOnChange}
        loadOptions={loadOptions}
        />
    )
}
export default Search;