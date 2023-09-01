import { data, heading, roptions } from './data'
import { useState } from 'react'
import { ApexChart } from "../../components/ApexBarChart"
import { getTitle, getData, getOdometer } from '../../utils'
import { RxDotFilled } from 'react-icons/rx'
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
    return (
        <div className="p-1 m-1">
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
                    return (
                        <>{index < 6 && <div className='col-lg-6 col-md-6 col-sm-6'>
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
                        <>{index > 5 && <div className='col-lg-6 col-md-6 col-sm-6'>
                            <Card img={item.img} text={item.name} series={item.series} data={item} />
                        </div>}</>
                    )
                })}
            </div>
        </div>
    )
}