import React from 'react'
import './trading-page.css'
import { MyContext } from 'Context/MyContext'
import Icon1 from '../../assets/icon-1.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faArrowDown } from '@fortawesome/free-solid-svg-icons'

import Icon2 from '../../assets/icon-2.png'

export const TradingPage = () => {
	const data = React.useContext(MyContext)
	return (
		<div className="trading-page">
			<div className="trading-top">
				<span>From</span>
				<div className="input-container">
					<input onChange={() => {}} type="text" value="1.5782" />
					<div className="token-select-input">
						<img className="token-select" src={data.tokenSell.Icon} alt="token"/>
						<div onClick={data.onHandleSelectTokens} className="token-selector cursor-pointer">
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
						<img className="token-select" src={Icon2} alt="token"/>
						<div className="token-selector">
							<span>pUSDT</span>
							<FontAwesomeIcon icon={faChevronDown} />
						</div>
					</div>: <div className="token-select-output cursor-pointer"><span>Choose a token</span> <FontAwesomeIcon icon={faChevronDown} /></div>}
				</div>
			</div>
			<div className="btn-primary">
				<a>Connect LSB Wallet</a>
			</div>
		</div>
	)
}