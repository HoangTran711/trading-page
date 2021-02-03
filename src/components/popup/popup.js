import React from 'react'
import { MyContext } from 'Context/MyContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './popup.css'

export const PopupFailed = () => {
	const data = React.useContext(MyContext)
	return(
		<div className="popup">
			<div className="heading-popup">
				<h4>Failed</h4>
				<FontAwesomeIcon onClick={() => data.setConnectFailed(false)} className="icon" icon={faTimes} />
			</div>
			<div className="txt-frame">
				<span>Connect failed, please login or create wallet before connect to your wallet</span>
				<div className="btn-pop-container">
					<div onClick={() => data.setConnectFailed(false)} className="btn-popup">
						<a href={() => false}>
							Ok, I got it
						</a>
					</div>
				</div> 
			</div>
			
		</div>
	)
}
export const PopupSuccess = () => {
	const data = React.useContext(MyContext)
	return (
		<div className="popup">
			<div className="heading-popup">
				<h4>Success</h4>
				<FontAwesomeIcon onClick={() => data.setConnectSuccess(false)} className="icon" icon={faTimes} />
			</div>
			<div className="txt-frame">
				<span>Successful connection</span>
				<div className="btn-pop-container">
					<div onClick={() => data.setConnectSuccess(false)} className="btn-popup">
						<a href={() => false}>
							Ok, I got it
						</a>
					</div>
				</div> 
			</div>
		</div>
	)
}