/* eslint-disable jsx-a11y/anchor-is-valid */
/*global chrome*/
import React from 'react'
import './trading-page.css'
import { MyContext } from 'Context/MyContext'
import { SpinnerWallet } from 'components/Spinner/spinner-wallet'
import { PRV_TOKEN_ID } from 'constant/token'
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
	const [inforTrade, setInforTrade] = React.useState({
		tokenIdSell: data.tokenSell.id,
    tokenIdBuy: data.tokenReceive.id,
    sellAmount: data.amount,
    minimumAcceptableAmount: outputValue,
    nativeFee: '0',
    privacyFee: '0',
    tradingFee: '0'
	})
	const [isErrorReceive, setIsErrorReceive] = React.useState(false)
	const [accountTrading, setAccountTrading] = React.useState('')
	const [isLoading, setIsLoading] = React.useState(false)
	const [isSuccess, setIsSuccess] = React.useState(false)
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
	const onOpenExtension = () => {
		var url = "chrome-extension://deebmnkijhopcgcbjihnneepmaandjgk/index.html";
		window.open(url, "extension_popup", "width=360, height=600, status=no, scrollbar=yes, top=100, left=100000");
	}
	const onHandleSwap = (count = 0) => {
		const infor = {
			...inforTrade,
			tokenIdSell: data.tokenSell.id,
			tokenIdBuy: data.tokenReceive.id,
			minimumAcceptableAmount: (outputValue).toString(),
			sellAmount: (data.amount * Math.pow(10, data.tokenSell.pDecimals)).toString(),
			accountName: accountTrading.accountName
		}
		const obj = {
			title: 'request_swap_token',
			data: infor
		}
		setIsLoading(true)
		chrome.runtime.sendMessage('deebmnkijhopcgcbjihnneepmaandjgk',obj, response => {
			if(chrome.runtime.lastError) {
				if(count < 10) {
					setTimeout(() => {
						onHandleSwap(count + 1)
					}, 1000);
				} else {
					setIsLoading(false)
				}
				
      } else {
				if(response.status !== 'successfully') {
					data.setConnectFailed({
						title:'Trade request',
						content: 'Trade request failed!'
					})
					setIsLoading(false)
				} else {
					console.log(response.data.txId)
					data.setLinkDetail(response.data.txId)
					data.setConnectSuccess({
						title:'Trade request',
						content: 'View on mainnet'
					})
					setIsLoading(false)
				}
				
      }
		})
	}
	const onHandleConnectWallet = (count = 0) => {
		setIsLoading(true)
		
		const obj = {
			title: 'request_connect_wallet',
			data: ''
		}
		
    chrome.runtime.sendMessage('deebmnkijhopcgcbjihnneepmaandjgk',obj, response => {
		console.log(response, count)
      if(chrome.runtime.lastError) {
			if(count < 60) {
				setTimeout(() => {
					onHandleConnectWallet(count + 1)
				}, 1000);
			} else {
				data.setConnectSuccess({
					title:'',
					content: ''
				})
				data.setConnectFailed({
					title:'Connect',
					content: 'Connection failed'
				})
				setIsLoading(false)
			}
				
      } else {
		
			if(response.status === 'waiting') {
				if(count < 100) {
					
					setTimeout(() => {
						onHandleConnectWallet(count + 1)
					}, 1000);
					
				} else {
					data.setConnectSuccess({
						title:'',
						content: ''
					})
					data.setConnectFailed({
						title:'Connect',
						content: 'Connection failed'
					})
					setIsLoading(false)
				}
			} else if (response.status === 'successfully') { 
				setAccountTrading(response.data)
				console.log(response.data)
				
				data.setConnectFailed({
					title:'',
					content: ''
				})
				data.setConnectSuccess({
					title:'Connect',
					content: 'Successful connection'
				})
				setIsSuccess(true)
				setIsLoading(false)
			} else {
				
				data.setConnectSuccess({
					title:'',
					content: ''
				})
				if(response.data === 'not_login_yet'){
					if(count < 30) {
						setTimeout(() => {
							onHandleConnectWallet(count + 1)
						}, 1000);
						
					} else {
						data.setConnectFailed({
							title:'Connect',
							content: 'Please login before connected to your wallet!'
						})
						setIsLoading(false)
					}
				} else {
					data.setConnectFailed({
						title:'Connect',
						content: 'Connection failed!'
					})
					setIsLoading(false)
				}
			}
      }
    });
		/* eslint-enable no-undef */
	}
	React.useEffect(() => {
		if(pairs) {
			data.setPairs(pairs.pairs)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pairs])
	React.useEffect(() => {

    if (fetchedPairs) {
      const fee = estimateFeeTrade({
        pairs: pairs?.pairs,
        inputToken: data.tokenSell,
        outputToken: data.tokenReceive,
			})
			let poolSz  = getPoolSize(data.tokenSell, data.tokenReceive, pairs?.pairs || [])
			setPoolSize(poolSz)
			if(fee.feeToken.id !== PRV_TOKEN_ID) {
				setInforTrade({
					...inforTrade, 
					nativeFee: '0',
					privacyFee: fee.fee.toString(),
					
				})
			} else {
				setInforTrade({
					...inforTrade, 
					privacyFee: '0',
					nativeFee: fee.fee.toString(),
				})
			}
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
		if(data.fetchTokensSuccess) {
			const tokenUSDT = data.tokens.find(token => token.TokenID === '716fd1009e2a1669caacc36891e707bfdf02590f96ebd897548e8963c95ebac0')
			let temp = calculateSizeImpact(data.amount * Math.pow(10, data.tokenSell?.pDecimals) , data.tokenSell, outputValue , outputToken, data.tokenSell?.priceUsd, data.tokenSell?.pDecimals,  data.tokenReceive?.priceUsd, data.tokenReceive?.pDecimals, tokenUSDT)
			setImpact(temp)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [outputValue, data.fetchTokensSuccess])
	const onHandleSwitchButton = () => {
		data.setTokenSell(data.tokenReceive)
		data.setTokenReceive(data.tokenSell)
	}
	
	return (
		<div className="trading-page">
			<div className="trading-top">
				<div className="header">
				<span>From</span>
				<span className="balance">Balance: {(accountTrading?.tokens?.find(token => token.tokenId === data.tokenSell.id))?.tokenBalance || '- -'}</span>
				</div>
				<div className="input-container">
					
					<input onChange={(e) => {data.setAmount(e.target.value)}} type="number" placeholder="0" value={data.amount} />
					{data.tokenSell.id ? <div onClick={() => data.onHandleSelectTokens('sell')}  className="token-select-input  cursor-pointer">
						{!isErrorSell ? <img onError={onErrorLoadImageSell} className="token-select" src={data.tokenSell.Icon} alt="token"/>: <FontAwesomeIcon className="icon-unknown" icon={faQuestionCircle} />}
						<div className="token-selector">
							<span>{data.tokenSell.symbol}</span>
							<FontAwesomeIcon className="icon" icon={faChevronDown} />
						</div>
					</div>: <div onClick={() => data.onHandleSelectTokens('sell')} className="token-select-input cursor-pointer "><span className="font-semibold">Choose a token</span> <FontAwesomeIcon className="icon" icon={faChevronDown} /></div>}
				</div>
			</div>
			<div onClick={onHandleSwitchButton} className="cursor-pointer container-icon">
				<FontAwesomeIcon className="icon" icon={faArrowDown} />
			</div>
			<div className="trading-bottom">
				<span>To</span>
				<div className="input-container">
					
					<input onChange={() =>{}} type="text" value={outputValue  * Math.pow(10, -outputToken?.pDecimals) || 0}/>
					{data.tokenReceive?.id ? <div className="token-select-output">
					{!isErrorReceive ? <img onError={onErrorLoadImageReceive} className="token-img-output" src={data.tokenReceive.Icon} alt="token"/>: <FontAwesomeIcon className="icon-unknown" icon={faQuestionCircle} />}
						<div onClick={() => data.onHandleSelectTokens('receive')} className="cursor-pointer token-selector">
							<span>{data.tokenReceive.symbol}</span>
							<FontAwesomeIcon icon={faChevronDown} className="icon" />
						</div>
					</div>: <div onClick={() => data.onHandleSelectTokens('receive')} className="token-select-output cursor-pointer "><span className="font-semibold">Choose a token</span> <FontAwesomeIcon className="icon" icon={faChevronDown} /></div>}
				</div>
			</div>

				{!isSuccess ? <div onClick={() => {
					onOpenExtension()
					onHandleConnectWallet()
				}} className={`btn-primary cursor-pointer mt-4 ${ isLoading ? 'pointer-events-none opacity-70' : '' }`}>
					{!isLoading ? <a className="cursor-pointer" >Connect LSB Wallet</a> : <SpinnerWallet/>}
				</div> : <div onClick={() => {
					onOpenExtension()
					onHandleSwap()
				}} className={`btn-primary cursor-pointer mt-4 ${ isLoading ? 'pointer-events-none opacity-70' : '' }  ${outputValue ? '': 'pointer-events-none opacity-70'}`}>
					{!isLoading ? <a className={`cursor-pointer`} >Swap</a> : <SpinnerWallet/>}
				</div>}
			<OverlayDetail impact={impact} fee={fee} poolSize={poolSize}/>
		</div>
	)
}
export default withCalculateOutput(TradingPage)