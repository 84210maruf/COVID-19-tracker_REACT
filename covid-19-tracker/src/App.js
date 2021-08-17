import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select
} from "@material-ui/core";
import axios from "axios";
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from "react";
import "./App.css";
import InfoBox from "./InfoBox";
import LineGraph from "./LineGraph";
import Map from "./Map";
import Tables from "./Tables";
import { sortData } from "./util";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  const [countrySlug, setCountrySlug] = useState("bangladesh");
  const [coronaCountArr, setCoronaCountArr] = useState({});
  const [coronaDateArr, setCoronaDateArr] = useState({});

  const [mapCenter, setMapCenter] = useState({lat:34.8074, lng: -40.4796});
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);

  const getCountryReportByDateRang = (CountrySlug, from, to) => {
    console.log(countrySlug);
    axios
      .get(
        `https://api.covid19api.com/country/${CountrySlug}/status/confirmed?from=${from}T00:00:00Z&to=${to}T00:00:00Z`
      )
      .then((res) => {
        console.log("ByCountry", res);

        const yAxisCoronaCount = res.data.map((d) => d.Cases);
        const xAxisDateCount = res.data.map((d) => d.Date);
        setCoronaCountArr(yAxisCoronaCount);
        setCoronaDateArr(xAxisDateCount);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const formatDate = (date) => {
    const d = new Date(date);
    //2020-05-04;
    const year = d.getFullYear();
    const month = `0${d.getMonth() + 1}`.slice(-2); //12->012->12
    const _date = d.getDate();
    return `${year}-${month}-${_date}`;
  };

  //For Load the Worldwide cases
  useEffect(() => {
    fetch("https://corona.lmao.ninja/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://corona.lmao.ninja/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, //india ,bangladesh,unitedStat
            value: country.countryInfo.iso2, //UK,USA,BD
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
          setMapCountries(data);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://corona.lmao.ninja/v3/covid-19/all"
        : `https://corona.lmao.ninja/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("...........,,.,.,.,,: ", data);
        setCountry(countryCode);

        setCountryInfo(data);
        if(countryCode==='worldwide') {
          setMapCenter([100, 200]);
        }else {
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        }
        setMapZoom(4);

        // pREPAETRING gRAPH DATA
        const d = new Date();
        const to = formatDate(d);
        const from = formatDate(d.setDate(d.getDate() - 7));

        console.log("country : ", countrySlug + " DATE :", from, to);

        getCountryReportByDateRang(countrySlug, from, to);
      });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID 19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__status">
          <InfoBox
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>

        <Map countries={mapCountries} center={mapCenter} zoom={mapZoom}/>
      </div>

      <Card className="app__right">
        <CardContent>
          <h3>
            Live <strong className="caseColor">Case</strong> by Country..
          </h3>
          <Tables countries={tableData} />

          <h3>
            World <strong className="caseColor">New</strong> Cases
          </h3>
          {/* Graph */}
          <LineGraph yAxis={coronaCountArr} xAxis={coronaDateArr} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
