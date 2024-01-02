import Country from './Country';

const Countries = ({ data, handleShow }) => {
  if (data.length > 10) {
    return <li>To many mactches, specify another filter</li>;
  } else if (data.length == 1) {
    return <Country data={data} />;
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
