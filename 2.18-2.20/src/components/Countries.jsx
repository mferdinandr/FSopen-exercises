const Countries = ({ data }) => {
  if (data.length > 10) {
    return <li>To many mactches, specify another filter</li>;
  } else {
    return data.map((country) => (
      <li key={country.name.common}>{country.name.common}</li>
    ));
  }
};

export default Countries;
