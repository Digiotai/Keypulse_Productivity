export var options = {
    chart: {
        height: 350,
        type: 'radialBar',
    },
    colors: [
        function ({ value, seriesIndex, dataPointIndex, w }) {
            if (value < 40) {
                return "#d10f0f";
            } else if (value > 70) {
                return "#39c734";
            } else return "#ffbf00"
        }
    ],
    plotOptions: {
        radialBar: {
            hollow: {
                margin: 15,
                size: "60%"
            },
            dataLabels: {
                name: {
                    offsetY: -10,
                    align: 'center',
                    verticalAlign: 'middle',
                    fontFamily: 'Poppins',
                    fontWeight: 600,
                    fontSize: "12px",
                },
                value: {
                    formatter: function (val) {
                        return `${parseInt(val)}%`;
                    },
                    fontFamily: 'Poppins',
                    fontWeight: 600,
                    fontSize: "15px",
                    show: true,
                }
            },
        },
    },
    tooltip: {
        enabled: true
    },
    stroke: {
        lineCap: "round",
        width: -20
    },
    labels: ["Risk Review"],
}

// export var options2 = {
//     series: [40, 21],
//     // fill:{
//     //     colors: ['#8BD742', '#BCC1C8', '#78AEFF', '']
//     // },
//     colors: ['#ffbf00', '#78AEFF'],
//     chart: {
//         width: 380,
//         type: 'donut',
//         dropShadow: {
//             enabled: true,
//             color: '#111',
//             top: -1,
//             left: 3,
//             blur: 3,
//             opacity: 0.2
//         }
//     },
//     stroke: {
//         width: 0,
//     },
//     plotOptions: {
//         pie: {
//             // startAngle: 10,
//             donut: {
//                 // size: '90%',
//                 dataLabels: {
//                     enabled: false
//                 },
//                 labels: {
//                     show: true,
//                     name: {
//                         show: true,
//                         // offsetY: 38,
//                         formatter: () => 'Impact Review'
//                     },
//                     value: {
//                         show: true,
//                         color: '',
//                         fontFamily: 'Open Sans',
//                         fontWeight: 700,
//                         fontSize: "20px",
//                         offsetY: 5,
//                     },
//                     total: {
//                         show: true,
//                         showAlways: true,
//                         color: '',
//                         fontFamily: 'Poppins',
//                         fontWeight: 600,
//                         fontSize: "12px",
//                         formatter: (w) => {
//                             console.log(w)
//                             const total = (w.globals.seriesTotals[0] / w.globals.seriesTotals[1]) * 100;
//                             return `${parseInt(total)}%`;
//                         }
//                     }
//                 }
//             }
//         },
//     },
//     labels: ["Completed", "Planned"],
//     dataLabels: {
//         enabled: false
//     },
//     fill: {
//         type: 'pattern',
//         opacity: 1,
//         pattern: {
//             enabled: true,
//             style: ['horizontalLines', 'horizontalLines'],
//         },
//     },
//     legend: {
//         // position: 'bottom',
//         show: false
//     },
//     responsive: [{
//         breakpoint: 480,
//         options: {
//             chart: {
//                 width: 100
//             },
//             legend: {
//                 // position: 'bottom',
//                 show: false
//             }
//         }
//     }]
// };
// export var options3 = {
//     series: [70, 14],
//     // fill:{
//     //     colors: ['#8BD742', '#BCC1C8', '#78AEFF', '']
//     // },
//     colors: ['#39c734', '#78AEFF'],
//     chart: {
//         width: 380,
//         type: 'donut',
//         dropShadow: {
//             enabled: true,
//             color: '#111',
//             top: -1,
//             left: 3,
//             blur: 3,
//             opacity: 0.2
//         }
//     },
//     stroke: {
//         width: 0,
//     },
//     plotOptions: {
//         pie: {
//             // startAngle: 10,
//             donut: {
//                 // size: '90%',
//                 dataLabels: {
//                     enabled: false
//                 },
//                 labels: {
//                     show: true,
//                     name: {
//                         show: true,
//                         // offsetY: 38,
//                         formatter: () => 'BCP'
//                     },
//                     value: {
//                         show: true,
//                         color: '',
//                         fontFamily: 'Open Sans',
//                         fontWeight: 700,
//                         fontSize: "20px",
//                         offsetY: 5,
//                     },
//                     total: {
//                         show: true,
//                         showAlways: true,
//                         color: '',
//                         fontFamily: 'Poppins',
//                         fontWeight: 600,
//                         fontSize: "12px",
//                         formatter: (w) => {
//                             console.log(w)
//                             const total = (w.globals.seriesTotals[0] / w.globals.seriesTotals[1]) * 100;
//                             return `${parseInt(total)}%`;
//                         }
//                     }
//                 }
//             }
//         },
//     },
//     labels: ["Completed", "Planned"],
//     dataLabels: {
//         enabled: false
//     },
//     fill: {
//         type: 'pattern',
//         opacity: 1,
//         pattern: {
//             enabled: true,
//             style: ['horizontalLines', 'horizontalLines'],
//         },
//     },
//     legend: {
//         // position: 'bottom',
//         show: false
//     },
//     responsive: [{
//         breakpoint: 480,
//         options: {
//             chart: {
//                 width: 100
//             },
//             legend: {
//                 // position: 'bottom',
//                 show: false
//             }
//         }
//     }]
// };

