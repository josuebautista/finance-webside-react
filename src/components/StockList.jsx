import { useState, useEffect, useContext } from "react"
import finnHub from "../apis/finnHub";
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { AppContext } from "../utils/context";
import { useNavigate } from "react-router-dom";

export const StockList = () => {
  const [stock, setStock] = useState([]);
  const {watchList, deleteStock} = useContext(AppContext);
  const [mounted, setMounted] = useState(true);
  const navigate = useNavigate()
  useEffect(() => {
    setMounted(true);
    const fetchData = async () => {
      try {
        const responses = await Promise.all(watchList.map((stock) => {
          return finnHub.get('/quote', {
            params: {
              symbol: stock
            }
          })
        }))
        console.log(responses);
        const data = responses.map((response) => {
          return {
            data: response.data,
            symbol: response.config.params.symbol
          }
        })
        console.log(data);
        if (mounted) {
          setStock(data);
        }
        console.log(stock);

      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
    return () => (setMounted(false));
  }, [watchList])

  const handleStockSelect = (symbol) => {
    navigate(`detail/${symbol}`)
  }

  return (
    <div>
      <table className="table hover mt-5 ms-5 rouded-2">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Last</th>
            <th scope="col">Chg</th>
            <th scope="col">Chg %</th>
            <th scope="col">Hight</th>
            <th scope="col">Low</th>
            <th scope="col">Open</th>
            <th scope="col">Pclose</th>
            <th scope="col" className="bg-white border-0"></th>
          </tr>
        </thead>
        <tbody>
          {
            stock.map((stockData) => {
              return (
                <tr 
                onClick={() => handleStockSelect(stockData.symbol)}
                className="table-row"
                key={stockData.symbol}
                style={{
                  cursor: 'pointer'
                }}
                >
                  <td>{stockData.symbol}</td>
                  <td>{stockData.data.c}</td>
                  <td className={parseFloat(stockData.data.d) > 0 ? "text-success" : "text-danger"}>
                    {stockData.data.d}{parseFloat(stockData.data.d) > 0 ? <FaAngleUp /> : <FaAngleDown />}
                  </td>
                  <td className={parseFloat(stockData.data.dp) > 0 ? "text-success" : "text-danger"}>
                    {stockData.data.dp}{parseFloat(stockData.data.dp) > 0 ? <FaAngleUp /> : <FaAngleDown />}
                  </td>
                  <td>{stockData.data.h}</td>
                  <td>{stockData.data.l}</td>
                  <td>{stockData.data.o}</td>
                  <td>{stockData.data.pc}
                  </td>
                  <td className="bg-white border-0">
                    <button 
                    className="btn btn-outline-danger d-inline-block delete-button btn-sm" 
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteStock(stockData.symbol)
                      }}>Remove</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}