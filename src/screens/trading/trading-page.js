import React from 'react'
import './trading-page.css'
import { MyContext } from 'Context/MyContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { withCalculateOutput } from 'services/trading'
import { estimateFeeTrade } from 'services/trading/fee/fee'
import { calculateSizeImpact, getPoolSize } from 'services/trading/utils'
import { OverlayDetail } from './components/overlay-detail'
import { useGetPairsData} from 'services/trading/fee/pairsData'


export const TradingPage = ({outputValue, outputToken}) => {
	const data = React.useContext(MyContext)
	const [isErrorSell, setIsErrorSell] = React.useState(false)
	const [isErrorReceive, setIsErrorReceive] = React.useState(false)
	const { data: pairs, isSuccess:fetchedPairs } = useGetPairsData()
	const [poolSize, setPoolSize] = React.useState({
		output1: null,
		output2: null
	})
	const [fee,setFee] = React.useState({
		fee: 0,
		feeToken: {}
	})
	const [impact, setImpact] = React.useState({
		impact: 0,
		showWarning: false
	})
	const onErrorLoadImageSell = () => {
		setIsErrorSell(true)
	}
	const onErrorLoadImageReceive = () => {
		setIsErrorReceive(true)
	}
	React.useEffect(() => {

    if (fetchedPairs) {
      const fee = estimateFeeTrade({
        pairs: pairs?.pairs,
        inputToken: data.tokenSell,
        outputToken: data.tokenReceive,
			})
			let poolSz  = getPoolSize(data.tokenSell, data.tokenReceive, pairs?.pairs || [])
			setPoolSize(poolSz)
      setFee(fee)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedPairs, data.tokenSell, data.tokenReceive])
	React.useEffect(() => {
		setIsErrorReceive(false)
		setIsErrorSell(false)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data?.tokenSell, data?.tokenReceive?.Icon])
	React.useEffect(() => {
		let temp = calculateSizeImpact(data.amount * Math.pow(10, data.tokenSell?.pDecimals) , data.tokenSell, outputValue , outputToken, data.tokenSell?.priceUsd, data.tokenSell?.pDecimals,  data.tokenReceive?.priceUsd, data.tokenReceive?.pDecimals)
		setImpact(temp)
		// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outputValue])
	return (
		<div className="trading-page">
			<div className="trading-top">
				<span>From</span>
				<div className="input-container">
					<input onChange={(e) => {data.setAmount(e.target.value)}} type="number" placeholder="0.0" value={data.amount} />
					<div onClick={() => data.onHandleSelectTokens('sell')}  className="token-select-input  cursor-pointer">
						{!isErrorSell ? <img onError={onErrorLoadImageSell} className="token-select" src={data.tokenSell.Icon} alt="token"/>: <FontAwesomeIcon className="icon-unknown" icon={faQuestionCircle} />}
						<div className="token-selector">
							<span>{data.tokenSell.name}</span>
							<FontAwesomeIcon icon={faChevronDown} />
						</div>
					</div>
				</div>
			</div>
			<div className="container-icon">
				<FontAwesomeIcon className="icon" icon={faArrowDown} />
			</div>
			<div className="trading-bottom">
				<span>To</span>
				<div className="input-container">
					<input onChange={() =>{}} type="text" value={outputValue  * Math.pow(10, -outputToken?.pDecimals) || 0}/>
					{data.tokenReceive ? <div className="token-select-output">
					{!isErrorReceive ? <img onError={onErrorLoadImageReceive} className="token-img-output" src={data.tokenReceive.Icon} alt="token"/>: <FontAwesomeIcon className="icon-unknown" icon={faQuestionCircle} />}
						<div onClick={() => data.onHandleSelectTokens('receive')} className="cursor-pointer token-selector">
							<span>{data.tokenReceive.name}</span>
							<FontAwesomeIcon icon={faChevronDown} />
						</div>
					</div>: <div onClick={() => data.onHandleSelectTokens('receive')} className="token-select-output cursor-pointer "><span className="font-semibold">Choose a token</span> <FontAwesomeIcon icon={faChevronDown} /></div>}
				</div>
			</div>

			<div className="btn-primary">
				<a href="#/" >Connect LSB Wallet</a>
			</div>
			<OverlayDetail impact={impact} fee={fee} poolSize={poolSize}/>
		</div>
	)
}
export default withCalculateOutput(TradingPage)