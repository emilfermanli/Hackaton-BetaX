import React from 'react'
import ReactApexChart from "react-apexcharts"

function DataChart(props) {

    let state = {
        series: [{
            name: 'Nəticə',
            data: [
                props.data === null ? 0 : props.data.WaterLevel,
                props.data === null ? 0 : props.data.SalinityOfWater,
                props.data === null ? 0 : props.data.WaterPermeability,
                props.data === null ? 0 : props.data.WaterOxygen,
                props.data === null ? 0 : props.data.Sodium,
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
                    'Suyun səviyyəsi-m',
                    'Axın sürəti - m/d',
                    'Suyun xüsusi keçiriciliyi - μS/cm',
                    'Həll edilmiş oksigenin miqdarı - mg/l',
                    'Havanın tempraturu - c',
                    'Fikosinin - mg/l',
                    'Asılmış bərk maddələr (SS) - mg/l',
                    'Ammonyak - mg/l',
                    'Nitrogen Dioxksid(NO2) - mg/l',
                    'Codlulugu - mg/l',
                    'Kimyəvi oksigen  tələbi (COD) mg/l ',
                    'Biokimyəvi oksigen tələbi - mg/l'
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


