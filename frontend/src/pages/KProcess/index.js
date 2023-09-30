import { Piechart } from "./piechart"
import { options, options2, options3, options4, options5, options6 } from "./data"
import co2 from '../../assets/svg/co2.png'
import waste from '../../assets/svg/garbage.png'
import water from '../../assets/svg/sea.png'
import electric from '../../assets/svg/electric.png'
import plantation from '../../assets/svg/plantation.png'
import energy from '../../assets/svg/energy2.png'
import { Productivity } from "../productivity"
import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import { getOdometer } from '../../utils'
export const KProcess = () => {
    const navigate = useNavigate()
    const Sustainability = ({ name, image, value, target }) => {
        const [hover, setHover] = useState(false)
        return (
            <div style={{ border: '1px solid #E6E6E6', padding: 5, display: 'flex', flexDirection: "column", alignItems: 'center', marginLeft: '3px' }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                <h5 style={{ fontFamily: 'Inter', marginTop: '1px', fontSize: '14px', lineHeight: '16px', fontWeight: 500 }}>
                    {name}
                </h5>
                <img src={image} alt="Girl in a jacket" width={"37%"} className="mb-2 mt-2" />
                <h5 style={{ fontFamily: 'Inter', marginTop: '10px', fontSize: '12px', lineHeight: '14px', fontWeight: 500, textAlign: "center" }}>{value}
                </h5>
                {hover && <div className="card" style={{ position: "absolute", padding: "10px", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
                    <span style={{ fontFamily: 'Inter', marginTop: '5px', fontSize: '12px', lineHeight: '14px', fontWeight: 500, textAlign: "center" }}> {target}</span>
                </div>}
            </div>
        )
    }
    return (
        <div style={{}}>
            <div className="row p-0 m-0 mb-0 mt-0 gy-1 gx-0 ms-1 mb-2" style={{ border: '0px solid black' }}>
                <div className="col-6 card gradient-color">
                    <div>
                        <h5 style={{ fontFamily: "poppins", fontWeight: 550, display: 'flex', justifyContent: "center", marginBottom: '10px', marginTop: '1px', fontSize: '22px', lineHeight: "22px", cursor: "pointer" }} onClick={() => navigate('/productivity')}>Productivity</h5>
                        <Productivity />
                    </div>
                </div>
                <div className="col-6 gy-1 gx-0 p-0" style={{ borderLeft: '0px solid black' }}>
                    <div style={{ paddingBottom: '10px', height: '400px', marginBottom: '0px', padding: '10px' }} className="mt-0 card gradient-color ms-1">
                        <h5 style={{ fontFamily: "poppins", fontWeight: 550, display: 'flex', justifyContent: "center", fontSize: '22px', lineHeight: "22px", cursor: "pointer" }} onClick={() => navigate('/sustainability')}>Sustainability</h5>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <Sustainability name="CO2 Emission" image={co2} value={"15.23 KG/Ton"} target={"Target: 14 KG/Ton"} />
                            <Sustainability name="Water Consumption" image={water} value={"45.37 m3/Ton"} target={"Meeting Water consumption target results in cost savings of about $9,250"} />
                            <Sustainability name="Waste Produced" image={waste} value={"10.25 KG/Ton"} target={"Minimum $8,870 cost savings are expected from meeting the waste reduction strategy"} />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-around", marginTop: '3px' }}>
                            <Sustainability name="Electricity Used" image={electric} value={"1.067 MWh/Ton"} target={"Target: 0.95 MWh/Ton"} />
                            <Sustainability name="Plantation" image={plantation} value={"62,378"} target={"Target: 100,000"} />
                            <Sustainability name="Energy Produced" image={energy} value={"3MWh"} target={"Reduction of energy consumption as planned directly yields cost savings to the tune of $ 245,700"} />
                        </div>
                    </div>

                    <div className="mt-2 card gradient-color ms-1">
                        <h5 style={{ fontFamily: "poppins", fontWeight: 550, display: 'flex', justifyContent: "center", fontSize: '22px', lineHeight: "22px", cursor: "pointer", marginTop: '5px' }} onClick={() => navigate('/resilience')}>Resilience</h5>
                        <div className="ps-5 pt-1" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            {getOdometer([33], { ...options, labels: ["Risk Review"] })}
                            {getOdometer([66], { ...options, labels: ["Impact Review"] })}
                            {getOdometer([85], {
                                ...options, labels: [["Business", "Continuity Plan"]], tooltip: {
                                    enabled: true,
                                    width: 50,
                                    style: {
                                        fontSize: '10px'
                                    },
                                    y: {
                                        formatter: function (value) {
                                            return "BCP assurance of 85% may cap the revenue loss under 7.8%";
                                        },
                                    }
                                },
                            })}
                        </div>
                        <div className="ps-5" style={{ display: "flex", justifyContent: "space-around" }}>
                            {getOdometer([33], {
                                ...options, labels: ["Survival Time"], tooltip: {
                                    enabled: true,
                                    width: 50,
                                    style: {
                                        fontSize: '10px'
                                    },
                                    y: {
                                        formatter: function (value) {
                                            return "Survival time in the upto 50% quartile ensures regular production for additional 3 days, meeting 100% revenues during 3 days of crisis";
                                        },
                                    }
                                },
                            })}
                            {getOdometer([66], {
                                ...options, labels: ["Revival Time"], tooltip: {
                                    enabled: true,
                                    width: 50,
                                    style: {
                                        fontSize: '10px'
                                    },
                                    y: {
                                        formatter: function (value) {
                                            return "Revival time in the 50% - 75% quantile likely impact production by 10%, hence revenues by 3%";
                                        },
                                    }
                                },
                            })}
                            {getOdometer([85], { ...options, labels: ["Cyber Security"] })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}