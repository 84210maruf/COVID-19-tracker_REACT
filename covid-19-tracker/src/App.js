import {
  FormControl, MenuItem, Select
} from '@material-ui/core';
import React from 'react';
import './App.css';


function App() {
  return (
    <div className="app">
      <h1>COVID 19 TRACKER</h1>

      <FormControl className="app_dropdown">
        <Select variant="outlined" value="abc">
          <MenuItem value="worldwide">Worldwide</MenuItem>
          <MenuItem value="worldwide">Worldwide</MenuItem>
          <MenuItem value="worldwide">Worldwide</MenuItem>
          <MenuItem value="worldwide">Worldwide</MenuItem>
        </Select>
      </FormControl>
      
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
