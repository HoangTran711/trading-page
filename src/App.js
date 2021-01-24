import React from 'react'
import { Navbar } from './components/Navbar/Navbar'
import TradingPage from './screens/trading/trading-page'
import { MyContext } from 'Context/MyContext'
import { SelectToken } from 'screens/trading/components/select-token'
import { useFetchToken } from 'queries/token.queries'
import { BottomButton } from './bottom-button/bottom-button'
import './tailwind.output.css'
function App() {
  const [tokenActive, setTokenActive] = React.useState('')
  const [tokens, setTokens] = React.useState([])

  const [tokenSell, setTokenSell] = React.useState({
    Icon: "https://s3.amazonaws.com/incognito-org/wallet/cryptocurrency-icons/32@2x/color/prv@2x.png",
    id: '0000000000000000000000000000000000000000000000000000000000000004',
    name: 'Privacy',
    displayName: 'Privacy',
    symbol: 'PRV',
    pDecimals: 9,
    hasIcon: true,
    originalSymbol: 'PRV',
    isVerified: true,
  })
  const [valueInputSearch, setValueInputSearch] = React.useState('')
  const [tokenReceive, setTokenReceive] = React.useState(null)
  const { data, isSuccess } = useFetchToken()
  const [ amount,setAmount ] = React.useState('0')
  const [isOpenSelectTokens, setIsOpenSelectTokens] = React.useState(false)
  const onHandleSelectTokens = (active = null) => {
    if(active) {
      setTokenActive(active)
    }
    if(isOpenSelectTokens) {
      setValueInputSearch('')
    }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isSuccess])
  return (
    <MyContext.Provider value={{
      tokenActive:tokenActive,
      valueInputSearch:valueInputSearch,
      setValueInputSearch,
      tokens: tokens,
      fetchTokensSuccess: isSuccess,
      onHandleSelectTokens,
      tokenSell:tokenSell,
      setTokenSell,
      tokenReceive: tokenReceive,
      setTokenReceive,
      amount: amount,
      setAmount
    }}>
      <div>
        {isOpenSelectTokens ? <SelectToken/> : null}
        <Navbar/>
        <TradingPage 
          inputToken={tokenSell}
          inputValue={parseFloat(amount.replace(",", ".")) * Math.pow(10,tokenSell?.pDecimals)}
          outputToken={tokenReceive} 
        />
        <BottomButton/>
      </div>
    </MyContext.Provider>
  );
}

export default App;
