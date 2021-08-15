// Another Graph

import React from 'react';
import { Line } from 'react-chartjs-2';
import './Linegraph.css';

function LineGraph(props) {
    return (
        <div className="another_graph">
            <Line data={{
                
                datasets: [
                    {
                    label: 'My First dataset',
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.1,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data:props.yAxis
                    }
                ]
                }}
            />
        </div>
    )
}

export default LineGraph;
