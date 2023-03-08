import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StockOveviewPage } from './pages/StockOverviewPage';
import { StockDetailPage } from './pages/StockDetailPage';
import { AppContextProvider } from './utils/context'
function App() {
  return (
    <div>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/'
              element={<StockOveviewPage />
              } />
            <Route path='/detail/:symbol'
              element={<StockDetailPage />
              } />
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </div>
  );
}

export default App;