// export var options4 = {
//     series: [20, 13],
//     // fill:{
//     //     colors: ['#8BD742', '#BCC1C8', '#78AEFF', '']
//     // },
//     colors: ['#d10f0f', '#78AEFF'],
//     chart: {
//         width: 380,
//         type: 'donut',
//         dropShadow: {
//             enabled: true,
//             color: '#111',
//             top: -1,
//             left: 3,
//             blur: 3,
//             opacity: 0.2
//         }
//     },
//     stroke: {
//         width: 0,
//     },
//     plotOptions: {
//         pie: {
//             // startAngle: 10,
//             donut: {
//                 // size: '90%',
//                 dataLabels: {
//                     enabled: false
//                 },
//                 labels: {
//                     show: true,
//                     name: {
//                         show: true,
//                         // offsetY: 38,
//                         formatter: () => 'Survival Time'
//                     },
//                     value: {
//                         show: true,
//                         color: '',
//                         fontFamily: 'Open Sans',
//                         fontWeight: 700,
//                         fontSize: "20px",
//                         offsetY: 5,
//                     },
//                     total: {
//                         show: true,
//                         showAlways: true,
//                         color: '',
//                         fontFamily: 'Poppins',
//                         fontWeight: 600,
//                         fontSize: "12px",
//                         formatter: (w) => {
//                             console.log(w)
//                             const total = (w.globals.seriesTotals[0] / w.globals.seriesTotals[1]) * 100;
//                             return `${parseInt(total)}%`;
//                         }
//                     }
//                 }
//             }
//         },
//     },
//     labels: ["Completed", "Planned"],
//     dataLabels: {
//         enabled: false
//     },
//     fill: {
//         type: 'pattern',
//         opacity: 1,
//         pattern: {
//             enabled: true,
//             style: ['horizontalLines', 'horizontalLines'],
//         },
//     },
//     legend: {
//         // position: 'bottom',
//         show: false
//     },
//     responsive: [{
//         breakpoint: 480,
//         options: {
//             chart: {
//                 width: 100
//             },
//             legend: {
//                 // position: 'bottom',
//                 show: false
//             }
//         }
//     }]
// };
// export var options5 = {
//     series: [40, 21],
//     // fill:{
//     //     colors: ['#8BD742', '#BCC1C8', '#78AEFF', '']
//     // },
//     colors: ['#ffbf00', '#78AEFF'],
//     chart: {
//         width: 380,
//         type: 'donut',
//         dropShadow: {
//             enabled: true,
//             color: '#111',
//             top: -1,
//             left: 3,
//             blur: 3,
//             opacity: 0.2
//         }
//     },
//     stroke: {
//         width: 0,
//     },
//     plotOptions: {
//         pie: {
//             // startAngle: 10,
//             donut: {
//                 // size: '90%',
//                 dataLabels: {
//                     enabled: false
//                 },
//                 labels: {
//                     show: true,
//                     name: {
//                         show: true,
//                         // offsetY: 38,
//                         formatter: () => 'Revival Time'
//                     },
//                     value: {
//                         show: true,
//                         color: '',
//                         fontFamily: 'Open Sans',
//                         fontWeight: 700,
//                         fontSize: "20px",
//                         offsetY: 5,
//                     },
//                     total: {
//                         show: true,
//                         showAlways: true,
//                         color: '',
//                         fontFamily: 'Poppins',
//                         fontWeight: 600,
//                         fontSize: "12px",
//                         formatter: (w) => {
//                             console.log(w)
//                             const total = (w.globals.seriesTotals[0] / w.globals.seriesTotals[1]) * 100;
//                             return `${parseInt(total)}%`;
//                         }
//                     }
//                 }
//             }
//         },
//     },
//     labels: ["Completed", "Planned"],
//     dataLabels: {
//         enabled: false
//     },
//     fill: {
//         type: 'pattern',
//         opacity: 1,
//         pattern: {
//             enabled: true,
//             style: ['horizontalLines', 'horizontalLines'],
//         },
//     },
//     legend: {
//         // position: 'bottom',
//         show: false
//     },
//     responsive: [{
//         breakpoint: 480,
//         options: {
//             chart: {
//                 width: 100
//             },
//             legend: {
//                 // position: 'bottom',
//                 show: false
//             }
//         }
//     }]
// };
// export var options6 = {
//     series: [66, 70],
//     // fill:{
//     //     colors: ['#8BD742', '#BCC1C8', '#78AEFF', '']
//     // },
//     colors: ['#39c734', '#78AEFF'],
//     chart: {
//         width: 380,
//         type: 'donut',
//         dropShadow: {
//             enabled: true,
//             color: '#111',
//             top: -1,
//             left: 3,
//             blur: 3,
//             opacity: 0.2
//         }
//     },
//     stroke: {
//         width: 0,
//     },
//     plotOptions: {
//         pie: {
//             // startAngle: 10,
//             donut: {
//                 // size: '90%',
//                 dataLabels: {
//                     enabled: false
//                 },
//                 labels: {
//                     show: true,
//                     name: {
//                         show: true,
//                         offsetY: -15,
//                         formatter: () => ['Cyber', 'Security']
//                     },
//                     value: {
//                         show: true,
//                         color: '',
//                         fontFamily: 'Open Sans',
//                         fontWeight: 700,
//                         fontSize: "20px",
//                         offsetY: 5,
//                     },
//                     total: {
//                         show: true,
//                         showAlways: true,
//                         color: '',
//                         fontFamily: 'Poppins',
//                         fontWeight: 600,
//                         fontSize: "12px",
//                         formatter: (w) => {
//                             console.log(w)
//                             const total = (w.globals.seriesTotals[0] / w.globals.seriesTotals[1]) * 100;
//                             return `${parseInt(total)}%`;
//                         }
//                     }
//                 }
//             }
//         },
//     },
//     labels: ["Completed", "Planned"],
//     dataLabels: {
//         enabled: false
//     },
//     fill: {
//         type: 'pattern',
//         opacity: 1,
//         pattern: {
//             enabled: true,
//             style: ['horizontalLines', 'horizontalLines'],
//         },
//     },
//     legend: {
//         // position: 'bottom',
//         show: false
//     },
//     responsive: [{
//         breakpoint: 480,
//         options: {
//             chart: {
//                 width: 100
//             },
//             legend: {
//                 // position: 'bottom',
//                 show: false
//             }
//         }
//     }]
// };