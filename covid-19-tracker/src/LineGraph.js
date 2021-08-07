import numeral from 'numeral';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

function LineGraph({ casesType='cases'}) {
    const [data, setData] = useState({});

    const options = {
        legend: {
            display: false,
        },
        elements: {
            point: {
                redius: 0,
            },
        },
        maintainAspectRatio: false,
        tooltips: {
            mode:"index",
            intersect: false,
            callbacks: {
            label: function(tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
                },
            },
        },
        scales: {
            xAxes: [
                {
                    type: "time",
                    time: {
                        format: "MM/DD/YY",
                        tooltips: "ll",
                    },
                },
            ],
            yAxes: [
                {
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        //Include a dollewr sign in the ticks
                        callcack: function (value, index, values) {
                            return numeral(value).format("0a");
                        },
                    },
                },
            ],
        },

    };

    const buildChartData = (data, casesType ='cases') => {
        const chartData = [];
        let lastDataPoint;
        for(let date in data.cases) {
            if(lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    y:data[casesType][date] - lastDataPoint,
                };
                chartData.push(newDataPoint);
            }
            lastDataPoint = data[casesType][data];
        }
        return chartData;
    }

    useEffect(() => {
        const fetchData = async () => {
            fetch('https://corona.lmao.ninja/v3/covid-19/historical/all?lastday=120')
            .then(response => response.json())
            .then(data => {
                console.log('historical data for Graph',data);
                const chartData = buildChartData(data, 'cases');
                setData(chartData);
            });
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>I am a graph</h2>
            {/*data is an object*/}
            <Line 
            options={options} 
            data={{
                datasets:[{
                    backgroundColor:'rgba(204, 16, 52,0.5)',
                    borderColor: '#CC1034',
                    data: data
                }]
            }}/>
        </div>
    )
}

export default LineGraph;
