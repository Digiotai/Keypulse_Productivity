import { ApexChart } from "../../components/ApexBarChart"
import Chart from 'react-apexcharts'
import uptime from '../../assets/svg/uptime.png'
import through from '../../assets/svg/output.png'
import opex from '../../assets/svg/data-center.png'
import uparrow from '../../assets/svg/upArrow.svg'
import { useState } from "react"
import { series1, options1, series2, options2, series3, options3 } from "../../components/ApexBarChart/data"
export const Productivity = () => {
    const [hover, setHover] = useState(false)
    var series = [90, 10]
    const options = {
        chart: {
            width: 380,
            type: 'pie',
        },
        legend: {
            show: false,
            showForSingleSeries: true,
            customLegendItems: ['No Of Orders'],
            markers: {
                fillColors: ['#d7d7d9']
            }
        },
        // markers: {
        //     colors: ['#F44336', '#E91E63', '#9C27B0']
        // },
        fill: {
            colors: ["#39c734", "#d10f0f"],
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    offset: -10, // Moving the label position on slice
                }
            }
        },
        dataLabels: {
            style: {
                fontSize: '14',
                fontWeight: '600',
                colors: ['#ffffff', '#ffffff'],
            },
            formatter: function (val, opt) {
                // return [] used to change the line for the labels
                // each index element will get rendered to a new line
                /* Also casted to know (unknown) first and then to (string) as library is currently 
                   accepting return type only. so it's a small manipulation 
                   until library does not accept array. */
                switch (opt.seriesIndex) { // seriesIndex gives the position of slice
                    case 0:
                        return ['On Time', val + '%'];
                    case 1:
                        return ['Late', val + '%'];
                    default:
                        return val;
                }

            }
        },
        labels: ['On Time', 'Late'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    show: false,
                    position: 'left'
                }
            }
        }]
    }
    const Productivity = ({ name, image, value, target }) => {
        const [hover, setHover] = useState(false)
        return (
            <div style={{ border: '1px solid #E6E6E6', padding: 5, display: 'flex', flexDirection: "column", alignItems: 'center', marginLeft: '3px' }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                <h5 style={{ fontFamily: 'Inter', marginTop: '0.5px', fontSize: '14px', fontWeight: 500, lineHeight: '16px' }}>
                    {name}
                </h5>
                <img src={image} alt="Girl in a jacket" width={"25%"} className="mb-2" />
                <h5 style={{ fontFamily: 'Inter', marginTop: '4px', fontSize: '12px', fontWeight: 500, lineHeight: '14px' }}>{value}</h5>
                {hover && <div className="card" style={{ position: "absolute", height: "20px", padding: "20px", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
                    <span style={{ fontFamily: 'Inter', marginTop: '4px', fontSize: '12px', lineHeight: '14px', fontWeight: 500, textAlign: "center" }}> {target}</span>
                </div>}
            </div>
        )
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    {/* <h6 style={{ fontFamily: "poppins", fontWeight: 500 }}>Production Lead Time Distribution</h6> */}
                    <div className="row gx-0">
                        <div className="col ">
                            <div style={{ border: '1px solid #E6E6E6', padding: 5, display: 'flex', justifyContent: '', alignItems: 'center', marginLeft: '3px', padding: '5px' }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                                <div style={{ display: 'flex', flexDirection: "column", justifyContent: 'space-between', height: '138px' }}>
                                    <h5 style={{ fontFamily: 'Inter', marginTop: '0.5px', fontSize: '14px', lineHeight: '16px', fontWeight: 500 }}>
                                        Utilization
                                    </h5>
                                    <h5 style={{ fontFamily: 'Inter', marginTop: '4px', fontSize: '20px', fontWeight: 600 }}>86%</h5>
                                    <p style={{
                                        fontFamily: 'Inter', marginTop: '4px', fontSize: '12px', fontWeight: 500, lineHeight: '14px'
                                    }}>In last 30 days</p>
                                </div>
                                <div style={{ display: 'flex', marginLeft: '50px' }}>
                                    <span style={{ fontSize: '16px', fontFamily: "poppins", fontWeight: 500 }}>10%</span> <img src={uparrow} alt="Girl in a jacket" width={"20px"} className="mb-2 ms-2" />
                                </div>
                                {hover && <div className="card" style={{ position: "absolute", height: "20px", padding: "20px", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "-60px",marginLeft:"80px" }}>
                                    <span style={{ fontFamily: 'Inter', marginTop: '4px', fontSize: '12px', lineHeight: '14px', fontWeight: 500, textAlign: "center" }}>10% increase MoM</span>
                                </div>}
                            </div>

                        </div>
                        {/* <Productivity name="Overall Number" image={opex} value={"65.37 m/ton"} /> */}
                        <div className="col">
                            <Productivity name="Operational Expenses" image={opex} value={"$ 11,345"} target={"2% reduction MoM"} />
                        </div>
                    </div>
                    <div className="row gx-0 mt-1">
                        <div className="col-6">
                            <Productivity name="Throughput" image={through} value={"104,536"} target={"0.8% increase MoM"} />
                        </div>
                        <div className="col-6">
                            <Productivity name="Uptime" image={uptime} value={"91%"} target={"0.02% decrease MoM"} />
                        </div>
                    </div>
                    {/* <ApexChart series={series3} options={options3}  height={"250px"} /> */}
                </div>
                {/* <div className="col-4">
                    <div style={{ display: 'flex' }}>
                        <div style={{ borderLeft: '1px solid grey', height: '40vh' }}></div>
                        <div style={{display:'flex',justifyContent:"center",marginLeft:"10%"}}>
                            <h6 style={{ fontFamily: "poppins", fontWeight: 500 }}>Delivery</h6>
                        </div>
                    </div>
                </div> */}
            </div>
            <div className="row mt-4">
                <div className="col-6">
                    <h6 style={{ fontFamily: "poppins", fontWeight: 500, fontSize: '18px', fontWeight: 600, display: 'flex', justifyContent: "start" }}>Combined OEE Of Machines</h6>
                    <ApexChart series={series1} options={options1} height={"250px"} width={"100%"} />
                </div>
                <div className="col-6">
                    <h6 style={{ fontFamily: "poppins", fontSize: '18px', fontWeight: 600, display: 'flex', justifyContent: "center" }}>Delivery</h6>
                    <div className="mt-4 ms-2">
                        <Chart options={options} series={series} type="pie" height={"250px"} width={"100%"} />
                    </div>
                </div>
            </div>
            {/* <hr style={{ margin: 0, padding: 0, marginBottom: '10px' }} /> */}
        </div>
    )
}