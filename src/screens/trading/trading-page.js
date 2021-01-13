import React from 'react'
import './trading-page.css'
import { MyContext } from 'Context/MyContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'

export const TradingPage = () => {
	const data = React.useContext(MyContext)
	const [isErrorSell, setIsErrorSell] = React.useState(false)
	const [isErrorReceive, setIsErrorReceive] = React.useState(false)
	const onErrorLoadImageSell = () => {
		
		setIsErrorSell(true)
	}
	const onErrorLoadImageReceive = () => {
		setIsErrorReceive(true)
	}
	React.useEffect(() => {
		console.log(isErrorSell)
		setIsErrorReceive(false)
		setIsErrorSell(false)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data?.tokenSell, data?.tokenReceive?.Icon])
	return (
		<div className="trading-page">
			<div className="trading-top">
				<span>From</span>
				<div className="input-container">
					<input onChange={() => {}} type="text" value="1.5782" />
					<div className="token-select-input">
						{!isErrorSell ? <img onError={onErrorLoadImageSell} className="token-select" src={data.tokenSell.Icon} alt="token"/>: <FontAwesomeIcon className="icon-unknown" icon={faQuestionCircle} />}
						<div onClick={() => data.onHandleSelectTokens('sell')} className="token-selector cursor-pointer">
							<span>{data.tokenSell.Name}</span>
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
					<input onChange={() =>{}} type="text" value="919.242"/>
					{data.tokenReceive ? <div className="token-select-output">
					{!isErrorReceive ? <img onError={onErrorLoadImageReceive} className="token-img-output" src={data.tokenReceive.Icon} alt="token"/>: <FontAwesomeIcon className="icon-unknown" icon={faQuestionCircle} />}
						<div onClick={() => data.onHandleSelectTokens('receive')} className="cursor-pointer token-selector">
							<span>{data.tokenReceive.Name}</span>
							<FontAwesomeIcon icon={faChevronDown} />
						</div>
					</div>: <div onClick={() => data.onHandleSelectTokens('receive')} className="token-select-output cursor-pointer "><span className="font-semibold">Choose a token</span> <FontAwesomeIcon icon={faChevronDown} /></div>}
				</div>
			</div>
			<div className="btn-primary">
				<a href="#/" >Connect LSB Wallet</a>
			</div>
		</div>
	)
}