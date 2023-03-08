import Chart from "react-apexcharts";
import { useState } from "react";

export const StockChart = ({ charData, symbol }) => {
  const [dateFormat, setDateFormat] = useState('24h');
  const { day, week, year } = charData;
  const determineTimeFormat = () => {
    switch (dateFormat) {
      case '24h':
        //console.log(day);
        return day
      case '7d':
        return week
      case '1y':
        return year
      default:
        return day
    }
  }

  const color = (determineTimeFormat()[determineTimeFormat().length - 1].y - determineTimeFormat()[0].y) > 0 ? '#26C281': '#ED3419';

  const options = {
    colors: [color],
    title: {
      text: symbol,
      align: 'center',
      style: {
        fontSize: '24px'
      }
    },
    chart: {
      id: 'stock data',
      animations: {
        speed: 1300
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeUTC: false
      }
    },
    tooltip: {
      x: {
        format: 'MMM dd HH:mm'
      }
    }
  }

  const series = [{
    name: symbol,
    data: determineTimeFormat()
  }]

  const renderButtonSelect = (button) => {
    const classes = 'btn mx-1 ';
    if (button === dateFormat){
      return classes + 'btn-primary'
    } else{
      return classes + 'btn-outline-primary'
    }
  }

  return (
    <div className="continer text-center bg-light m-2 p-2">
      <h2>Stock Chart</h2>
      <Chart options={options} series={series} type='area' width='100%' />`
      <div className="d-flex justify-content-start mx-1">
        <button onClick={() => setDateFormat('24h')} className={renderButtonSelect('24h')}>24h</button>
        <button onClick={() => setDateFormat('7d')} className={renderButtonSelect('7d')}>7d</button>
        <button onClick={() => setDateFormat('1y')} className={renderButtonSelect('1y')}>1y</button>
      </div>
    </div>
  )
}