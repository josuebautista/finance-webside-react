import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const [watchList, setWatchList] = useState(['GOOGL', 'MSFT', 'AMZN']);

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
