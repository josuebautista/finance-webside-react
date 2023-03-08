import { useEffect, useState, useContext } from "react";
import finnHub from "../apis/finnHub";
import { AppContext } from "../utils/context";
export const AutoComplete = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [mounted, setMounted] = useState(true);
  const {addStock} = useContext(AppContext)

  const renderDropdown = () => {
    const dropDownClass = search ? "show": null;
    return (
      <ul className={`dropdown-menu ${dropDownClass} col-5`} 
      style={{
        height: '500px', 
        overflowY: 'scroll', 
        overflowX: 'hidden',
        cursor: 'pointer'
        }}>
        {
          results.map((result) => {
            //console.log(result.symbol)
            return (
              <li onClick={() => {
                addStock(result.symbol)
                setSearch('')
              }}
                key={result.symbol} 
                className="dropdown-item">
                  {result.description} {result.symbol}
              </li>
            )
          })
        }
        {/* <li className="dropdown-item"> lsjdfkljf</li> */}
      </ul>
    )
  }

  useEffect(() => {
    setMounted(true);
    const fetchData = async () => {
      try {
        const response = await finnHub.get('/search', {
          params: {
            q: search
          }
        })
        //console.log('response: ', response);
        //console.log(mounted)
        if (mounted) {
          //console.log('saving...');
          setResults(response.data.result)
        }
      } catch (err) {
        console.log(err);
      }
    }
    if (search.length > 0) {
      fetchData();
    } else {
      setResults([])
    }
    return () => (setMounted(false))
  }, [search])
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-8">
          <input
            className="form-control"
            id="search"
            placeholder="Search"
            type="text"
            autoComplete="off"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-8 d-flex justify-content-center">
          {/* <ul className="dropdown-menu col-5">
            <li>stock1</li>
            <li>stock2</li>
            <li>stock3</li>
          </ul> */}
            {renderDropdown()}
        </div>
      </div>
    </div>
  )
}