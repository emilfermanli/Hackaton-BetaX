import React from 'react'
import ReactApexChart from "react-apexcharts"


class ApexChart extends React.Component {
    constructor(props) {


        super(props);
        this.state = {

            series: [
                this.props.Nitrite ? this.props.Nitrite : 0,
                this.props.Fikosin ? this.props.Fikosin : 0,
                this.props.Nitrate ? this.props.Nitrate : 0,
                this.props.Chlorophyll ? this.props.Chlorophyll : 0,
                this.props.Sulfate ? this.props.Sulfate : 0,
                this.props.No3 ? this.props.No3 : 0,
                this.props.Sodium ? this.props.Sodium : 0,
                this.props.Alkaline ? this.props.Alkaline : 0],
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