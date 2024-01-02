const Countries = ({ data, handleShow }) => {
  console.log('countries show data', data);

  // == 1 return null
  // > 1-10 country list
  // > 10 to match
  if (data.length > 10) {
    return <li>To many mactches, specify another filter</li>;
  } else if (data.length == 1) {
    return null;
  } else {
    return data.map((country) => (
      <div key={country.name.cca2}>
        <li>{country.name.common}</li>
        <button onClick={() => handleShow(country)}>show</button>
      </div>
    ));
  }
};

export default Countries;
