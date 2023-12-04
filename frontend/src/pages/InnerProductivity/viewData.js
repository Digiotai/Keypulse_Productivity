import './styles.css'
import { useState } from 'react';
export const ViewData = ({ viewData }) => {
    const [selectedItem, setSelectedItem] = useState(null);

    const displayData = (item) => {
        setSelectedItem(item);
    };
    const renderTable = (dataSet, dataSetName) => {
        return <div>
            <table className="table styled-table">
                <thead>
                    <tr>
                        <th>Month</th>
                        {dataSet.map((item, index) => (
                            <th key={index}>{item.name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {dataSet[0].label.map((label, index) => (
                        <tr
                            key={index}
                            className={`${selectedItem !== null && selectedItem === index ? 'table-active' : ''
                                }`}
                            onClick={() => displayData(index)}
                        >
                            <td>{label}</td>
                            {dataSet.map((item, i) => (
                                <td key={i}>{item.data[index]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    }

    return (
        <div style={{ width: '100%', minHeight: '600px' }}>
            <div className="mt-3" style={{border:'1px solid #d1cfc9'}}>
                <div className="row">
                    <div className="col-md-3 ps-5 pt-2" style={{borderRight:'1px solid #d1cfc9',display:"flex",alignItems:'center',justifyContent:'center'}}>
                        <div className="list-group" id="itemList">
                            {viewData.map((item, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className={`list-group-item list-group-item-action ${selectedItem === item.name ? 'active' : ''}`}
                                    onClick={() => displayData(item.name)}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="col-md-8 pt-2" style={{display:"flex",alignItems:'center',justifyContent:'center'}}>
                        <div id="displayData">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6">
                                        {selectedItem && renderTable(viewData.filter((item) => item.name === selectedItem)[0].data, 'Categories')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}