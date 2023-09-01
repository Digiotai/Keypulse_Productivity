export const prodThroughputData = (data) => {
    let data1 = []
    let data2 = []
    let data3 = []
    let data4 = []

    data.map((item, index) => {
        if (index < 8) {
            Object.keys(item).map((key) => {
                if (key == "Robotic Arm") {
                    data1.push(item[key])
                } else if (key == "Roller Belts") {
                    data2.push(item[key])
                } else if (key == "Boilers") data3.push(item[key])
                else if (key == "Chillers") data4.push(item[key])
            })
        }
    })
    const finalData = [{
        name: 'Robotic Arm',
        data: data1
    }, {
        name: 'Roller Belts',
        data: data2
    }, {
        name: 'Boilers',
        data: data3
    },
    {
        name: 'Chillers',
        data: data4
    }]
    return finalData
}

export const prodOpexData = (data) => {
    let data1 = []
    let data2 = []
    let data3 = []
    let data4 = []

    data.map((item, index) => {
        if (index < 8) {
            Object.keys(item).map((key) => {
                if (key == "Robotic Arm") {
                    data1.push(item[key])
                } else if (key == "Roller Belts") {
                    data2.push(item[key])
                } else if (key == "Boilers") data3.push(item[key])
                else if (key == "Chillers") data4.push(item[key])
            })
        }
    })

    let finalData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
        datasets: [
            {
                label: 'Robotic Arm',
                data: data1,
                borderColor: '#1b3c7a',
                backgroundColor: '#1b3c7a',
            },
            {
                label: 'Roller Belts',
                data: data2,
                borderColor: '#427ae3',
                backgroundColor: '#427ae3',
            },
            {
                label: 'Boilers',
                data: data3,
                borderColor: '#3dc7d1',
                backgroundColor: '#3dc7d1',
            },
            {
                label: 'Chillers',
                data: data4,
                borderColor: '#faa93e',
                backgroundColor: '#faa93e',
            },
        ],
    }
    return finalData
}

export const utilizationData = (data) => {
    let data1 = []
    let data2 = []
    let data3 = []
    let data4 = []
    data.map((item, index) => {
        if (index < 8) {
            Object.keys(item).map((key) => {
                if (key == "Robotic Arm") {
                    data1.push(item[key])
                } else if (key == "Roller Belts") {
                    data2.push(item[key])
                } else if (key == "Boilers") data3.push(item[key])
                else if (key == "Chillers") data4.push(item[key])
            })
        }
    })
    function calculatePercentages(numbers) {
        const totalSum = numbers.reduce((sum, num) => sum + num, 0);
        return (totalSum / (numbers.length * 100)) * 100;
    }

    let series1 = [{
        name: 'Robotic Arm',
        data: [calculatePercentages(data1)]
    }, {
        name: 'Roller Belts',
        data: [calculatePercentages(data2)]
    }, {
        name: 'Boilers',
        data: [calculatePercentages(data3)]
    },
    {
        name: 'Chillers',
        data: [calculatePercentages(data4)]
    }]
    return series1
}


export const lostUnitsdata = (data) => {
    // series: [20, 30, 40, 10],
    let data1 = []
    let data2 = []
    let data3 = []
    let data4 = []
    data.map((item, index) => {
        if (index < 8) {
            Object.keys(item).map((key) => {
                if (key == "Tooling Error") {
                    data1.push(item[key])
                } else if (key == "Physical Damage") {
                    data2.push(item[key])
                } else if (key == "Opener Damage") data3.push(item[key])
                else if (key == "Others") data4.push(item[key])
            })
        }
    })
    function calculatePercentages(numbers) {
        const totalSum = numbers.reduce((sum, num) => sum + num, 0);
        return (totalSum / (numbers.length * 100)) * 100;
    }
    let finalData = [calculatePercentages(data1), calculatePercentages(data2), calculatePercentages(data3), calculatePercentages(data4)]
    return finalData
}


export const upTimeData = (data) => {
    // series: [20, 30, 40, 10],
    let data1 = []
    let data2 = []
    let data3 = []
    let data4 = []
    data.map((item, index) => {
        if (index < 8) {
            Object.keys(item).map((key) => {
                if (key == "Robotic Arm") {
                    data1.push(item[key])
                } else if (key == "Roller Belts") {
                    data2.push(item[key])
                } else if (key == "Boilers") data3.push(item[key])
                else if (key == "Chillers") data4.push(item[key])
            })
        }
    })

    let finalData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", 'Aug'],
        datasets: [
            {
                label: 'Robotic Arm',
                data: data1,
                borderColor: '#1b3c7a',
                backgroundColor: '#1b3c7a',
            },
            {
                label: 'Roller Belts',
                data: data2,
                borderColor: '#427ae3',
                backgroundColor: '#427ae3',
            },
            {
                label: 'Boilers',
                data: data3,
                borderColor: '#3dc7d1',
                backgroundColor: '#3dc7d1',
            },
            {
                label: 'Chillers',
                data: data4,
                borderColor: '#faa93e',
                backgroundColor: '#faa93e',
            },
        ],
    }
    return finalData
}

export const unitsYTDData = (data) => {
    let data1 = []
    data.map((item, index) => {
        if (index < 8) {
            Object.keys(item).map((key) => {
                if (key == "Units") {
                    data1.push(item[key])
                }
            })
        }
    })
    const aseries = [{
        type: 'area',
        name: 'series1',
        data: data1
    }
    ]
    return { total: data[12].Units, finalData: aseries }
}

export const unitsLostData = (data) => {
    let data1 = []
    data.map((item, index) => {
        if (index < 8) {
            Object.keys(item).map((key) => {
                if (key == "Units") {
                    data1.push(item[key])
                }
            })
        }
    })
    const aseries = [{
        type: 'area',
        name: 'series1',
        data: data1
    }]
    console.log( { totalprod: data[12].Units, finalDataprod: aseries })

    return { totallost: data[12].Units, finalDatalost: aseries }
}

export const unitsProdData = (data) => {
    let data1 = []
    data.map((item, index) => {
        if (index < 8) {
            Object.keys(item).map((key) => {
                if (key == "Plant Productivity (%)") {
                    data1.push(item[key])
                }
            })
        }
    })
    console.log(data1)
    const aseries = [{
        type: 'area',
        name: 'series1',
        data: data1
    }]
    console.log( { totalprod: data[12].Units, finalDataprod: aseries })
    return { totalprod: data[12]["Plant Productivity (%)"], finalDataprod: aseries }
}