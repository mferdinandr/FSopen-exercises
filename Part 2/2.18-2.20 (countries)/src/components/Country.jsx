import { useState, useEffect } from 'react';
import axios from 'axios';
import CountryWeather from './CountryWeather';

// data = object
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
    width: '15%',
    border: '1px solid black',
  };

  useEffect(() => {
    const api_key = import.meta.env.VITE_SOME_KEY;
    //210e18024d6bf3315eff1699c88fedde
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${data.capital}&appid=${api_key}`
      )
      .then((res) => setWeather(res.data));
  }, [data.capital]);

  return (
    <>
      <h1>{data.name.common}</h1>
      <p>Capital : {data.capital}</p>
      <p>Area : {data.area}</p>
      <ul style={styleUl}>
        <h3>Languages</h3>
        {Object.keys(data.languages).map((key) => {
          return (
            <li key={key} style={styleLi}>
              {data.languages[key]}
            </li>
          );
        })}
      </ul>
      <img src={data.flags.png} alt={data.flags.alt} style={styleFlag} />
      <CountryWeather countryWeather={weather}></CountryWeather>
    </>
  );
};
export default Country;
