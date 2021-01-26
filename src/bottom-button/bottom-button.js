import React from 'react'
import { Tooltip } from 'components/Tooltips/Tooltips'
import './bottom-buttom.css'

export function BottomButton() {
	return (
		<div className="bottom-button">
			<div className="left">
				<Tooltip>
					<div className="connect cursor-not-allowed opacity-60">
						<a className="cursor-not-allowed" href={() => false}>Connect to LSB Wallet</a>
					</div>
				</Tooltip>
			</div>
		</div>
	)
}


