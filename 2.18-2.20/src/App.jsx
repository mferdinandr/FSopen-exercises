import { useState } from 'react';
import SearchBar from './components/SearchBar';
import axios from 'axios';
import { useEffect } from 'react';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchCountrie, setSearchCountrie] = useState('');
  const [countrieResult, setCountrieResult] = useState([]);

  useEffect(() => {
    axios.get(`${baseUrl}all`).then((response) => setCountries(response.data));
  }, []);

  const handleSearch = (event) => {
    const url = `${baseUrl}/name/${event.target.value}`;
    axios
      .get(url)
      .then((response) => setCountrieResult(response.data.name.common));
  };

  return (
    <>
      {/* <ul>{countries.map((countrie) => console.log(countrie.name.common))}</ul> */}
      <SearchBar handleSearch={handleSearch}></SearchBar>
      <ul>
        <li>{countrieResult}</li>
      </ul>
    </>
  );
}

export default App;
