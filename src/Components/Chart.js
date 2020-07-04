import React from 'react'
import ReactApexChart from "react-apexcharts"


class ApexChart extends React.Component {
    constructor(props) {


        super(props);
        this.state = {

            series: [10, 55, 13, 43, 22, 13, 43, 22],
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


        };
    }

    render() {
        return (
            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="pie" width={380} />
            </div>
        );
    }
}


export default ApexChart