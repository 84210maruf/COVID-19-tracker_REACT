import React from "react";
import { Circle } from "react-leaflet";


const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        rgb: "rgb(204, 16, 52)",
        multiplier: 800,
    },
    recovered: {
        hex: "#7dd71d",
        rgb: "rgb(204, 16, 52)",
        multiplier: 800,
    },
    deaths: {
        hex: "#fb4443",
        rgb: "rgb(204, 16, 52)",
        multiplier: 800,
    },
}


export const sortData = (data) => {
    const sortedData = [...data];

    return sortedData.sort((a, b) => (a.cases < b.cases ? 1 : -1));
};

export const showDataOnMap = (data, casesType='cases') => {
    data.map(country => (
        <Circle 
        center={[ country.countryInfo.lat, country.countryInfo.long ]}>

        </Circle>
    ))
};