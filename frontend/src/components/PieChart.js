import React from "react";
import Chart from 'react-apexcharts'

export default function PieChart({ performanceData, options,width,height,series=[] }) {

  return <div className="donut" style={{display:"flex",justifyContent:"center"}}>
    <Chart options={options} series={series ? series :options.series} type="donut" width={width?width:'403px'} height={height} />
  </div>
    ;

}


