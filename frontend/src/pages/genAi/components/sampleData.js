import React from 'react';
import styles from '../styles/SampleDataTable.module.css';

const SampleDataTable = ({ data }) => {
  const parsedData = JSON.parse(data);

  const columns = Object.keys(parsedData);
  const rows = Object.keys(parsedData[columns[0]]).map(rowIndex =>
    columns.reduce((acc, col) => {
      acc[col] = parsedData[col][rowIndex];
      return acc;
    }, {})
  ).slice(0, 10); // Display only the first 10 records

  return (
    <div className={styles.container}>
      {/* <h2 className={styles.heading}>Sample Data</h2> */}
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col} className={styles.headerCell}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className={styles.row}>
              {columns.map(col => (
                <td key={col} className={styles.cell}>{row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SampleDataTable;
