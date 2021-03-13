/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Navbar } from './components/Navbar/Navbar'
import { PopupFailed, PopupSuccess, PopupInfoAccount } from './components'
import { getTransactionByTxId } from 'services/trading/wallet'
import { PopupTransaction, Trading } from './screens'
import { MyContext } from 'Context/MyContext'
import { SelectToken } from 'screens/trading/components'
import { useFetchToken } from 'queries/token.queries'
import { BottomButton } from './bottom-button/bottom-button'
import './tailwind.output.css'
import { notifyMe, onRequestPermission } from 'services/notification-desktop'
function App() {
	const [tokenActive, setTokenActive] = React.useState('')
	const [tokens, setTokens] = React.useState([])
	const [isOpenSetting, setIsOpenSetting] = React.useState(false)
	const [slippage, setSlippage] = React.useState(1)
	const [tokenSell, setTokenSell] = React.useState({
		Icon:
			'https://s3.amazonaws.com/incognito-org/wallet/cryptocurrency-icons/32@2x/color/prv@2x.png',
		id: '0000000000000000000000000000000000000000000000000000000000000004',
		name: 'PRV',
		displayName: 'Privacy',
		symbol: 'pPRV',
		pDecimals: 9,
		hasIcon: true,
		originalSymbol: 'PRV',
		isVerified: true,
		priceUsd: 0,
		pricePrv: 1,
	})
	const [valueInputSearch, setValueInputSearch] = React.useState('')
	const [tokenReceive, setTokenReceive] = React.useState({
		Icon: '',
		id: '',
		name: '',
		displayName: '',
		symbol: '',
		pDecimals: 0,
		hasIcon: false,
		originalSymbol: '',
		isVerified: false,
		priceUsd: 0,
	})
	const { data, isSuccess } = useFetchToken()
	const [pairs, setPairs] = React.useState([])
	const [amount, setAmount] = React.useState('0')
	const [linkDetail, setLinkDetail] = React.useState('')
	const [tradeDetail, setTradeDetail] = React.useState([])
	const [isConnectSuccess, setIsConnectSuccess] = React.useState(false)
	const [isOpenInfoAccount, setIsOpenInfoAccount] = React.useState(false)
	const [accountTrading, setAccountTrading] = React.useState(
		JSON.parse(localStorage.getItem('account-trade')) || {
			accountName: '',
			paymentAddress: '',
			privateKey: '',
			dataExpiration: '',
		}
	)
	const [activeSlippage, setActiveSlippage] = React.useState({
		active: 'percent-1',
		prevActive: '',
	})
	const [connectFailed, setConnectFailed] = React.useState({
		title: '',
		content: '',
	})
	const [connectSuccess, setConnectSuccess] = React.useState({
		title: '',
		content: '',
	})
	const [isOpenSelectTokens, setIsOpenSelectTokens] = React.useState(false)
	const onHandleExpirationAccount = () => {
		const now = new Date().getTime()
		console.log(now)
		if (accountTrading.privateKey) {
			console.log(accountTrading.dataExpiration, now)
			if (accountTrading.dataExpiration <= now) {
				localStorage.removeItem('account-trade')
			}
		}
	}
	const onHandleGetTradeDetail = async (idSent) => {
		//Will update soon
		const hisTrade = JSON.parse(localStorage.getItem('his_trade'))
		const tradeDetail = []
		if (hisTrade) {
			if (hisTrade.length === 0) {
				//Clear idSent
				idSent = []
			}
			for (let i = 0; i < hisTrade.length; i += 1) {
				try {
					const tradeStatus = await getTransactionByTxId(hisTrade[i].txId)
					if (tradeStatus.data.Result) {
						var focusing = document.hasFocus()
						if (focusing) {
							setTimeout(() => {
								onClearPopup(i)
							}, 3000)
						} else {
							if (!idSent.includes(hisTrade[i].txId)) {
								notifyMe(
									'Trade success',
									'Swap ' +
										(
											parseFloat(hisTrade[i].amount) *
											Math.pow(10, hisTrade[i].tokenSell.pDecimals)
										).toString() +
										' ' +
										hisTrade[i].tokenSell.name +
										' for ' +
										hisTrade[i].minimumAcceptableAmount +
										' ' +
										hisTrade[i].tokenReceive.name
								)
								idSent.push(hisTrade[i].txId)
							}
						}
					}
					tradeDetail.push({
						status: tradeStatus.data.Result,
						tokenSell: hisTrade[i].tokenSell,
						tokenReceive: hisTrade[i].tokenReceive,
						amount: hisTrade[i].amount,
						minimumAcceptableAmount: hisTrade[i].minimumAcceptableAmount,
						txId: hisTrade[i].txId,
					})
					console.log(idSent)
				} catch (err) {
					console.log(err)
				}
			}
		}
		setTradeDetail(tradeDetail)
	}
	const onHandleSelectTokens = (active = null) => {
		if (active) {
			setTokenActive(active)
		}
		if (isOpenSelectTokens) {
			setValueInputSearch('')
		}
		setIsOpenSelectTokens(!isOpenSelectTokens)
	}
	const onClearPopup = (index) => {
		//clear trade with index
		let hist_trade = JSON.parse(localStorage.getItem('his_trade'))
		hist_trade.splice(index, 1)
		localStorage.removeItem('his_trade')
		localStorage.setItem('his_trade', JSON.stringify(hist_trade))
	}
	React.useEffect(() => {
		if (isSuccess) {
			const temp = []
			for (let key in data) {
				temp.push(data[key])
			}
			setTokens(temp)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccess])
	React.useEffect(() => {
		let idSent = []
		onHandleExpirationAccount()
		onRequestPermission()
		onHandleGetTradeDetail()
		let fetchDetail = setInterval(async () => {
			onHandleGetTradeDetail(idSent)
		}, 7000)
		return () => clearInterval(fetchDetail)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	console.log('account trading', accountTrading)
	return (
		<MyContext.Provider
			value={{
				tokenActive: tokenActive,
				valueInputSearch: valueInputSearch,
				setValueInputSearch,
				tokens: tokens,
				fetchTokensSuccess: isSuccess,
				onHandleSelectTokens,
				tokenSell: tokenSell,
				setTokenSell,
				tokenReceive: tokenReceive,
				setTokenReceive,
				amount: amount,
				setAmount,
				pairs,
				setPairs,
				connectFailed,
				setConnectFailed,
				connectSuccess,
				setConnectSuccess,
				linkDetail: linkDetail,
				setLinkDetail,
				onHandleGetTradeDetail,
				tradeDetail: tradeDetail,
				isOpenSetting: isOpenSetting,
				setIsOpenSetting,
				slippage: slippage,
				setSlippage,
				isConnectSuccess,
				setIsConnectSuccess,
				activeSlippage,
				setActiveSlippage,
				accountTrading: accountTrading,
				setAccountTrading,
				isOpenInfoAccount: isOpenInfoAccount,
				setIsOpenInfoAccount,
			}}
		>
			<div>
				{isOpenSelectTokens ? <SelectToken /> : null}
				<Navbar />
				{isOpenInfoAccount &&
				accountTrading?.privateKey &&
				accountTrading?.paymentAddress ? (
					<PopupInfoAccount />
				) : null}
				{isOpenSetting ? (
					<div className='overlay' onClick={() => setIsOpenSetting(false)} />
				) : null}
				{connectFailed.title ? (
					<PopupFailed
						title={connectFailed.title}
						content={connectFailed.content}
					/>
				) : null}
				{connectSuccess.title ? (
					<PopupSuccess
						title={connectSuccess.title}
						content={connectSuccess.content}
					/>
				) : null}
				<PopupTransaction />
				<Trading
					slippage={slippage}
					inputToken={tokenSell}
					inputValue={
						parseFloat(amount.replace(',', '.')) *
						Math.pow(10, tokenSell?.pDecimals)
					}
					outputToken={tokenReceive}
				/>
				<BottomButton />
			</div>
		</MyContext.Provider>
	)
}

export default App
