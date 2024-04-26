import { Unity, useUnityContext } from "react-unity-webgl";
import { customStyles } from '../../utils'
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { LineChart } from '../../components/LineChart'
import { MultiSensorData } from "./multiSensorData";
import { MqttSensorData } from "./mqttRealData";
import { ConnectionPopup } from "./connectionPopup";
export const DigitalTwin = () => {
    const [selectedDS, setSelectedDS] = useState(null);
    const [showModel, setShowModel] = useState(false);
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [connection,setConnection] = useState(false)

    const [details, setDetails] = useState({
        connectionName: 'PostgreSQL',
        hostName: 'abul.db.elephantsql.com',
        databaseName: 'mabpfgiu',
        userName: 'mabpfgiu',
        password: 'vzKsrtuh2PTCsQwoExC7gympinp57ADp',
        port: '5432',
        schemaName: 'postgres',
        tableName: 'retail_sales_data'
    })

    const myRef = useRef();
    const optionsl = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
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
                    text: 'Harvest Batch',
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
                    text: 'Percentage',
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
    const datasources = [
        { value: 'Manual', label: 'Manual' },
        { value: 'IOT', label: 'IOT' },
        { value: 'Operational Datastore', label: 'Operational Datastore' }
    ]
    const options = [
        { value: 'Heavy machinery', label: 'Heavy machinery' },
        { value: 'Automotive', label: 'Automotive' },
        { value: 'Paper and pulp', label: 'Paper and pulp' }
    ]

    const RenderModel = () => {
        return (
            <>
                <div ref={myRef} className="m-3">
                    <Unity unityProvider={unityProvider} style={{ width: '500px', height: '450px' }} />
                </div>
            </>
        )
    }

    const kpidata = [{
        label: "Chiller", value: "kpEnergy.csv", children: <RenderModel />, size: "xl", estimate: false
    }, {

        label: "CNC", value: "cnc.csv", children: <RenderModel />, size: "xl", estimate: false,
    }, {
        label: "Air compressor", value: "air.csv", children: <RenderModel />, size: "xl", estimate: false
    }]
    const { unityProvider } = useUnityContext({
        loaderUrl: "Build2/chillerbuild.loader.js",
        dataUrl: "Build2/chillerbuild.data",
        frameworkUrl: "Build2/chillerbuild.framework.js",
        codeUrl: "Build2/chillerbuild.wasm",
    });

    const animatedComponents = makeAnimated();
    const handleChangeDS = (selectedOption) => {
        setSelectedDS(selectedOption);
    };

    const handleChangeOrg = (selectedOption) => {
    };

    const handleChangeKpi = (selectedOption) => {
    };

    const getFilterData = () => {
        setShowModel(true);
        // fetchData()
    }

    const fetchData = async () => {
        try {
            await axios.get(`http://3.132.248.171:7500/getData15`, {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => {
                let liveData = [];
                const data = response.data.map((item, index) => {
                    const parts = item.timestamp.split('-').map(part => parseInt(part, 10));
                    const parsedTime = new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
                    if (index == 0) {
                        setStartDate(moment(parsedTime).format('MM/DD/YYYY, h:mm a'))
                    } else if (index === response.data.length - 1) {
                        setEndDate(moment(parsedTime).format('MM/DD/YYYY, h:mm a'))
                    }

                    if (index % 15 === 0 || index === response.data.length - 1) {
                        const last15Points = response.data.slice(Math.max(0, index - 14), index + 1);
                        const averageY = last15Points.reduce((sum, point) => sum + point.device_id, 0) / last15Points.length;

                        const currentTime = moment();
                        const specificDateTime = moment('12/09/2023 14:20', 'MM/DD/YYYY HH:mm');
                        const diff = currentTime.diff(specificDateTime, 'days')
                        let finalDate = currentTime.subtract(diff, 'days');
                        if (finalDate > parsedTime) {
                            liveData.push({
                                x: moment(parsedTime).format('h:mm a'), // You may want to adjust the x-axis data depending on your use case
                                y: averageY.toFixed(2)
                            })
                        }
                        if (index % 30 === 0 || index === response.data.length - 1) {
                            return {
                                x: moment(parsedTime).format('h:mm a'), // You may want to adjust the x-axis data depending on your use case
                                y: averageY.toFixed(2),
                            };
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }
                }).filter(item => item !== null);
                // setChartData2((prevChartData) => ({
                //     ...prevChartData,
                //     datasets: [
                //         {
                //             ...prevChartData.datasets[0],
                //             data: liveData,
                //         },
                //     ],
                // }));
                setChartData((prevChartData) => ({
                    ...prevChartData,
                    datasets: [
                        {
                            ...prevChartData.datasets[0],
                            data: data,
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

    const fetchRealTimeData = async () => {
        try {
            await axios.get(`http://3.132.248.171:7500/getData`, {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => {
                const data = response.data.map((item, index) => {
                    const parts = item.timestamp.split('-').map(part => parseInt(part, 10));
                    const parsedTime = new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
                    if (index == 0) {
                        setStartDate(moment(parsedTime).format('MM/DD/YYYY, h:mm a'))
                    } else if (index === response.data.length - 1) {
                        setEndDate(moment(parsedTime).format('MM/DD/YYYY, h:mm a'))
                    }

                    return {
                        x: moment(parsedTime).format('h:mm a'), // You may want to adjust the x-axis data depending on your use case
                        y: response.data[0].current_value,
                        current_value: response.data[0].current_value
                    };
                }).filter(item => item !== null);
                setChartData2((prevChartData) => ({
                    ...prevChartData,
                    datasets: [
                        {
                            ...prevChartData.datasets[0],
                            data: [...prevChartData.datasets[0].data, ...data],
                        },
                    ],
                }));
            });
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchRealTimeData()
        const intervalId = setInterval(() => {
            fetchRealTimeData()
        }, 10000 * 5) // in milliseconds
        return () => clearInterval(intervalId)
    }, [])

    const [chartData, setChartData] = useState({
        datasets: [
            {
                label: 'Historical Data',
                data: [],
                fill: false,
                borderColor: 'rgba(75, 119, 192, 1)',
            },
        ],
    });

    const [chartData2, setChartData2] = useState({
        datasets: [
            {
                label: 'Historical Data',
                data: [],
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    });
    let current = chartData2.datasets[0].data
    return (
        <>
            <div style={{ minHeight: "100vh" }}>
               <div style={{display:'flex', justifyContent:'space-between'}}>
               <div className=""
                    style={{
                        display: 'flex',
                        justifyContent: 'start',
                        alignItems: 'start',
                        marginRight: '10px',
                        marginTop: '5px',
                        padding: '10px',
                    }}
                >

                    {selectedDS?.value !== 'Manual' && <div style={{ display: 'flex' }}>
                        <div className="" style={{ display: "flex", alignItems: "center" }}>
                            <h2 style={{ fontSize: "14px", fontFamily: "poppins", marginTop: '7px', marginRight: "10px" }}>Industry</h2>
                            <Select
                                styles={{
                                    ...customStyles, container: provided => ({
                                        ...provided,
                                        minWidth: 200,
                                        maxWidth: 250,
                                        // zIndex: 9999999999,
                                        // Ensure the dropdown is rendered above other elements
                                    }),
                                }}
                                components={animatedComponents}
                                onChange={handleChangeOrg}
                                options={options}
                            />
                        </div>
                        <div className="d-flex">
                            <div className="" style={{ display: "flex", justifyContent: 'center', alignItems: "center", marginLeft: '10px' }}>
                                <h2 style={{ fontSize: "14px", fontFamily: "poppins", marginTop: '7px', marginRight: "10px" }}>Asset</h2>
                                <Select
                                    styles={customStyles}
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    // isMulti
                                    onChange={handleChangeKpi}
                                    options={kpidata}
                                />
                            </div>
                            <button
                                className=" ms-2 btn btn-primary"
                                lineHeight={'24px'}
                                height={'44px'}
                                style={{ fontSize: '12px' }}
                                // startIcon={<image src={upload} />}
                                children={'Filter'}
                                onClick={() => getFilterData()}
                            />
                        </div>
                    </div>}
                </div>
                <div className="p-2">
                    <button className="btn btn-primary" onClick={()=>setConnection(true)}>Connection</button>
                </div>
               </div>
                <div className="d-flex">
                    {showModel && RenderModel()}
                    {/* <div className="d-flex"> */}
                    {false ? <div style={{ width: '100%', overflow: 'hidden' }}>
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
                                <p style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'poppins' }}>{current[current.length - 1]?.current_value || 0}</p>
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
                    </div> : <> {showModel  && <MqttSensorData {...{details,setDetails,showModel,setConnection}} />}</>}
                    <ConnectionPopup {...{connection,setConnection,details,setDetails,setShowModel}}/>
                </div>
            </div>
            {/* </div> */}
        </>
    )
}