import { useState } from 'react';
import SearchBar from './components/SearchBar';
import Countries from './components/Countries';
import axios from 'axios';
import { useEffect } from 'react';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState('');

  useEffect(() => {
    axios.get(`${baseUrl}all`).then((response) => setCountries(response.data));
  }, []);

  const handleSearch = (event) => {
    setSearchCountry(event.target.value);
  };

  const countriesToDisplay =
    searchCountry &&
    countries.filter((country) => {
      return country.name.common
        .toLowerCase()
        .includes(searchCountry.toLowerCase());
    });

  return (
    <>
      <SearchBar handleSearch={handleSearch}></SearchBar>
      <Countries data={countriesToDisplay}></Countries>
    </>
  );
}

export default App;
