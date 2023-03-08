import { AutoComplete } from "../components/AutoComplete"
import { StockList } from "../components/StockList"

export const StockOveviewPage = () => {
  return (
    <div className="container text-center">
      <h1>Stock Overview Page</h1>
      <AutoComplete/>
      <StockList/>
    </div>

  )
}