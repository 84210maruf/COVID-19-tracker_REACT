import {
  FormControl, MenuItem, Select
} from '@material-ui/core';
import React, { useState } from 'react';
import './App.css';



function App() {
  const [countries, setCountries] = useState([
    'USA','UK','INDIA','BANGLADESH'
  ]);
  
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
