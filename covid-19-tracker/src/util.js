import React from "react";
import { Circle, Popup } from "react-leaflet";


const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        multiplier: 800,
    },
    recovered: {
        hex: "#7dd71d",
        multiplier: 800,
    },
    deaths: {
        hex: "#fb4443",
        multiplier: 800,
    },
}


export const sortData = (data) => {
    const sortedData = [...data];

    return sortedData.sort((a, b) => (a.cases < b.cases ? 1 : -1));
};

export const showDataOnMap = (data, casesType="cases") => {
    data.map(country => (
        <Circle 
        center={[ country.countryInfo.lat, country.countryInfo.long ]}
        fillOpacity={0.4}
        color={casesTypeColors[casesType].hex}
        fillColor={casesTypeColors[casesType].hex}
        redius={
            Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
        }
        >
            <Popup>
               <h2>I am a Popup</h2> 
            </Popup>
        </Circle>
    ))
};