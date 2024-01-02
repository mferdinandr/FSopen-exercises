import { useState } from 'react';
import SearchBar from './components/SearchBar';
import Countries from './components/Countries';
import axios from 'axios';
import { useEffect } from 'react';
import Country from './components/Country';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState('');
  const [showData, setShowData] = useState([]);

  useEffect(() => {
    axios.get(`${baseUrl}all`).then((response) => setCountries(response.data));
  }, []);

  const handleSearch = (event) => {
    setSearchCountry(event.target.value);
  };

  const countriesToDisplay = searchCountry
    ? countries.filter((country) => {
        return country.name.common
          .toLowerCase()
          .includes(searchCountry.toLowerCase());
      })
    : [];

  const handleShow = (data) => {
    setShowData([data]);
  };

  console.log('countriesToDisplay', countriesToDisplay);

  return (
    <>
      <SearchBar handleSearch={handleSearch}></SearchBar>
      <ul>
        <Countries
          data={countriesToDisplay}
          handleShow={handleShow}
        ></Countries>
      </ul>
      {<Countries data={showData ? showData : []} />}
    </>
  );
}

export default App;
