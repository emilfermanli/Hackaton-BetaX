import React from 'react'
import ReactApexChart from "react-apexcharts"



class DataChart extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.data)

        this.state = {
            series: [{
                name: 'Servings',
                data: [
                    props.data === null ? 0 : props.WaterLevel,
                    props.data === null ? 0 : props.FlowRate,
                    props.data === null ? 0 : props.WaterPermeability,
                    props.data === null ? 0 : props.WaterOxygen,
                    props.data === null ? 0 : props.Blurring,
                    props.data === null ? 0 : props.Fikosin,
                    props.data === null ? 0 : props.SuspendedSolids,
                    props.data === null ? 0 : props.Ammonia,
                    props.data === null ? 0 : props.NitrogenDioxide,
                    props.data === null ? 0 : props.HardnessOfTheWater,
                    props.data === null ? 0 : props.ChemicalOxygenDemand,
                    props.data === null ? 0 : props.BiochemicalOxygenDemand]
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
                        'Nitrogen Dioxksid(NO2) - mg/l',
                        'Codlulugu',
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