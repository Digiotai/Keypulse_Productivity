import { LineChart } from '../../components/LineChart'
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

export const MultiSensorData = () => {
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [liveCurrent, setLiveCurrent] = useState(0)
    const [chartData, setChartData] = useState({
        datasets: [
            {
                label: 'Current',
                data: [],
                fill: false,
                borderColor: 'rgba(75, 119, 192, 1)',
            },
            {
                label: 'Humidity',
                data: [],
                fill: false,
                borderColor: '#1b3c7a',
            },
            {
                label: 'Power',
                data: [],
                fill: false,
                borderColor: '#427ae3',
            },
            {
                label: 'Temperature',
                data: [],
                fill: false,
                borderColor: '#3dc7d1',
            },
            {
                label: 'Voltage',
                data: [],
                fill: false,
                borderColor: '#faa93e',
            },
        ],
    });
    const [chartData2, setChartData2] = useState({
        datasets: [
            {
                label: 'Current',
                data: [],
                fill: false,
                borderColor: 'rgba(75, 119, 192, 1)',
            },
            {
                label: 'Humidity',
                data: [],
                fill: false,
                borderColor: '#1b3c7a',
            },
            {
                label: 'Power',
                data: [],
                fill: false,
                borderColor: '#427ae3',
            },
            {
                label: 'Temperature',
                data: [],
                fill: false,
                borderColor: '#3dc7d1',
            },
            {
                label: 'Voltage',
                data: [],
                fill: false,
                borderColor: '#faa93e',
            },
        ],
    });
    const optionsl = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: false,
                text: 'Chart.js Line Chart',
            },
        },
        scales: {
            x: {
                time: {
                    unit: 'hour',
                    displayFormats: {
                        hour: 'MMM D, HH:mm',
                    },
                },
                title: {
                    display: true,
                    text: 'Time',
                    color: 'black',
                    fontWeight: 700,
                    padding: 5
                },
                grid: {
                    display: false,
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Current',
                    color: 'black',
                    fontWeight: 700,
                    padding: 5
                },
                grid: {
                    display: false
                },
                suggestedMin: 0,
            }
        },
    };

    const fetchData = async () => {
        try {
            await axios.get(`http://3.132.248.171:7500/readmulti`, {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => {
                const data1 = []
                const data2 = []
                const data3 = []
                const data4 = []
                const data5 = []
                const data = response?.data.map((item, index) => {
                    const parts = item.timestamp.split('-').map(part => parseInt(part, 10));
                    const parsedTime = new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
                    if (index == 0) {
                        setStartDate(moment(parsedTime).format('MM/DD/YYYY, h:mm a'))
                    } else if (index === response?.data.length - 1) {
                        setEndDate(moment(parsedTime).format('MM/DD/YYYY, h:mm a'))
                    }

                    if (index % 15 === 0 || index === response.data.length - 1) {
                        const last15Points = response.data.slice(Math.max(0, index - 14), index + 1);
                        const averageY = last15Points.reduce((sum, point) => sum + point.Current_unit, 0) / last15Points.length;
                        const humidityY = last15Points.reduce((sum, point) => sum + point.Humidity_unit, 0) / last15Points.length;
                        const powerY = last15Points.reduce((sum, point) => sum + point.Power_unit, 0) / last15Points.length;
                        const tempY = last15Points.reduce((sum, point) => sum + point.Temperature_unit, 0) / last15Points.length;
                        const voltageY = last15Points.reduce((sum, point) => sum + point.Voltage_unit, 0) / last15Points.length;

                        if (index % 30 === 0 || index === response.data.length - 1) {
                            data1.push({
                                x: moment(parsedTime).format('h:mm a'), // You may want to adjust the x-axis data depending on your use case
                                y: averageY.toFixed(2),
                            })
                            data2.push({
                                x: moment(parsedTime).format('h:mm a'), // You may want to adjust the x-axis data depending on your use case
                                y: humidityY.toFixed(2),
                            })
                            data3.push({
                                x: moment(parsedTime).format('h:mm a'), // You may want to adjust the x-axis data depending on your use case
                                y: powerY.toFixed(2),
                            })
                            data4.push({
                                x: moment(parsedTime).format('h:mm a'), // You may want to adjust the x-axis data depending on your use case
                                y: tempY.toFixed(2),
                            })
                            data5.push({
                                x: moment(parsedTime).format('h:mm a'), // You may want to adjust the x-axis data depending on your use case
                                y: voltageY.toFixed(2),
                            })
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }
                }).filter(item => item !== null);

                setChartData((prevChartData) => ({
                    ...prevChartData,
                    datasets: [
                        {
                            ...prevChartData.datasets[0],
                            data: data1,
                        },
                        {
                            label: 'Humidity',
                            data: data2,
                            fill: false,
                            borderColor: '#1b3c7a',
                        },
                        {
                            label: 'Power',
                            data: data3,
                            fill: false,
                            borderColor: '#427ae3',
                        },
                        {
                            label: 'Temperature',
                            data: data4,
                            fill: false,
                            borderColor: '#3dc7d1',
                        },
                        {
                            label: 'Voltage',
                            data: data5,
                            fill: false,
                            borderColor: '#faa93e',
                        },
                    ],
                }));
            });
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    const fetchRealData = async () => {
        try {
            await axios.get(`http://3.132.248.171:7500/getMultiData`, {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => {
                console.log(chartData2)
                const data1 = []
                const data2 = []
                const data3 = []
                const data4 = []
                const data5 = []
                const data = response?.data.map((item, index) => {
                    const parts = item.timestamp.split('-').map(part => parseInt(part, 10));
                    const parsedTime = new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
                    // if (index == 0) {
                    //     setStartDate(moment(parsedTime).format('MM/DD/YYYY, h:mm a'))
                    // } else if (index === response?.data.length - 1) {
                    //     setEndDate(moment(parsedTime).format('MM/DD/YYYY, h:mm a'))
                    // }
                    setLiveCurrent(item.current_value.toFixed(2))
                    data1.push({
                        x: moment(parsedTime).format('h:mm a'), // You may want to adjust the x-axis data depending on your use case
                        y: item.current_value.toFixed(2),
                    })
                    data2.push({
                        x: moment(parsedTime).format('h:mm a'), // You may want to adjust the x-axis data depending on your use case
                        y: item.Humidity_value.toFixed(2),
                    })
                    data3.push({
                        x: moment(parsedTime).format('h:mm a'), // You may want to adjust the x-axis data depending on your use case
                        y: item.Power_value.toFixed(2),
                    })
                    data4.push({
                        x: moment(parsedTime).format('h:mm a'), // You may want to adjust the x-axis data depending on your use case
                        y: item.Temperature_value.toFixed(2),
                    })
                    data5.push({
                        x: moment(parsedTime).format('h:mm a'), // You may want to adjust the x-axis data depending on your use case
                        y: item.Voltage_value.toFixed(2),
                    })
                })

                setChartData2((prevChartData) => {
                    console.log('Previous liveCurrent:', prevChartData);
                    let finData = [
                        {
                            data: [...prevChartData?.datasets[0]?.data, ...data1],
                            label: 'Current',
                            fill: false,
                            borderColor: 'rgba(75,192,192,1)',
                        },
                        {
                            label: 'Humidity',
                            data: [...prevChartData?.datasets[1]?.data, ...data2],
                            fill: false,
                            borderColor: '#1b3c7a',
                        },
                        {
                            label: 'Power',
                            data: [...prevChartData?.datasets[2]?.data, ...data3],
                            fill: false,
                            borderColor: '#427ae3',
                        },
                        {
                            label: 'Temperature',
                            data: [...prevChartData?.datasets[3]?.data, ...data4],
                            fill: false,
                            borderColor: '#3dc7d1',
                        },
                        {
                            label: 'Voltage',
                            data: [...prevChartData?.datasets[4]?.data, ...data5],
                            fill: false,
                            borderColor: '#faa93e',
                        },
                    ];
                    return {
                        datasets:finData
                    };
                });
            });
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchRealData()
        const intervalId = setInterval(() => {
            fetchRealData()
        }, 10000 * 6) // in milliseconds
        return () => clearInterval(intervalId)
    }, [])

    // const fetchRealTimeData = async () => {
    //     try {
    //         await axios.get(`http://3.132.248.171:6500/getMultiData `, {
    //             method: 'GET',
    //             headers: {
    //                 'Access-Control-Allow-Origin': '*',
    //             }
    //         }).then((response) => {
    //             console.log(response)
    //             const data1 = []
    //             const data2 = []
    //             const data3 = []
    //             const data4 = []
    //             const data5 = []
    //             const parsedTime = new Date(response?.data.timestamp * 1000); // Convert to milliseconds
    //             setLiveCurrent(response?.data.Current)
    //             data1.push({
    //                 x: moment(parsedTime).format('h:mm a'), // You may want to adjust the x-axis data depending on your use case
    //                 y: response?.data.Current.toFixed(2),
    //             })
    //             data2.push({
    //                 x: moment(parsedTime).format('h:mm a'), // You may want to adjust the x-axis data depending on your use case
    //                 y: response?.data.Humidity.toFixed(2),
    //             })
    //             data3.push({
    //                 x: moment(parsedTime).format('h:mm a'), // You may want to adjust the x-axis data depending on your use case
    //                 y: response?.data.Power.toFixed(2),
    //             })
    //             data4.push({
    //                 x: moment(parsedTime).format('h:mm a'), // You may want to adjust the x-axis data depending on your use case
    //                 y: response?.data.Temperature.toFixed(2),
    //             })
    //             data5.push({
    //                 x: moment(parsedTime).format('h:mm a'), // You may want to adjust the x-axis data depending on your use case
    //                 y: response?.data.Voltage.toFixed(2),
    //             })
    //             setChartData2((prevChartData) => ({
    //                 ...prevChartData,
    //                 datasets: [
    //                     {
    //                         data:[...chartData?.datasets[0]?.data,...data1],
    //                         label: 'Current',
    //                         fill: false,
    //                         borderColor: 'rgba(75,192,192,1)',
    //                     },
    //                     {
    //                         label: 'Humidity',
    //                         data:[...chartData?.datasets[1]?.data,...data2],
    //                         fill: false,
    //                         borderColor: '#1b3c7a',
    //                     },
    //                     {
    //                         label: 'Power',
    //                         data:[...chartData?.datasets[2]?.data,...data3],
    //                         fill: false,
    //                         borderColor: '#427ae3',
    //                     },
    //                     {
    //                         label: 'Temperature',
    //                         data:[...chartData?.datasets[3]?.data,...data4],
    //                         fill: false,
    //                         borderColor: '#3dc7d1',
    //                     },
    //                     {
    //                         label: 'Voltage',
    //                         data:[...chartData?.datasets[4]?.data,...data5],
    //                         fill: false,
    //                         borderColor: '#faa93e',
    //                     },
    //                 ],
    //             }));
    //         });
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    // useEffect(() => {
    //     fetchRealTimeData()
    //     const intervalId = setInterval(() => {
    //         fetchRealTimeData()
    //     }, 10000 * 5) // in milliseconds
    //     return () => clearInterval(intervalId)
    // }, [])

    return (
        <div style={{ width: '100%', overflow: 'hidden' }}>
            <div className="card p-3 m-3">
                <div className="d-flex mt-2">
                    <p style={{ fontSize: '24px', fontFamily: 'poppins', fontWeight: 800 }}>Live Data</p>
                    {/* <span
                style={{
                    content: '""',
                    display: 'inline-block',
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'green', // Adjust the color as needed
                    borderRadius: '50%',
                    marginLeft: '8px',
                    marginTop: '5px',
                    transform: 'translateY(10%)',
                }}
            ></span> */}
                </div>
                <div className="d-flex mt-2">
                    <p style={{ fontSize: '20px', fontFamily: 'poppins', width: '60%' }}>Machine Status</p>
                    <p style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'poppins' }}>ON  <span
                        style={{
                            content: '""',
                            display: 'inline-block',
                            width: '20px',
                            height: '20px',
                            backgroundColor: 'green', // Adjust the color as needed
                            borderRadius: '50%',
                            marginLeft: '8px',
                            marginTop: '5px',
                            transform: 'translateY(10%)',
                        }}
                    ></span></p>
                </div>
                <div className="d-flex my-2 ">
                    <p style={{ fontSize: '20px', fontFamily: 'poppins', width: '60%' }}>Current</p>
                    <p style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'poppins' }}>{liveCurrent || 0}</p>
                </div>
                <div style={{ width: "100%" }}>
                    <LineChart height={80} options={optionsl} data={chartData2} />
                </div>
            </div>
            <div className="card p-3 m-3">
                <div className="d-flex mt-2">
                    <p style={{ fontSize: '24px', fontFamily: 'poppins', fontWeight: 800, width: '60%' }}>History Data</p>
                    <p style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'poppins' }}>{startDate}-{endDate}</p>
                </div>
                <div className="d-flex mt-2">
                    <p style={{ fontSize: '20px', fontFamily: 'poppins', width: '60%' }}>Machine Status</p>
                    <p style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'poppins' }}>ON  <span
                        style={{
                            content: '""',
                            display: 'inline-block',
                            width: '20px',
                            height: '20px',
                            backgroundColor: 'green', // Adjust the color as needed
                            borderRadius: '50%',
                            marginLeft: '8px',
                            marginTop: '5px',
                            transform: 'translateY(10%)',
                        }}
                    ></span></p>
                </div>
                <div className="d-flex my-2 ">
                    <p style={{ fontSize: '20px', fontFamily: 'poppins', width: '60%' }}>Current</p>
                    <p style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'poppins' }}>640.2 A</p>
                </div>
                <div style={{ width: "100%" }}>
                    <LineChart height={80} options={optionsl} data={chartData} />
                </div>
            </div>
        </div>
    )
}