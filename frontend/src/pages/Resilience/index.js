import { heading, roptions } from './data'
import { useState, useEffect, useRef } from 'react'
import { ApexChart } from "../../components/ApexBarChart"
import { getTitle, getData, getOdometer } from '../../utils'
import { RxDotFilled } from 'react-icons/rx'
import cyber from '../../assets/svg/cyber.png'
import vulner from '../../assets/svg/vulnar.png'
import inci from '../../assets/svg/incident.png'
import config from '../../assets/svg/config.png'
import risk from '../../assets/svg/risks.png'
import train from '../../assets/svg/train.png'
import cont from '../../assets/svg/conti.png'
import com from '../../assets/svg/commun.png'
import ser from '../../assets/svg/service.png'
import build from '../../assets/svg/build.png'
import axios from 'axios'
import { namesResSort, getApiData } from './data'
const ADAPTERS_BASE_URL = process.env.REACT_APP_BASE_URL;

export const Resilience = () => {
    const Card = ({ img, text, series, data }) => {
        const [show, setShow] = useState(false)
        const [label, setLabel] = useState("")
        const [hover, setHover] = useState("")
        const handleClose = () => {
            setShow(false)
        }
        return (
            <div className='ps-4 pe-4 pt-3' style={{ border: "2px solid #E6E6E6", borderRadius: '0px', alignItems: 'center' }}>
                <div className='d-flex justify-content-between' >
                    <h5 style={{ fontFamily: "Inter", fontSize: '18px', fontWeight: 600, height: '50px', marginBottom: '0px', width: "220px" }}>{text}</h5>
                    <div style={{ height: '20px', justifyContent: 'space-around', display: "flex", alignItems: "center", width: "45px", borderRadius: "50px" }}>
                        <div style={{ display: "flex", justifyContent: 'start' }} onClick={() => { setShow(true) }}><RxDotFilled cursor={"pointer"} color='#427ae3' onClick={() => { setLabel("inf") }} onMouseEnter={() => setHover("inf")} onMouseLeave={() => { setHover("") }} /> <RxDotFilled cursor={"pointer"} color='#800080' onClick={() => { setLabel("rec") }} onMouseEnter={() => setHover("rec")} onMouseLeave={() => { setHover("") }} /> <RxDotFilled cursor={"pointer"} color='#39c734' onClick={() => { setLabel("pre") }} onMouseEnter={() => setHover("pre")} onMouseLeave={() => { setHover("") }} /></div>
                        <div>
                            {/* <button className='btn btn-primary mb-2' onClick={() => setShow(!show)}>IPR</button> */}
                            {hover == "inf" && <div className='card p-1' style={{ position: 'absolute', marginLeft: "0px", marginTop: "-20px", zIndex: 9999, alignItems: 'center' }}>
                                Inferences
                            </div>}
                            {hover == "rec" && <div className='card p-1' style={{ position: 'absolute', marginLeft: "0px", marginTop: "-20px", zIndex: 9999, alignItems: 'center' }}>
                                Recommendations
                            </div>}
                            {hover == "pre" && <div className='card p-1' style={{ position: 'absolute', marginLeft: "0px", marginTop: "-20px", zIndex: 9999, alignItems: 'center' }}>
                                Predictions
                            </div>}
                            {show && <div className='card p-2' style={{ position: 'absolute', marginLeft: "-300px", marginTop: "-20px", zIndex: 9999, width: '250px' }}>
                                {label === "inf" && <div>
                                    {getTitle("Inferences", "#427ae3", handleClose)}
                                    <>{data.inferences?.length > 0 ? getOdometer(data?.inferences) : <li className='m-0 p-0' style={{ fontFamily: "poppins", fontWeight: 400, fontSize: '12px', width: '190px', listStyle: 'none' }}>No Inferences Found!</li>}</>
                                </div>}
                                {label === "rec" && <div>
                                    {getTitle("Recommendations", "#800080", handleClose)}
                                    {data.recomondations?.length > 0 ? getData(data.recomondations, "#800080") : <li className='m-0 p-0' style={{ fontFamily: "poppins", fontWeight: 400, fontSize: '12px', width: '190px', listStyle: 'none' }}>No Recommendations Found!</li>}

                                </div>}
                                {label === "pre" && <div className=''>
                                    {getTitle("Predictions", "#39c734", handleClose)}
                                    <>{data.predictions?.length > 0 ? getData(data?.predictions, "#39c734") : <li className='m-0 p-0' style={{ fontFamily: "poppins", fontWeight: 400, fontSize: '12px', width: '190px', listStyle: 'none' }}>No Predictions Found!</li>}</>
                                </div>}
                            </div>}
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-between' style={{ alignItems: 'center' }}>
                    <img src={img} alt="img" height={"100px"} className='mt-0' />
                    <div style={{ position: 'relative', }}>
                        <ApexChart series={series} options={roptions} width={"100%"} />
                    </div>
                </div>
            </div>
        )
    }
    const [apidata, setApiData] = useState([])
    const fetchData = async () => {
        try {
            await axios.get(`${ADAPTERS_BASE_URL}/resilience/getData`).then((response) => {
                setApiData(response?.data.result);
            });
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    const fileInputRef = useRef(null); // Explicit type
    const handleFileChange = (event) => {
        handleUpload(event.target.files)
    };
    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleUpload = async (data) => {
        var formData = new FormData();
        const finalData = []
        for (let i = 0; i < data.length; i++) {
            finalData.push(data[i])
        }
        const uploadData = []
        namesResSort.map(sortingObj => {
            finalData.filter((item) => {
                if (item.name == sortingObj.file) {
                    uploadData.push(item)
                }
            })
        });

        for (let i = 0; i < uploadData.length; i++) {
            formData.append('file', uploadData[i]);
        }
        try {
            await axios.post(`${ADAPTERS_BASE_URL}/resilience/FileUpload`, formData)
                .then((response) => {
                    fetchData()
                });
        } catch (err) {
            console.log(err)
        }
    }


    let finalData = {
        data1: getApiData(apidata?.filter((item) => item.name === "kpCSP.csv")) || [],
        data2: getApiData(apidata?.filter((item) => item.name === "kpRMI.csv")) || [],
        data3: getApiData(apidata?.filter((item) => item.name === "kpCST.csv")) || [],
        data4: getApiData(apidata?.filter((item) => item.name === "kpVMR.csv")) || [],
        data5: getApiData(apidata?.filter((item) => item.name === "kpCSM.csv")) || [],
        data6: getApiData(apidata?.filter((item) => item.name === "kpBCP.csv")) || [],
        data7: getApiData(apidata?.filter((item) => item.name === "kpIM.csv")) || [],
        data8: getApiData(apidata?.filter((item) => item.name === "kpPF.csv")) || [],
        data9: getApiData(apidata?.filter((item) => item.name === "kpCCM.csv")) || [],
        data10: getApiData(apidata?.filter((item) => item.name === "kpCOMM.csv")) || []
    }
    const data = [
        {
            img: cyber,
            name: "Cyber Security Policy Creation and Distribution",
            series: [{
                name: 'Planned',
                data: finalData.data1
            }],
            inferences: [66],
            recomondations: ["Adhere to planned activities"],
            predictions: []
        },
        {
            img: risk,
            name: "Risk Management Initiatives",
            series: [{
                name: 'Planned',
                data: finalData.data2
            }],
            inferences: [33],
            recomondations: ["Make up missed/lost activities"],
            predictions: []
        },
        {
            img: train,
            name: "Cyber Security Training",
            series: [{
                name: 'Planned',
                data: finalData.data3
            }],
            inferences: [58],
            recomondations: ["Adhere to planned activities"],
            predictions: []
        },
        {
            img: vulner,
            name: "Vulnerability Management Reviews",
            series: [{
                name: 'Planned',
                data: finalData.data4
            }],
            inferences: [25],
            recomondations: ["Make up missed/lost activities"],
            predictions: []
        },
        {
            img: cont,
            name: "Continuity Supervision Meetings",
            series: [{
                name: 'Planned',
                data: finalData.data5
            }],
            inferences: [45],
            recomondations: ["Adhere to planned activities"],
            predictions: []
        },
        ({
            img: build,
            name: "Mock BCP Drills",
            series: [{
                name: 'Planned',
                data: finalData.data6
            }],
            inferences: [33],
            recomondations: ["Make up missed/lost activities"],
            predictions: []
        }),
        ({
            img: inci,
            name: "Incident Management",
            series: [{
                name: 'Occurred',
                data: finalData.data7
            }],
            inferences: [100],
            recomondations: ["Keep up Good work"],
            predictions: ["Incident forecast over next 3 months - 2, 0, 0"]
        }),
        ({
            img: ser,
            name: "Continuity of Service and Management (Post Facto)",
            series: [{
                name: 'Occurred',
                data: finalData.data8
            }],
            inferences: [100],
            recomondations: ["Keep up Good work"],
            predictions: []
        }),
        ({
            img: config,
            name: "Configuration and Change Management",
            series: [{
                name: 'Planned',
                data: finalData.data9
            }],
            inferences: [50],
            recomondations: ["Adhere to planned activities"],
            predictions: []
        }),
        ({
            img: com,
            name: "Communications",
            series: [{
                name: 'Planned',
                data: finalData.data10
            }],
            inferences: [66],
            recomondations: ["Adhere to planned activities"],
            predictions: ["Expected communications over next 3 months - 5, 4, 4"]
        })
    ]

    return (
        <div className="p-1 m-1">
            <div
                item
                style={{
                    display: 'flex',
                    // padding: '12px 32px',
                    justifyContent: 'end',
                    alignItems: 'center',
                    // gap: '8px',
                    alignSelf: 'stretch',
                    marginRight: '10px',
                    marginTop: '5px'
                }}
            >
                <button
                    className="btn btn-primary"
                    lineHeight={'24px'}
                    height={'44px'}
                    // startIcon={<image src={upload} />}
                    children={'Upload CSV File'}
                    onClick={() => handleButtonClick()}
                />{' '}
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    multiple={true}
                    accept="*"
                />
            </div>
            <div className='row gy-2 gx-3 mt-2 flex-wrap'>
                {heading.map((item, index) => {
                    return (
                        <>{index < 2 && <div className="col-lg-6 col-md-6 col-sm-6">
                            <div style={{ background: '#34b4eb', fontFamily: "Inter" }} className='pt-2 pb-2 text-center text-white'>
                                {/* <span className='lightcolor' style={{ position: 'absolute', left: 300 }}>{item.num}</span> */}
                                <h3 className='text-center mt-2' style={{ fontSize: '22px' }}>{item.name}</h3>
                            </div>
                        </div>}</>
                    )
                })}
            </div>
            <div className="row gy-3 gx-3 mt-2">
                {data.map((item, index) => {
                    console.log(item.series[0].data)
                    return (
                        <>{(item.series[0].data.length > 0 && index < 6) && <div className='col-lg-6 col-md-6 col-sm-6'>
                            <Card img={item.img} text={item.name} series={item.series} data={item} />
                        </div>}</>
                    )
                })}
            </div>
            <div className='row gy-2 gx-3 mt-2 flex-wrap'>
                {heading.map((item, index) => {
                    return (
                        <>{index >= 2 && <div className="col-lg-6 col-md-6 col-sm-6">
                            <div style={{ background: '#34b4eb', fontFamily: "Inter" }} className='pt-2 pb-2 text-center text-white'>
                                {/* <span className='lightcolor' style={{ position: 'absolute', left: 300 }}>{item.num}</span> */}
                                <h3 className='text-center mt-2' style={{ fontSize: '22px' }}>{item.name}</h3>
                            </div>
                        </div>}</>
                    )
                })}
            </div>
            <div className="row gy-3 gx-3 mt-2">
                {data.map((item, index) => {
                    return (
                        <>{(item.series[0].data.length  > 0 && index > 5) && <div className='col-lg-6 col-md-6 col-sm-6'>
                            <Card img={item.img} text={item.name} series={item.series} data={item} />
                        </div>}</>
                    )
                })}
            </div>
        </div>
    )
}