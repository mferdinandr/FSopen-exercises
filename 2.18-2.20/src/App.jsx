import { useState } from 'react';
import SearchBar from './components/SearchBar';
import axios from 'axios';
import { useEffect } from 'react';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchCountrie, setSearchCountrie] = useState('');

  useEffect(() => {
    axios.get(`${baseUrl}all`).then((response) => setCountries(response.data));
  }, []);

  const handleSearch = (event) => {
    setSearchCountrie(event.target.value);
    console.log(
      countries.filter((countrie) => {
        countrie.includes(searchCountrie);
      })
    );
  };

  return (
    <>
      <ul>{countries.map((countrie) => console.log(countrie.name.common))}</ul>
      <SearchBar handleSearch={handleSearch}></SearchBar>
    </>
  );
}

export default App;
