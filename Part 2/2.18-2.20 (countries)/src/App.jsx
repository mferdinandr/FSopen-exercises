import SearchBar from './components/SearchBar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Country from './components/Country';
import Countries from './components/Countries';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState('');
  const [showData, setShowData] = useState();

  const handleSearch = (event) => {
    setSearchCountry(event.target.value);
  };

  useEffect(() => {
    axios.get(`${baseUrl}all`).then((response) => setCountries(response.data));
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const countriesToDisplay = searchCountry
    ? countries.filter((country) => {
        return country.name.common
          .toLowerCase()
          .includes(searchCountry.toLowerCase());
      })
    : [];

  useEffect(() => {
    countriesToDisplay.length == 1 && setShowData(countriesToDisplay[0]);
  }, [countriesToDisplay]);

  const handleShow = (data) => {
    //setdata not array
    setShowData(data);
  };

  console.log('countriesToDisplay', countriesToDisplay);
  console.log('showdata', showData);

  return (
    <>
      <SearchBar handleSearch={handleSearch} />
      <Countries
        data={countriesToDisplay}
        v
        handleShow={handleShow}
      ></Countries>
      {showData && <Country data={showData} />}
    </>
  );
}

export default App;
