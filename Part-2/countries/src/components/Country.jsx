const Country = ({countries, weather}) => {
    return (
        <>
            <div>
              <h1>{countries[0].name.common}</h1>
              <p>Capital City: {countries[0].capital}</p>
              <p>Area: {countries[0].area}</p>
              <p>
                <strong>Languages: </strong>
              </p>
              <ul>
                {Object.values(countries[0].languages).map((language) => {
                  return <li key={language}>{language}</li>;
                })}
              </ul>
              <img src={countries[0].flags.png} alt={countries[0].flags.png} />
              <h2>Weather in {countries[0].name.common}</h2>
              {weather ? (
                <>
                  <p>Temperature: {weather.temp_c}°C</p>
                  <p>Wind Speed: {weather.wind_mph}</p>
                  <img
                    src={weather.condition.icon}
                    alt={weather.condition.text}
                  />
                </>
              ) : (
                <p>Loading weather data...</p>
              )}
            </div>
          </>
    )
}

export default Country