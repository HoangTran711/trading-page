import React from 'react'
import { Navbar } from './components/Navbar/Navbar'
import {TradingPage} from './screens/trading/trading-page'
import { MyContext } from 'Context/MyContext'
import { SelectToken } from 'screens/trading/components/select-token'
import { useFetchToken } from 'queries/token.queries'
import './tailwind.output.css'
function App() {
  const [tokens, setTokens] = React.useState([])
  const { data, isSuccess } = useFetchToken()
  const [isOpenSelectTokens, setIsOpenSelectTokens] = React.useState(true)
  const onHandleSelectTokens = () => {
    setIsOpenSelectTokens(!isOpenSelectTokens)
  }
  React.useEffect(() => {
    if(isSuccess) {
      const temp = []
      for(let key in data) {
        temp.push(data[key])
      }
      setTokens(temp)
    }
  },[isSuccess])
  return (
    <MyContext.Provider value={{
      tokens: tokens,
      fetchTokensSuccess: isSuccess,
      onHandleSelectTokens
    }}>
      <div className="App">
        {isOpenSelectTokens ? <SelectToken/> : null}
        <Navbar/>
        <TradingPage />
      </div>
    </MyContext.Provider>
  );
}

export default App;
