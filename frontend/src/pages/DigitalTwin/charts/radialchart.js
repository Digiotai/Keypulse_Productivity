import Chart from 'react-apexcharts'
// import { options } from './data'
export const RadialApexChart = ({ series, height, width, type = "radialBar" }) => {

    const options = {
        chart: {
            type: 'radialBar',
            offsetY: -20,
            sparkline: {
                enabled: true
            }
        },
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                hollow: {
                    margin: 0,
                    size: "80%",
                    background: "#FFF"
                },
                track: {
                    background: "#e7e7e7",
                    strokeWidth: '100%',
                    margin: 5, // margin is in pixels
                    dropShadow: {
                        enabled: true,
                        top: 2,
                        left: 0,
                        color: '#999',
                        opacity: 1,
                        blur: 2
                    }
                },
                dataLabels: {
                    name: {
                        show: false
                    },
                    value: {
                        offsetY: -2,
                        fontSize: '20px'
                    }
                }
            }
        },
        grid: {
            padding: {
                top: -10
            }
        },
        fill: {
            colors:['#ff944d']
            // type: "gradient",
            // gradient: {
            //     shade: "dark",
            //     type: "vertical",
            //     gradientToColors: ["#ff944d"],
            //     // stops: [0, 100]
            // }
        },
        stroke: {
            lineCap: "round"
        },
        labels: ["Progress"]
    };

    return (
        <Chart options={options} series={series} type={type} width={400} />
    )
}