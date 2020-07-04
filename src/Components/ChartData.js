import React from 'react'
import ReactApexChart from "react-apexcharts"



class DataChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            series: [{
                name: 'Servings',
                data: [44, 55, 41, 67, 22, 43, 21, 33, 45, 31, 87, 65]
            }],
            options: {

                chart: {
                    height: 350,
                    type: 'bar',
                },
                plotOptions: {
                    bar: {
                        columnWidth: '50%',
                        endingShape: 'rounded'
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    width: 2
                },

                grid: {
                    row: {
                        colors: ['#fff', '#f2f2f2']
                    }
                },
                xaxis: {
                    labels: {
                        rotate: -45
                    },
                    categories: [
                        'Suyun səviyyəsi',
                        'Axın sürəti',
                        'Suyun xüsusi keçiriciliyi',
                        'Həll edilmiş oksigenin miqdarı ',
                        'Bulanlıqlıq',
                        'Fikosinin',
                        'Asılmış bərk maddələr (SS) - mg/l',
                        'Ammonyak',
                        'itrogen Dioxksid(NO2) - mg/l',
                        'codlulugu',
                        'Kimyəvi oksigen  tələbi (COD) mg/l ',
                        'Biokimyəvi oksigen tələbi'
                    ],
                    tickPlacement: 'on'
                },

                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'light',
                        type: "horizontal",
                        shadeIntensity: 0.25,
                        gradientToColors: undefined,
                        inverseColors: true,
                        opacityFrom: 0.85,
                        opacityTo: 0.85,
                        stops: [50, 0, 100]
                    },
                }
            },


        };
    }


    render() {
        return (

            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
            </div>


        );
    }
}

export default DataChart