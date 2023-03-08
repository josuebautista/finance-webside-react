import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import finnHub from '../apis/finnHub';
import { StockChart } from '../components/StockChart';
import { StockData } from '../components/StockData';

const formatData = (data) => {
  return data.t.map((el, index )=> {
    return {
      x: el * 1000,
      y: Math.floor(data.c[index])
    }
  })
}

export const StockDetailPage = () => {
  const [charData, setCharData] = useState()
  const { symbol } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const date = new Date();
      const current_time = Math.floor(date.getTime() / 1000);
      let oneDay = current_time - 3 * 24 * 60 * 60;
      if (date.getDay() === 6) {
        oneDay = current_time - 2 * 24 * 60 * 60;
      } else if (date.getDay() === 0) {
        oneDay = current_time - 3 * 24 * 60 * 60;
      } else {
        oneDay = current_time - 24 * 60 * 60;
      }
      const oneWeek = current_time - 7 * 24 * 60 * 60;
      const oneYear = current_time - 365 * 24 * 60 * 60;

      try {
        const responses = await Promise.all([
          finnHub.get('/stock/candle', {
            params: {
              symbol,
              from: oneDay,
              to: current_time,
              resolution: 30
            }
          }),
          finnHub.get('/stock/candle', {
            params: {
              symbol,
              from: oneWeek,
              to: current_time,
              resolution: 60
            }
          }),
          finnHub.get('/stock/candle', {
            params: {
              symbol,
              from: oneYear,
              to: current_time,
              resolution: 'W'
            }
          })
        ])
        //console.log('responses: ', responses );
        setCharData({
          day: formatData(responses[0].data),
          week: formatData(responses[1].data),
          year: formatData(responses[2].data)
        })
      } catch (error) {
        console.log(error);
      }
      
    }
    fetchData()
  }, [symbol])


  return (
    <div>
      { charData && (
        <div>
          <StockChart charData={charData} symbol={symbol}/>
          <StockData symbol={symbol}/>
        </div>
      )}
    </div>
  )
}
