import React from 'react'
import { Navbar } from './components/Navbar/Navbar'
import {TradingPage} from './screens/trading/trading-page'
import { useFetchToken } from './queries/token.queries'
function App() {
  const { data, status } = useFetchToken()
  console.log(data)
  return (
    <div className="App">
      <Navbar/>
      <TradingPage />
    </div>
  );
}

export default App;
