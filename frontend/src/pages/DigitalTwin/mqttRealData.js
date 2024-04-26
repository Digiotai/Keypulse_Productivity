import { LineChart } from '../../components/LineChart'
import { useState, useEffect } from 'react';
import axios from 'axios';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import moment from 'moment';
import mqtt from 'mqtt';
import { customStyles } from '../../utils'
import { saveAs } from 'file-saver';
import { json2csv } from 'json-2-csv';
import JSZip from 'jszip';
import { RadialApexChart } from './charts/radialchart';


export const MqttSensorData = ({details,setDetails,showModel,setConnection}) => {
    const [dayFilter, setDayFilter] = useState('Daily')
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndData] = useState(null)
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

    const CardSample = ({ header, data }) => {
        return <div className='col-4'>
            <div className='card' style={{ justifyContent: 'center', alignItems: 'center' }}>
                <h2 style={{ fontSize: '18px', padding: '10px' }}>{header}</h2>
                <div style={{padding:'30px'}}>
                    <RadialApexChart series={data} width={'100%'} height={300} />
                </div>
            </div>
        </div>
    }

    const options = [
        { value: 'Daily', label: 'Daily' },
        { value: 'Monthly', label: 'Monthly' },
    ]

    const animatedComponents = makeAnimated();
    const handleChange = (selectedOption) => {
        setDayFilter(selectedOption)
    };

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
                    display: false,
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

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    let finData = {}

    useEffect(() => {
        const options = {
            protocol:details.protocol|| 'ws',
            clientId:details.client || 'vir-pth-A1-B2-C3-D4-E5-F6',
            username:details.username || 'axLBthbazeJkKKkpr2sVK9rAeXfFJGmH1V9k18iqaSyKqHYHzetadIyitBL15WyU',
            password:details.password || '',
            // name:details.name || 'MQTT',
            // host:details.host || 'mqtt.flespi.io',
            // port: details.port || '1883'
        };

        console.log(options)
        const client = mqtt.connect(`mqtt://${'mqtt.flespi.io'}`, options);

        client.on('connect', () => {
            setConnection(false)
            console.log('Connected to MQTT broker');
            // Subscribe to the topic where your device publishes data
            let topic1 = "flespi/state/gw/devices/5439260/telemetry/#"
            client.subscribe([topic1])
        });

        client.on("message", (topic, message) => {
            // message is Buffer
            const decoder = new TextDecoder('utf-8');
            const decodedMessage = decoder.decode(message);

            try {
                const jsonData = JSON.parse(decodedMessage);
                if (topic === 'flespi/state/gw/devices/5439260/telemetry/server.timestamp') {
                    finData = { ...finData, timestamp: new Date(jsonData * 1000) }
                } else if (topic == 'flespi/state/gw/devices/5439260/telemetry/Humidity') {
                    finData = { ...finData, humidity: jsonData.value }
                } else if (topic == 'flespi/state/gw/devices/5439260/telemetry/Temperature') {
                    finData = { ...finData, temperature: jsonData.value }
                } else if (topic == 'flespi/state/gw/devices/5439260/telemetry/Voltage') {
                    finData = { ...finData, voltage: jsonData.value }
                } else if (topic == 'flespi/state/gw/devices/5439260/telemetry/Power') {
                    finData = { ...finData, power: jsonData.value }
                } else if (topic == 'flespi/state/gw/devices/5439260/telemetry/Current') {
                    finData = { ...finData, current: jsonData.value }
                }
                const filterUniqueTimestamps = (dataArray) => {
                    const uniqueTimestamps = new Set();
                    return dataArray.filter((item) => {
                        const timestamp = item.timestamp;
                        // Check if the object has properties and if the timestamp is unique
                        if (Object.keys(item).length > 0 && !uniqueTimestamps.has(timestamp)) {
                            uniqueTimestamps.add(timestamp);
                            return true;
                        }
                        return false;
                    });
                };
                setData((prevChartData) => {
                    let data = filterUniqueTimestamps([...prevChartData, { ...finData }])
                    return data;
                })

            } catch (error) {
                console.error('Error parsing MQTT message:', error);
            }
        });

        return () => {
            client.end(); // Disconnect from MQTT broker when the component unmounts
        };
    }, [showModel]);

    useEffect(() => {
        const data1 = []
        const data2 = []
        const data3 = []
        const data4 = []
        const data5 = []
        const latestData = data.map((item, index) => {

            data1.push({
                x: moment(item.timestamp).format('h:mm a'), // You may want to adjust the x-axis data depending on your use case
                y: item.current.toFixed(2),
            })
            data2.push({
                x: moment(item.timestamp).format('h:mm a'), // You may want to adjust the x-axis data depending on your use case
                y: item.humidity.toFixed(2),
            })
            data3.push({
                x: moment(item.timestamp).format('h:mm a'), // You may want to adjust the x-axis data depending on your use case
                y: item.power.toFixed(2),
            })
            data4.push({
                x: moment(item.timestamp).format('h:mm a'), // You may want to adjust the x-axis data depending on your use case
                y: item.temperature.toFixed(2),
            })
            data5.push({
                x: moment(item.timestamp).format('h:mm a'), // You may want to adjust the x-axis data depending on your use case
                y: item.voltage.toFixed(2),
            })
        })
        setChartData2((prevChartData) => {
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
                datasets: finData
            };
        });
    }, [data])


    const fetchData = async () => {
        try {
            setLoading(true)
            await axios.get(`http://3.132.248.171:7500/${dayFilter.value !== 'Monthly' ? 'getDayData' : 'getMonthData'}`, {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => {
                const finDatalist = JSON.parse(response.data)
                const data1 = []
                const data2 = []
                const data3 = []
                const data4 = []
                const data5 = []
                const format = (dayFilter.value == "Daily" || dayFilter == 'Daily') ? 'HH:mm' : 'MMM DD'
                Object.keys(finDatalist?.server_timestamp)?.map((item, index) => {
                    data1.push({
                        x: moment(finDatalist?.server_timestamp[`${index}`]).format(format), // You may want to adjust the x-axis data depending on your use case
                        y: finDatalist.current_value[index]?.toFixed(2),
                    })
                    data2.push({
                        x: moment(finDatalist?.server_timestamp[`${index}`]).format(format), // You may want to adjust the x-axis data depending on your use case
                        y: finDatalist.Humidity_value[index]?.toFixed(2),
                    })
                    data3.push({
                        x: moment(finDatalist?.server_timestamp[`${index}`]).format(format), // You may want to adjust the x-axis data depending on your use case
                        y: finDatalist.Power_value[index]?.toFixed(2),
                    })
                    data4.push({
                        x: moment(finDatalist?.server_timestamp[`${index}`]).format(format), // You may want to adjust the x-axis data depending on your use case
                        y: finDatalist.Temperature_value[index]?.toFixed(2),
                    })
                    data5.push({
                        x: moment(finDatalist?.server_timestamp[`${index}`]).format(format), // You may want to adjust the x-axis data depending on your use case
                        y: finDatalist.Voltage_value[index]?.toFixed(2),
                    })
                })

                setStartDate(moment(finDatalist?.server_timestamp['0']).format('YYYY/MM/DD HH:mm'))
                setEndData(moment(finDatalist?.server_timestamp[`${Object.keys(finDatalist.server_timestamp).length - 1}`]).format('YYYY/MM/DD HH:mm'))
                setLoading(false)
                setChartData((prevChartData) => {
                    let finData = [
                        {
                            data: [...data1],
                            label: 'Current',
                            fill: false,
                            borderColor: 'rgba(75,192,192,1)',
                        },
                        {
                            label: 'Humidity',
                            data: [...data2],
                            fill: false,
                            borderColor: '#1b3c7a',
                        },
                        {
                            label: 'Power',
                            data: [...data3],
                            fill: false,
                            borderColor: '#427ae3',
                        },
                        {
                            label: 'Temperature',
                            data: [...data4],
                            fill: false,
                            borderColor: '#3dc7d1',
                        },
                        {
                            label: 'Voltage',
                            data: [...data5],
                            fill: false,
                            borderColor: '#faa93e',
                        },
                    ];
                    return {
                        datasets: finData
                    };
                });
            });
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }
    useEffect(() => {
        fetchData()
        console.log('heyy')
    }, [dayFilter])
    const downloadData1 = async (data) => {
        console.log(data)
        const zip = await JSZip.loadAsync(data);
        const file = await zip.files['your-file.csv'].async('text');
        const jsonData = JSON.parse(file); // Assuming the file contains JSON data
        const csvData = await json2csv(jsonData);
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, 'data.csv');
    }
    const downloadData = async () => {
        try {
            const endpoint = dayFilter.value !== 'Monthly' ? 'dayData' : 'monthData'
            const endpoin1 = dayFilter.value !== 'Monthly' ? 'downloadDayData' : 'downloadMonthData'
            const response = await axios.get(`http://3.132.248.171:7500/${endpoin1}`, {
                responseType: 'blob' // Set the response type to 'blob' for downloading binary data
            });

            // Create a Blob object from the response data
            const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });

            // Create a link element
            const downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(blob);
            downloadLink.setAttribute('download', `${endpoint}.xlsx`); // Set the file name

            // Append the link to the body
            document.body.appendChild(downloadLink);

            // Programmatically click the link to trigger the download
            downloadLink.click();

            // Clean up: remove the link and revoke the object URL
            downloadLink.parentNode.removeChild(downloadLink);
            window.URL.revokeObjectURL(downloadLink.href);
        } catch (error) {
            console.error('Error downloading Excel file:', error);
        }
    };

    return (
        <div style={{ width: '100%', overflow: 'hidden' }}>
            <div className="card p-3 m-3">
                <div className="d-flex mt-2">
                    <p style={{ fontSize: '24px', fontFamily: 'poppins', fontWeight: 800 }}>Live Mode</p>
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
                {/* <div className="d-flex my-2 ">
                    <p style={{ fontSize: '20px', fontFamily: 'poppins', width: '60%' }}>Current</p>
                    <p style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'poppins' }}>{liveCurrent || 0}</p>
                </div> */}
                <div style={{ width: "100%" }}>
                    <LineChart height={80} options={optionsl} data={chartData2} />
                </div>
            </div>
            <div className="card p-3 m-3">
                <div className="d-flex mt-2">
                    <p style={{ fontSize: '24px', fontFamily: 'poppins', fontWeight: 800, width: '60%' }}>Historic Mode</p>
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
                <div className='d-flex'>
                    <div className="" style={{ display: "flex", justifyContent: 'start', alignItems: "center", marginLeft: '10px' }}>
                        <h2 style={{ fontSize: "14px", fontFamily: "poppins", marginTop: '7px', marginRight: "10px" }}>Filter</h2>
                        <Select
                            styles={customStyles}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            defaultValue={{ value: "Daily", label: "Daily" }}
                            onChange={handleChange}
                            options={options}
                        />
                    </div>
                    <button className='btn btn-primary ms-2' onClick={() => downloadData()}>Download</button>
                </div>
                <div style={{ minHeight: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {loading ? (
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    ) : (
                        <div style={{ width: '100%' }}>
                            {/* <LineChart height={80} options={optionsl} data={chartData} /> */}
                            <div className='row g-2 mt-2'>
                                <CardSample header={'Temperature'} data={[70]} />
                                <CardSample header={'Humidity'} data={[50]} />
                                <CardSample header={'Voltage'} data={[40]} />
                                <CardSample header={'Power'} data={[80]} />
                                <CardSample header={'Current'} data={[30]} />
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}