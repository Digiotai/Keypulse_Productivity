import { ApexChart } from "../../../../components/ApexBarChart"
export const ProductivityOpex = ({ selData }) => {
    var options3 = {
        chart: {
            type: 'bar',
            // height: 350
        },
        plotOptions: {
            bar: {
                horizontal: true,
                columnWidth: '55%',
                endingShape: 'rounded',
                responsive: true,

            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['2023'],
            labels: {
                show: true,
            }
        },
        colors: ["#1b3c7a", "#427ae3", "#3dc7d1", "#faa93e"],
        fill: {
            colors: ["#1b3c7a", "#427ae3", "#3dc7d1", ""]
        },
        // yaxis: {
        //   title: {
        //     text: 'Machine'
        //   },
        // },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + "%"
                }
            }
        }
    };
    const utilizationData = (data) => {

        function calculatePercentages(numbers) {
            const totalSum = numbers.reduce((sum, num) => sum + num, 0);
            return parseInt((totalSum / (numbers.length * 100)) * 100);
        }

        let series1 = [{
            name: 'Robotic Arm',
            data: [calculatePercentages(data.filter((item) => item.name == "Robotic Arm")[0].data)]
        }, {
            name: 'Roller Belts',
            data: [calculatePercentages(data.filter((item) => item.name == "Roller Belts")[0].data)]
        }, {
            name: 'Boilers',
            data: [calculatePercentages(data.filter((item) => item.name == "Boilers")[0].data)]
        },
        {
            name: 'Chillers',
            data: [calculatePercentages(data.filter((item) => item.name == "Chillers")[0].data)]
        }]
        console.log(series1)
        return series1
    }
    return (
        <div className="card" style={{ width: "520px" }}>
            <ApexChart series={utilizationData(selData)} options={options3} height={"250px"} width={"500px"} />
        </div>
    )
}