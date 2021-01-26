import React from 'react'
import './overlay-detail.css'
import { PRV } from 'services/trading/fee/pairsData'
import { MyContext } from 'Context/MyContext'
import { PRV_ID } from 'constants/constants'

export const OverlayDetail = ({impact, fee, poolSize}) => {
	const data = React.useContext(MyContext)
	const onFixedNumber = (fee) => {
		
		if(fee.fee < 100) {
			return (fee?.fee * Math.pow(10,-fee.feeToken?.pDecimals)).toFixed(fee.feeToken?.pDecimals - 1)
		} else if ( fee.fee >= 100 && fee.fee <1000) {
			return (fee?.fee * Math.pow(10,-fee.feeToken?.pDecimals)).toFixed(fee.feeToken?.pDecimals - 2)
		} else {
			return (fee?.fee * Math.pow(10,-fee.feeToken?.pDecimals)).toFixed(fee.feeToken?.pDecimals - 3)
		}
		
	}
	return ( 
		<div className="overlay-detail">
			<div className="item first-item">
				<span className="label">
					Price Impact
				</span>
				<span className="price-impact">{impact.impact || 0}%</span>
			</div>
			<div className="item first-item">
				<span className="label">
					Fee
				</span>
				<span className="">{data.tokenSell?.id && data.tokenReceive?.id ? onFixedNumber(fee) || 0 : 0}</span>
			</div>
			{
				poolSize.output1 ? poolSize.output2 ? (
					<>
						<div className="item first-item">
							<span className="label">
								Pool Size
							</span>
							<span className="pool-size">{`${poolSize?.output1[0]} ${data.tokenSell.symbol} + ${poolSize?.output1[1]} ${PRV.symbol}`}</span>
						</div>
						<div className="item first-item">
							<span className="label">
								Pool Size
							</span>
							<span className="pool-size">{`${poolSize?.output2[1]} ${PRV.symbol} + ${poolSize?.output2[0]} ${data.tokenReceive.symbol}`}</span>
						</div>
					</>
				):(
					<div className="item first-item">
							<span className="label">
								Pool Size
							</span>
							<span className="pool-size">{`${poolSize?.output1[0]} ${data.tokenSell.id === PRV_ID ? data.tokenReceive.symbol : data.tokenSell.symbol} + ${poolSize?.output1[1]} ${PRV.symbol}`}</span>
						</div>
				): <div className="item first-item">
							<span className="label">
								Pool Size
							</span>
						</div>
			}

		</div>
	)
}