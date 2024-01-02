const CountryWeather = ({ countryWeather }) => {
  const style = {
    backgroundColor: 'black',
  };

  console.log('weather', countryWeather);

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
          <p>Wind : {countryWeather.wind.speed}m/s</p>
        </>
      )}
    </>
  );
};

export default CountryWeather;
