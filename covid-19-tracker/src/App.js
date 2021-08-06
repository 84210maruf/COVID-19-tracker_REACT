import {
  FormControl, MenuItem, Select
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './App.css';
import InfoBox from './InfoBox';
{/*InfoBox From metrial UI*/}



function App() {

  
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  //COVID API
  //https://disease.sh/v3/covid-19/countries
  //https://disease.sh/v3/covid-19/countries
  // useEffect = run a pice of code
  //based on given condition
  useEffect(() => {
      // async -> Sent a request, wait fo it, do somthing with it
      //
      const getCountriesData = async () => {
        await fetch("https://corona.lmao.ninja/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          
          const countries = data.map((country) => (
            {
              name: country.country,                    //india ,bangladesh,unitedStat
              value: country.countryInfo.iso3,          //UK,USA,BD
            }
            ));
            setCountries(countries);
            // console.log(this);
        });
  
      };
       getCountriesData();
      
    }, []);

    // For SELECT Dropdown Item for target...

    const onCountryChange = async (event) => {
      const countryCode = event.target.value;
      console.log("YOOOO >>>>", countryCode);
      setCountry(countryCode);
    }

  
  return (
    <div className="app">

      {/* Header */}
      {/* Title + Select input */}
      <div className="app__header">
        <h1>COVID 19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country} >
          <MenuItem value="worldwide">worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
            
          </Select>
        </FormControl>
      </div>

      {/* InfoBoxes */}
      <div className="app__status">
        <InfoBox title="Coronavirus Cases" cases={123} total={2000} />
        <InfoBox title="Recovered"  cases={123} total={2000} />
        <InfoBox title="Deaths"  cases={123} total={2000} />
      </div>


      {/* Table */}
      {/* Graph */}
      
      {/* Map */}

    </div>
  );
}

export default App;
