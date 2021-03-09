import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faCheckCircle,
	faTimes,
	faTimesCircle,
} from '@fortawesome/free-solid-svg-icons'
import { MyContext } from 'Context/MyContext'
import './popup-transaction.css'

export function PopupTransaction() {
	const data = React.useContext(MyContext)
	const onHandleClose = (index) => {
		let hist_trade = JSON.parse(localStorage.getItem('his_trade'))
		hist_trade.splice(index, 1)
		localStorage.removeItem('his_trade')
		localStorage.setItem('his_trade', JSON.stringify(hist_trade))
		data.onHandleGetTradeDetail()
	}
	return (
		<div className='popup-transaction'>
			<ul>
				{data.tradeDetail?.map((trade, index) => {
					if (trade.status !== null) {
						return (
							<li>
								<div className='tick'>
									<FontAwesomeIcon
										icon={trade.status === 2 ? faTimesCircle : faCheckCircle}
									/>
								</div>
								<div className='txt-frame'>
									<span>
										Swap{' '}
										{parseFloat(trade.amount) *
											Math.pow(10, trade.tokenSell.pDecimals)}{' '}
										{trade.tokenSell.name} for {trade.minimumAcceptableAmount}{' '}
										{trade.tokenReceive.name}{' '}
									</span>
									<span
										className='cursor-pointer view'
										onClick={() =>
											window.open(
												`https://mainnet.incognito.org/tx/${trade.txId}`
											)
										}
									>
										View on mainnet
									</span>
								</div>
								<div
									onClick={() => onHandleClose(index)}
									className='cursor-pointer fa-close'
								>
									<FontAwesomeIcon icon={faTimes} />
								</div>
							</li>
						)
					}
					return null
				})}
			</ul>
		</div>
	)
}
