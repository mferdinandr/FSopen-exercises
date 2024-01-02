const CountryWeather = ({ countryWeather }) => {
  const style = {
    backgroundColor: 'black',
  };

  return (
    <>
      {countryWeather.main && (
        <>
          <h2>Weather in {countryWeather.name}</h2>
          <p>{(countryWeather.main.feels_like - 273.15).toFixed(2)} Celcius</p>
          <img
            src={`https://openweathermap.org/img/wn/${countryWeather.weather.map(
              (icon) => icon.icon
            )}@2x.png`}
            style={style}
          />
        </>
      )}
    </>
  );
};

export default CountryWeather;
