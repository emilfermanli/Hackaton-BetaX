import React from 'react'
import ReactApexChart from "react-apexcharts"



function DataChart(props) {


    const state = {
        series: [{
            name: 'Servings',
            data: [
                props.data === null ? 0 : props.data.WaterLevel,
                props.data === null ? 0 : props.data.FlowRate,
                props.data === null ? 0 : props.data.WaterPermeability,
                props.data === null ? 0 : props.data.WaterOxygen,
                props.data === null ? 0 : props.data.Blurring,
                props.data === null ? 0 : props.data.Fikosin,
                props.data === null ? 0 : props.data.SuspendedSolids,
                props.data === null ? 0 : props.data.Ammonia,
                props.data === null ? 0 : props.data.NitrogenDioxide,
                props.data === null ? 0 : props.data.HardnessOfTheWater,
                props.data === null ? 0 : props.data.ChemicalOxygenDemand,
                props.data === null ? 0 : props.data.BiochemicalOxygenDemand]
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

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
            </div>
        </div>
    )
}

export default DataChart


