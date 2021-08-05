import {
  FormControl, MenuItem, Select
} from '@material-ui/core';
import React, { useState } from 'react';
import './App.css';



function App() {

  
  const [countries, setCountries] = useState(['usa','bd','india']);
  //COVID API
  //https://disease.sh/v3/covid-19/countries
  // useEffect = run a pice of code
  //based on given condition
  

  
  return (
    <div className="app">

      <div className="app__header">
        <h1>COVID 19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value="abc">
            {countries.map((country) => (
              <MenuItem value="{country}">{country}</MenuItem>
            ))}
            
          </Select>
        </FormControl>
      </div>
      
      {/* Header */}
      {/* Title + Select input */}

      {/* InfoBoxs */}
      {/* InfoBoxs */}
      {/* InfoBoxs */}

      {/* Table */}
      {/* Graph */}
      
      {/* Map */}

    </div>
  );
}

export default App;
