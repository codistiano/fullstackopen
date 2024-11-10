import { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";
import Country from "./components/Country";

const App = () => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState([]);
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState("");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => {
        console.log("Data Imported!");
        setResult(res.data);
      })
      .catch((err) => {
        console.error("An error occurred while fetching!");
      });
  }, []);

  useEffect(() => {
    const countriesFiltered = result?.filter((countries) => {
      return countries.name.common.toLowerCase().includes(value.toLowerCase());
    });

    setCountries(countriesFiltered);
  }, [value]);

  useEffect(() => {
    if (countries.length === 1) {
      const capital = countries[0]?.capital[0];
      weatherDetail(capital);
    }
  }, [countries]);

  const handleChange = (e) => {
    if (e.target.value.length > 0) {
      setValue(e.target.value);
    } else {
      setValue("");
    }
  };

  const displayDetail = (countryName) => {
    setValue(countryName);
    const selectedCountry = result.find(
      (country) => country.name.common === countryName
    );
    if (selectedCountry) {
      weatherDetail(selectedCountry.capital);
    }
  };

  const weatherDetail = (capital) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${capital}&aqi=no`
      )
      .then((res) => {
        setWeather(res.data.current);
      })
      .catch((err) => {
        console.error("Failed to fetch weather data");
      });
  };

  return (
    <div>
      <h1>Countries</h1>
      <form>
        <input value={value} onChange={handleChange} />
      </form>
      <br />
      <div>
        {countries.length > 10 ? (
          <p>Too many matches, specify another filter!</p>
        ) : (countries.length >= 2 && countries?.length <= 10) ||
          countries.length === 0 ? (
          <Countries displayDetail={displayDetail} countries={countries} />
        ) : (
          <Country countries={countries} weather={weather} />
        )}
      </div>
    </div>
  );
};

export default App;
