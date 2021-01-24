import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import Logo from '../assets/lsb-logo.png' 
import './bottom-buttom.css'

export function BottomButton() {
	return (
		<div className="bottom-button">
			<div className="left">
				<div className="connect">
					<a href={() => false}>Connect to a wallet</a>
				</div>
				<div className="container-logo">
					<img src={Logo}  alt="logo"/>
				</div>
			</div>
			<div className="container-icon">
				<FontAwesomeIcon icon={faEllipsisH}/>
			</div>
		</div>
	)
}


