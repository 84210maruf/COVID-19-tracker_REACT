import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './App.css';
import InfoBox from './InfoBox';
import Map from './Map';


function App() {

  
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});

  // For Load the Worldwide cases
  useEffect(() => {
    fetch("https://corona.lmao.ninja/v3/covid-19/all")
    .then((response) => response.json())
    .then((data) => {
      setCountryInfo(data);
    });
  },[]);
  //COVID API
  //https://disease.sh/v3/covid-19/countries
  //https://corona.lmao.ninja/v3/covid-19/countries
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
    // Also Use Tarnary Oparetor
    const onCountryChange = async (event) => {
      const countryCode = event.target.value;
      setCountry(countryCode);
      // ternary working for change the link
      const url = countryCode ==='worldwide' 
      ? 'https://corona.lmao.ninja/v3/covid-19/all' 
      : `https://corona.lmao.ninja/v3/covid-19/countries/${countryCode}`;
      await fetch(url)
      .then(response => response.json())
      .then((data) => {
        setCountry(countryCode);
        // from the country response data
        setCountryInfo(data);
      })
    }
    console.log('Country Info',countryInfo);

  
  return (
    <div className="app">
     
      <div className="app__left">
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
          <InfoBox 
            title="Coronavirus Cases" 
            cases={countryInfo.todayCases} 
            total={countryInfo.cases} />
          <InfoBox 
            title="Recovered"  
            cases={countryInfo.todayRecovered} 
            total={countryInfo.recovered} />
          <InfoBox 
            title="Deaths"  
            cases={countryInfo.todayDeaths} 
            total={countryInfo.deaths} />
        </div>
        {/* Map */}
        <Map/>
      </div>


      <Card className="app__right">    
        <CardContent>
          <h3>Live Case by Country..</h3>
          {/*Table*/}

          <h3>World New Cases</h3>
          {/* Graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
