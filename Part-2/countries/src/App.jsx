import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState([]);
  const [countries, setCountries] = useState([]);

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

  const handleChange = (e) => {
    if (e.target.value.length > 0) {
      setValue(e.target.value);
    } else {
      setValue("");
    }
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
          countries?.map((country) => {
            return <p key={country.name.common}>{country.name.common}</p>;
          })
        ) : (
          <>
          <div>
          <h1>{countries[0].name.common}</h1>
          <p>Capital City: {countries[0].capital}</p> 
          <p>Area: {countries[0].area}</p> 
          <p><strong>Languages: </strong></p>
          <ul>
            {Object.values(countries[0].languages).map((language) => {
              return <li>{language}</li>
            })}
          </ul>
          <img src={countries[0].flags.png} alt={countries[0].flags.png} />

          </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
