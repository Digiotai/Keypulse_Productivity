import { ApexChart } from "../../components/ApexBarChart"
import { options1, series1, options2, series2, dounut1, options3, series3, dounut2, seriesplantation, optionsplantation, data } from "./data"
import PieChart from "../../components/PieChart"
import { LineChart } from "../../components/LineChart"
import { useState, useEffect, useRef } from "react"
import { getTitle, getData } from "../../utils"
import { RxDotFilled } from 'react-icons/rx'
import { altEnergyData, co2Data, energyData, namesSusSort, plantationData, wasteData, waterData } from "./apiData"
import axios from 'axios'
const ADAPTERS_BASE_URL = process.env.REACT_APP_BASE_URL;

export const Sustainability = () => {
    const [show, setShow] = useState(false)
    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)
    const [show3, setShow3] = useState(false)
    const [show4, setShow4] = useState(false)
    const [show5, setShow5] = useState(false)
    const [label, setLabel] = useState("")
    const [label1, setLabel1] = useState("")
    const [label2, setLabel2] = useState("")
    const [label3, setLabel3] = useState("")
    const [label4, setLabel4] = useState("")
    const [label5, setLabel5] = useState("")
    const [hover, setHover] = useState("")
    const [hover1, setHover1] = useState("")
    const [hover2, setHover2] = useState("")
    const [hover3, setHover3] = useState("")
    const [hover4, setHover4] = useState("")
    const [hover5, setHover5] = useState("")
    const [apidata, setApiData] = useState([])

    const fetchData = async () => {
        try {
            await axios.get(`${ADAPTERS_BASE_URL}/sustainability/getData`).then((response) => {
                // console.log(response.data)
                // const data = JSON.parse(response?.data)
                // const data = response?.data
                // console.log(JSON.parse(data))
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
    const [file, setFile] = useState([])

    const handleFileChange = (event) => {
        // const selectedFile = event.target.files;
        handleUpload(event.target.files)
        // setFile(selectedFile)
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
        namesSusSort.map(sortingObj => {
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
            await axios.post(`${ADAPTERS_BASE_URL}/sustainability/FileUpload`, formData)
                .then((response) => {
                    fetchData()
                });
        } catch (err) {
            console.log(err)
        }
    }




    const handleGetData = (name, data5) => {
        switch (name) {
            case 'kpEnergy.csv':
                return <div className="col-4">
                    <div style={{ border: '1px solid #E6E6E6', padding: '2px', margin: '5px 0px 5px 5px' }}>
                        <div className="d-flex justify-content-between">
                            <h6 style={{ fontFamily: "poppins", fontWeight: 500, fontSize: '18px', fontWeight: 600, display: 'flex', justifyContent: "start" }}>Energy {" (KWH)"}</h6>
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
                                            {getTitle("Inferences", "#427ae3", () => setShow(false))}
                                            <>{data[0].inferences?.length > 0 ? getData(data[0].inferences, "#427ae3") : <li className='m-0 p-0' style={{ fontFamily: "poppins", fontWeight: 400, fontSize: '12px', width: '190px', listStyle: 'none' }}>No Inferences Found!</li>}</>
                                        </div>}
                                        {label === "rec" && <div>
                                            {getTitle("Recommendations", "#800080", () => setShow(false))}
                                            {data[0].recomondations?.length > 0 ? getData(data[0].recomondations, "#800080") : <li className='m-0 p-0' style={{ fontFamily: "poppins", fontWeight: 400, fontSize: '12px', width: '190px', listStyle: 'none' }}>No Recommendations Found!</li>}

                                        </div>}
                                        {label === "pre" && <div className=''>
                                            {getTitle("Predictions", "#39c734", () => setShow(false))}
                                            <>{data[0].predictions?.length > 0 ? getData(data[0].predictions, "#39c734") : <li className='m-0 p-0' style={{ fontFamily: "poppins", fontWeight: 400, fontSize: '12px', width: '190px', listStyle: 'none' }}>No Predictions Found!</li>}</>
                                        </div>}
                                    </div>}
                                </div>
                            </div>
                        </div>
                        <div style={{ minHeight: "265px", maxHeight: "265px", width: "100%" }}>
                            <ApexChart series={energyData(data5)} options={options1} height={"250px"} width={"100%"} />
                        </div>
                    </div>
                </div>
            case 'kpWaste.csv':
                return <div className="col-4">
                    <div style={{ border: '1px solid #E6E6E6', padding: '2px', margin: '5px 0px 5px 5px' }}>
                        <div className="d-flex justify-content-between">
                            <h6 style={{ fontFamily: "poppins", fontWeight: 500, fontSize: '18px', fontWeight: 600, display: 'flex', justifyContent: "start" }}>Waste {"(Tons)"}</h6>
                            <div style={{ height: '20px', justifyContent: 'space-around', display: "flex", alignItems: "center", width: "45px", borderRadius: "50px" }}>
                                <div style={{ display: "flex", justifyContent: 'start' }} onClick={() => { setShow1(true) }}><RxDotFilled cursor={"pointer"} color='#427ae3' onClick={() => { setLabel1("inf") }} onMouseEnter={() => setHover1("inf")} onMouseLeave={() => { setHover1("") }} /> <RxDotFilled cursor={"pointer"} color='#800080' onClick={() => { setLabel1("rec") }} onMouseEnter={() => setHover1("rec")} onMouseLeave={() => { setHover1("") }} /> <RxDotFilled cursor={"pointer"} color='#39c734' onClick={() => { setLabel1("pre") }} onMouseEnter={() => setHover1("pre")} onMouseLeave={() => { setHover1("") }} /></div>
                                <div>
                                    {/* <button className='btn btn-primary mb-2' onClick={() => setShow(!show)}>IPR</button> */}
                                    {hover1 == "inf" && <div className='card p-1' style={{ position: 'absolute', marginLeft: "0px", marginTop: "-20px", zIndex: 9999, alignItems: 'center' }}>
                                        Inferences
                                    </div>}
                                    {hover1 == "rec" && <div className='card p-1' style={{ position: 'absolute', marginLeft: "0px", marginTop: "-20px", zIndex: 9999, alignItems: 'center' }}>
                                        Recommendations
                                    </div>}
                                    {hover1 == "pre" && <div className='card p-1' style={{ position: 'absolute', marginLeft: "0px", marginTop: "-20px", zIndex: 9999, alignItems: 'center' }}>
                                        Predictions
                                    </div>}
                                    {show1 && <div className='card p-2' style={{ position: 'absolute', marginLeft: "-300px", marginTop: "-20px", zIndex: 9999, width: '250px' }}>
                                        {label1 === "inf" && <div>
                                            {getTitle("Inferences", "#427ae3", () => setShow1(false))}
                                            <>{data[1].inferences?.length > 0 ? getData(data[1].inferences, "#427ae3") : <li className='m-0 p-0' style={{ fontFamily: "poppins", fontWeight: 400, fontSize: '12px', width: '190px', listStyle: 'none' }}>No Inferences Found!</li>}</>
                                        </div>}
                                        {label1 === "rec" && <div>
                                            {getTitle("Recommendations", "#800080", () => setShow1(false))}
                                            {data[1].recomondations?.length > 0 ? getData(data[1].recomondations, "#800080") : <li className='m-0 p-0' style={{ fontFamily: "poppins", fontWeight: 400, fontSize: '12px', width: '190px', listStyle: 'none' }}>No Recommendations Found!</li>}

                                        </div>}
                                        {label1 === "pre" && <div className=''>
                                            {getTitle("Predictions", "#39c734", () => setShow1(false))}
                                            <>{data[1].predictions?.length > 0 ? getData(data[1].predictions, "#39c734") : <li className='m-0 p-0' style={{ fontFamily: "poppins", fontWeight: 400, fontSize: '12px', width: '190px', listStyle: 'none' }}>No Predictions Found!</li>}</>
                                        </div>}
                                    </div>}
                                </div>
                            </div>
                        </div>
                        <div style={{ minHeight: "265px", maxHeight: "265px", width: "100%" }}>
                            <ApexChart series={wasteData(data5)} options={options2} height={"250px"} width={"100%"} />
                        </div>
                    </div>
                </div>
            case 'kpPlantation.csv':
                return <div className="col-4">
                    <div style={{ border: '1px solid #E6E6E6', padding: '2px', margin: '5px 0px 5px 5px' }}>
                        <div className="d-flex justify-content-between">
                            <h6 style={{ fontFamily: "poppins", fontWeight: 500, fontSize: '18px', fontWeight: 600, display: 'flex', justifyContent: "start" }}>Plantation</h6>
                            <div style={{ height: '20px', justifyContent: 'space-around', display: "flex", alignItems: "center", width: "45px", borderRadius: "50px" }}>
                                <div style={{ display: "flex", justifyContent: 'start' }} onClick={() => { setShow2(true) }}><RxDotFilled cursor={"pointer"} color='#427ae3' onClick={() => { setLabel2("inf") }} onMouseEnter={() => setHover2("inf")} onMouseLeave={() => { setHover2("") }} /> <RxDotFilled cursor={"pointer"} color='#800080' onClick={() => { setLabel2("rec") }} onMouseEnter={() => setHover2("rec")} onMouseLeave={() => { setHover2("") }} /> <RxDotFilled cursor={"pointer"} color='#39c734' onClick={() => { setLabel2("pre") }} onMouseEnter={() => setHover2("pre")} onMouseLeave={() => { setHover2("") }} /></div>
                                <div>
                                    {/* <button className='btn btn-primary mb-2' onClick={() => setShow(!show)}>IPR</button> */}
                                    {hover2 == "inf" && <div className='card p-1' style={{ position: 'absolute', marginLeft: "-150px", marginTop: "-20px", zIndex: 9999, alignItems: 'center' }}>
                                        Inferences
                                    </div>}
                                    {hover2 == "rec" && <div className='card p-1' style={{ position: 'absolute', marginLeft: "-200px", marginTop: "-20px", zIndex: 9999, alignItems: 'center' }}>
                                        Recommendations
                                    </div>}
                                    {hover2 == "pre" && <div className='card p-1' style={{ position: 'absolute', marginLeft: "-150px", marginTop: "-20px", zIndex: 9999, alignItems: 'center' }}>
                                        Predictions
                                    </div>}
                                    {show2 && <div className='card p-2' style={{ position: 'absolute', marginLeft: "-300px", marginTop: "-20px", zIndex: 9999, width: '250px' }}>
                                        {label2 === "inf" && <div>
                                            {getTitle("Inferences", "#427ae3", () => setShow2(false))}
                                            <>{data[2].inferences?.length > 0 ? getData(data[2].inferences, "#427ae3") : <li className='m-0 p-0' style={{ fontFamily: "poppins", fontWeight: 400, fontSize: '12px', width: '190px', listStyle: 'none' }}>No Inferences Found!</li>}</>
                                        </div>}
                                        {label2 === "rec" && <div>
                                            {getTitle("Recommendations", "#800080", () => setShow2(false))}
                                            {data[2].recomondations?.length > 0 ? getData(data[2].recomondations, "#800080") : <li className='m-0 p-0' style={{ fontFamily: "poppins", fontWeight: 400, fontSize: '12px', width: '190px', listStyle: 'none' }}>No Recommendations Found!</li>}

                                        </div>}
                                        {label2 === "pre" && <div className=''>
                                            {getTitle("Predictions", "#39c734", () => setShow2(false))}
                                            <>{data[2].predictions?.length > 0 ? getData(data[2].predictions, "#39c734") : <li className='m-0 p-0' style={{ fontFamily: "poppins", fontWeight: 400, fontSize: '12px', width: '190px', listStyle: 'none' }}>No Predictions Found!</li>}</>
                                        </div>}
                                    </div>}
                                </div>
                            </div>
                        </div>
                        <div style={{ minHeight: "265px", maxHeight: "265px", width: "100%" }}>
                            <ApexChart series={plantationData(data5)} options={optionsplantation} height={"250px"} width={"100%"} />
                        </div>
                    </div>
                </div>
            case 'kpWater.csv':
                return <div className="col-4">
                    <div style={{ border: '1px solid #E6E6E6', padding: '2px', margin: '5px 0px 5px 5px' }}>
                        <div className="d-flex justify-content-between">
                            <h6 style={{ fontFamily: "poppins", fontWeight: 500, fontSize: '18px', fontWeight: 600, display: 'flex', justifyContent: "start" }}>Water {" (Kilolitres)"}</h6>
                            <div style={{ height: '20px', justifyContent: 'space-around', display: "flex", alignItems: "center", width: "45px", borderRadius: "50px" }}>
                                <div style={{ display: "flex", justifyContent: 'start' }} onClick={() => { setShow3(true) }}><RxDotFilled cursor={"pointer"} color='#427ae3' onClick={() => { setLabel3("inf") }} onMouseEnter={() => setHover3("inf")} onMouseLeave={() => { setHover3("") }} /> <RxDotFilled cursor={"pointer"} color='#800080' onClick={() => { setLabel3("rec") }} onMouseEnter={() => setHover3("rec")} onMouseLeave={() => { setHover3("") }} /> <RxDotFilled cursor={"pointer"} color='#39c734' onClick={() => { setLabel3("pre") }} onMouseEnter={() => setHover3("pre")} onMouseLeave={() => { setHover3("") }} /></div>
                                <div>
                                    {/* <button className='btn btn-primary mb-2' onClick={() => setShow(!show)}>IPR</button> */}
                                    {hover3 == "inf" && <div className='card p-1' style={{ position: 'absolute', marginLeft: "-150px", marginTop: "-20px", zIndex: 9999, alignItems: 'center' }}>
                                        Inferences
                                    </div>}
                                    {hover3 == "rec" && <div className='card p-1' style={{ position: 'absolute', marginLeft: "-200px", marginTop: "-20px", zIndex: 9999, alignItems: 'center' }}>
                                        Recommendations
                                    </div>}
                                    {hover3 == "pre" && <div className='card p-1' style={{ position: 'absolute', marginLeft: "-150px", marginTop: "-20px", zIndex: 9999, alignItems: 'center' }}>
                                        Predictions
                                    </div>}
                                    {show3 && <div className='card p-2' style={{ position: 'absolute', marginLeft: "-300px", marginTop: "-20px", zIndex: 9999, width: '250px' }}>
                                        {label3 === "inf" && <div>
                                            {getTitle("Inferences", "#427ae3", () => setShow3(false))}
                                            <>{data[3].inferences?.length > 0 ? getData(data[3].inferences, "#427ae3") : <li className='m-0 p-0' style={{ fontFamily: "poppins", fontWeight: 400, fontSize: '12px', width: '190px', listStyle: 'none' }}>No Inferences Found!</li>}</>
                                        </div>}
                                        {label3 === "rec" && <div>
                                            {getTitle("Recommendations", "#800080", () => setShow3(false))}
                                            {data[3].recomondations?.length > 0 ? getData(data[3].recomondations, "#800080") : <li className='m-0 p-0' style={{ fontFamily: "poppins", fontWeight: 400, fontSize: '12px', width: '190px', listStyle: 'none' }}>No Recommendations Found!</li>}

                                        </div>}
                                        {label3 === "pre" && <div className=''>
                                            {getTitle("Predictions", "#39c734", () => setShow3(false))}
                                            <>{data[3].predictions?.length > 0 ? getData(data[3].predictions, "#39c734") : <li className='m-0 p-0' style={{ fontFamily: "poppins", fontWeight: 400, fontSize: '12px', width: '190px', listStyle: 'none' }}>No Predictions Found!</li>}</>
                                        </div>}
                                    </div>}
                                </div>
                            </div>
                        </div>
                        <div style={{ minHeight: "265px", maxHeight: "265px", width: "100%" }}>
                            <ApexChart series={waterData(data5)} options={options3} height={"250px"} width={"100%"} />
                        </div>
                    </div>
                </div>
            case 'kpAltEnergy.csv':
                return <div className="col-4">
                    <div style={{ border: '1px solid #E6E6E6', padding: '2px', margin: '5px 0px 5px 5px' }}>
                        <div className="d-flex justify-content-between">
                            <h6 style={{ fontFamily: "poppins", fontWeight: 500, fontSize: '18px', fontWeight: 600, display: 'flex', justifyContent: "start" }}>Alternate Energy</h6>
                            <div style={{ height: '20px', justifyContent: 'space-around', display: "flex", alignItems: "center", width: "45px", borderRadius: "50px" }}>
                                <div style={{ display: "flex", justifyContent: 'start' }} onClick={() => { setShow4(true) }}><RxDotFilled cursor={"pointer"} color='#427ae3' onClick={() => { setLabel4("inf") }} onMouseEnter={() => setHover4("inf")} onMouseLeave={() => { setHover4("") }} /> <RxDotFilled cursor={"pointer"} color='#800080' onClick={() => { setLabel4("rec") }} onMouseEnter={() => setHover4("rec")} onMouseLeave={() => { setHover4("") }} /> <RxDotFilled cursor={"pointer"} color='#39c734' onClick={() => { setLabel4("pre") }} onMouseEnter={() => setHover4("pre")} onMouseLeave={() => { setHover4("") }} /></div>
                                <div>
                                    {/* <button className='btn btn-primary mb-2' onClick={() => setShow(!show)}>IPR</button> */}
                                    {hover4 == "inf" && <div className='card p-1' style={{ position: 'absolute', marginLeft: "0px", marginTop: "-20px", zIndex: 9999, alignItems: 'center' }}>
                                        Inferences
                                    </div>}
                                    {hover4 == "rec" && <div className='card p-1' style={{ position: 'absolute', marginLeft: "0px", marginTop: "-20px", zIndex: 9999, alignItems: 'center' }}>
                                        Recommendations
                                    </div>}
                                    {hover4 == "pre" && <div className='card p-1' style={{ position: 'absolute', marginLeft: "0px", marginTop: "-20px", zIndex: 9999, alignItems: 'center' }}>
                                        Predictions
                                    </div>}
                                    {show4 && <div className='card p-2' style={{ position: 'absolute', marginLeft: "-300px", marginTop: "-20px", zIndex: 9999, width: '250px' }}>
                                        {label4 === "inf" && <div>
                                            {getTitle("Inferences", "#427ae3", () => setShow4(false))}
                                            <>{data[4].inferences?.length > 0 ? getData(data[4].inferences, "#427ae3") : <li className='m-0 p-0' style={{ fontFamily: "poppins", fontWeight: 400, fontSize: '12px', width: '190px', listStyle: 'none' }}>No Inferences Found!</li>}</>
                                        </div>}
                                        {label4 === "rec" && <div>
                                            {getTitle("Recommendations", "#800080", () => setShow4(false))}
                                            {data[4].recomondations?.length > 0 ? getData(data[4].recomondations, "#800080") : <li className='m-0 p-0' style={{ fontFamily: "poppins", fontWeight: 400, fontSize: '12px', width: '190px', listStyle: 'none' }}>No Recommendations Found!</li>}

                                        </div>}
                                        {label4 === "pre" && <div className=''>
                                            {getTitle("Predictions", "#39c734", () => setShow4(false))}
                                            <>{data[4].predictions?.length > 0 ? getData(data[4].predictions, "#39c734") : <li className='m-0 p-0' style={{ fontFamily: "poppins", fontWeight: 400, fontSize: '12px', width: '190px', listStyle: 'none' }}>No Predictions Found!</li>}</>
                                        </div>}
                                    </div>}
                                </div>
                            </div>
                        </div>
                        <div style={{ minHeight: "265px", maxHeight: "260px", width: "100%" }}>
                            <PieChart options={dounut1} series={altEnergyData(data5)} width={"100%"} height={"280px"} />
                        </div>
                    </div>
                </div>
            case 'kpco2.csv':
                return <div className="col-4">
                    <div style={{ border: '1px solid #E6E6E6', padding: '2px', margin: '5px 0px 5px 5px' }}>
                        <div className="d-flex justify-content-between">
                            <h6 style={{ fontFamily: "poppins", fontWeight: 500, fontSize: '18px', fontWeight: 600, display: 'flex', justifyContent: "start" }}>CO2 Emission</h6>
                            <div style={{ height: '20px', justifyContent: 'space-around', display: "flex", alignItems: "center", width: "45px", borderRadius: "50px" }}>
                                <div style={{ display: "flex", justifyContent: 'start' }} onClick={() => { setShow5(true) }}><RxDotFilled cursor={"pointer"} color='#427ae3' onClick={() => { setLabel5("inf") }} onMouseEnter={() => setHover5("inf")} onMouseLeave={() => { setHover5("") }} /> <RxDotFilled cursor={"pointer"} color='#800080' onClick={() => { setLabel5("rec") }} onMouseEnter={() => setHover5("rec")} onMouseLeave={() => { setHover5("") }} /> <RxDotFilled cursor={"pointer"} color='#39c734' onClick={() => { setLabel5("pre") }} onMouseEnter={() => setHover5("pre")} onMouseLeave={() => { setHover5("") }} /></div>
                                <div>
                                    {/* <button className='btn btn-primary mb-2' onClick={() => setShow(!show)}>IPR</button> */}
                                    {hover5 == "inf" && <div className='card p-1' style={{ position: 'absolute', marginLeft: "-150px", marginTop: "-20px", zIndex: 9999, alignItems: 'center' }}>
                                        Inferences
                                    </div>}
                                    {hover5 == "rec" && <div className='card p-1' style={{ position: 'absolute', marginLeft: "-200px", marginTop: "-20px", zIndex: 9999, alignItems: 'center' }}>
                                        Recommendations
                                    </div>}
                                    {hover5 == "pre" && <div className='card p-1' style={{ position: 'absolute', marginLeft: "-150px", marginTop: "-20px", zIndex: 9999, alignItems: 'center' }}>
                                        Predictions
                                    </div>}
                                    {show5 && <div className='card p-2' style={{ position: 'absolute', marginLeft: "-300px", marginTop: "-20px", zIndex: 9999, width: '250px' }}>
                                        {label5 === "inf" && <div>
                                            {getTitle("Inferences", "#427ae3", () => setShow5(false))}
                                            <>{data[5].inferences?.length > 0 ? getData(data[5].inferences, "#427ae3") : <li className='m-0 p-0' style={{ fontFamily: "poppins", fontWeight: 400, fontSize: '12px', width: '190px', listStyle: 'none' }}>No Inferences Found!</li>}</>
                                        </div>}
                                        {label5 === "rec" && <div>
                                            {getTitle("Recommendations", "#800080", () => setShow5(false))}
                                            {data[5].recomondations?.length > 0 ? getData(data[5].recomondations, "#800080") : <li className='m-0 p-0' style={{ fontFamily: "poppins", fontWeight: 400, fontSize: '12px', width: '190px', listStyle: 'none' }}>No Recommendations Found!</li>}

                                        </div>}
                                        {label5 === "pre" && <div className=''>
                                            {getTitle("Predictions", "#39c734", () => setShow5(false))}
                                            <>{data[5].predictions?.length > 0 ? getData(data[5].predictions, "#39c734") : <li className='m-0 p-0' style={{ fontFamily: "poppins", fontWeight: 400, fontSize: '12px', width: '190px', listStyle: 'none' }}>No Predictions Found!</li>}</>
                                        </div>}
                                    </div>}
                                </div>
                            </div>
                        </div>
                        <div style={{ minHeight: "265px", maxHeight: "265px", width: "100%" }}>
                            <LineChart height={"260px"} width={"100%"} data={co2Data(data5)}/>
                        </div>
                    </div>
                </div>
        }
    }



    return (
        <div className="row ms-1">
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
            <div className="row gx-1 gy-1 p-2 pt-0">
                {apidata?.map((item) => {
                    if (item.name == "kpEnergy.csv") {
                        console.log(item)
                        return handleGetData(item.name, item.data)
                    }
                })}
                {apidata?.map((item) => {
                    if (item.name == "kpWaste.csv") {
                        return handleGetData(item.name, item.data)
                    }
                })}
                {apidata?.map((item) => {
                    if (item.name == "kpPlantation.csv") {
                        return handleGetData(item.name, item.data)
                    }
                })}
                {apidata?.map((item) => {
                    if (item.name == "kpWater.csv") {
                        return handleGetData(item.name, item.data)
                    }
                })}
                {apidata?.map((item) => {
                    if (item.name == "kpAltEnergy.csv") {
                        return handleGetData(item.name, item.data)
                    }
                })}
                {apidata?.map((item) => {
                    if (item.name == "kpUptime.csv") {
                        return handleGetData(item.name, item.data)
                    }
                })}
                {apidata?.map((item) => {
                    if (item.name == "kpThroughput.csv") {
                        return handleGetData(item.name, item.data)
                    }
                })}
                {apidata?.map((item) => {
                    if (item.name == "kpco2.csv") {
                        return handleGetData(item.name, item.data)
                    }
                })}
            </div>
        </div>
    )
}
