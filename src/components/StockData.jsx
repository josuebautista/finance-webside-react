import { useState, useEffect } from "react";
import finnHub from "../apis/finnHub";
export const StockData = ({ symbol }) => {
  const [mounted, setMounted] = useState(true);
  const [stockData, setStockData] = useState({})
  useEffect(() => {
    setMounted(true);
    const fetchData = async () => {
      try {
        const response = await finnHub.get('/stock/profile2', {
          params: {
            symbol
          }
        })
        //console.log(response.data);
        if (mounted) {
          setStockData(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
    return () => (setMounted(false));
  }, [symbol])
  return (
    <div className="d-flex justify-content-center">
    <div className="col-10 text-start">
      {
        stockData && (
          <div className="row border bg-light rounded shadow-sm p-2 mt-5">
            <div className="col-4">
              <div>
                <span className="fw-bold">name: </span>
                {stockData.name}
              </div>
              <div>
                <span className="fw-bold">country: </span>
                {stockData.country}
              </div>
              <div>
                <span className="fw-bold">ticker: </span>
                {stockData.ticker}
              </div>
            </div>
            <div className="col-4">
              <div>
                <span className="fw-bold">Exchange: </span>
                {stockData.exchange}
              </div>
              <div>
                <span className="fw-bold">Industry: </span>
                {stockData.finnHubIndustry}
              </div>
              <div>
                <span className="fw-bold">IPO: </span>
                {stockData.ipo}
              </div>
            </div>
            <div className="col-4">
              <div>
                <span className="fw-bold">MarketCap: </span>
                {stockData.marketCapitalization}
              </div>
              <div>
                <span className="fw-bold">Shares Outstanding: </span>
                {stockData.shareOutstanding}
              </div>
              <div>
                <span className="fw-bold">url: </span>
                <a href={stockData.weburl}>link</a>
              </div>
            </div>
          </div>
        )
      }
    </div>
    </div>
  )
}