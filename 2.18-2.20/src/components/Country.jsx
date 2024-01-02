import { useState, useEffect } from 'react';
import axios from 'axios';
import CountryWeather from './CountryWeather';

const Country = ({ data }) => {
  const [weather, setWeather] = useState([]);

  const styleUl = {
    paddingLeft: '0',
  };

  const styleLi = {
    marginLeft: '20px',
  };

  const styleFlag = {
    marginTop: '1.5em',
    width: '25%',
    border: '1px solid black',
  };

  const capital = data.map((country) => country.capital);

  useEffect(() => {
    const api_key = import.meta.env.VITE_SOME_KEY;
    //210e18024d6bf3315eff1699c88fedde
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital[0]}&appid=${api_key}`
      )
      .then((res) => setWeather(res.data));
  }, [capital]);

  console.log('weather', weather);
  console.log('capital', capital);

  return data.map((country, i) => {
    return (
      <div key={i}>
        <h2>{country.name.common}</h2>
        <p>Capital : {country.capital}</p>
        <p>Area : {country.area}</p>
        <ul style={styleUl}>
          <h3>Langauges</h3>
          {Object.keys(country.languages).map((key) => {
            return (
              <li key={key} style={styleLi}>
                {country.languages[key]}
              </li>
            );
          })}
        </ul>
        <img
          src={country.flags.png}
          alt={country.flags.alt}
          style={styleFlag}
        />
        <CountryWeather countryWeather={weather}></CountryWeather>
      </div>
    );
  });
};

export default Country;
