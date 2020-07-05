import React from 'react'
import ReactApexChart from "react-apexcharts"

function ApexChart(props) {

    let state = {
        series: [
            props.data === null ? 0 : parseInt(props.data.Nitrite),
            props.data === null ? 0 : parseInt(props.data.Fikosin),
            props.data === null ? 0 : parseInt(props.data.Nitrate),
            props.data === null ? 0 : parseInt(props.data.Chlorophyll),
            props.data === null ? 0 : parseInt(props.data.Sulfate),
            props.data === null ? 0 : parseInt(props.data.No3),
            props.data === null ? 0 : parseInt(props.data.Sodium),
            props.data === null ? 0 : parseInt(props.data.Alkaline)
        ],
        options: {
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: ['Nitrit', 'Fikosin', 'Nitrat', 'Xlorofil', 'Sulfat', 'No3', 'Sodium ', 'Alkalin'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },

    }

    return (
        <div id="chart">
            <ReactApexChart options={state.options} series={state.series} type="pie" width={380} />
        </div>
    )
}





export default ApexChart