import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();
// ['GOOGL', 'MSFT', 'AMZN']
export const AppContextProvider = (props) => {
    const [watchList, setWatchList] = useState(
        localStorage.getItem('watchList')?.split(',') || ['GOOGL', 'MSFT', 'AMZN']
    );

    useEffect(() => {
        localStorage.setItem('watchList', watchList);
    }, [watchList])

    const addStock = (stock) => {
        if (watchList.indexOf(stock) === -1) {
            setWatchList([...watchList, stock]);
        }

    }
    
    const deleteStock = (stock) => {
        setWatchList(watchList.filter((element) => {
            return element !== stock;
        }))
    }

    return <AppContext.Provider value={{
        watchList,
        setWatchList,
        addStock, 
        deleteStock
    }}>
        {props.children}
    </AppContext.Provider>
}
