import { LineChart } from "../../../../components/LineChart"
export const InnerPlantation = ({ selData }) => {
    const co2Data = (data) => {
        const finalData = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Aug"],
            datasets: [
                {
                    label: 'CO2',
                    data: data[0].data,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
            ],
        };
        return finalData
    }
    return (
        <div className="card" style={{ width: "520px" }}>
            <LineChart height={"200px"} width={"100%"} data={co2Data(selData)} />
        </div>
    )
}