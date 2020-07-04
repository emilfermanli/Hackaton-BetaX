import React, { useState } from 'react'
import ReactApexChart from "react-apexcharts"

function DataChart(props) {

    const { data } = props

    if (data === null) {
        console.log("data yoxdu")
    } else {
        console.log("data var")
        console.log(typeof parseInt(data.WaterLevel))
    }


    const state = {
        series: [{
            name: 'Nəticə',
            data: [
                data === null ? 0 : parseInt(data.WaterLevel),
                data === null ? 0 : parseInt(data.FlowRate),
                data === null ? 0 : data.WaterPermeability,
                data === null ? 0 : data.WaterOxygen,
                data === null ? 0 : data.Blurring,
                data === null ? 0 : data.Fikosin,
                data === null ? 0 : data.SuspendedSolids,
                data === null ? 0 : data.Ammonia,
                data === null ? 0 : data.NitrogenDioxide,
                data === null ? 0 : data.HardnessOfTheWater,
                data === null ? 0 : data.ChemicalOxygenDemand,
                data === null ? 0 : data.BiochemicalOxygenDemand]
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
    }


    console.log(state.series)
    console.log(state.series[0])
    console.log(state.series[0].data)

    return (
        <div id="chart">
            <ReactApexChart options={state.options} series={state.series[0].data} type="bar" height={350} />
        </div>
    )
}





export default DataChart