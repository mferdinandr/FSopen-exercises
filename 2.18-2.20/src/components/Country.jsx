const Country = ({ data }) => {
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
      </div>
    );
  });
};

export default Country;
