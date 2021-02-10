/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { MyContext } from 'Context/MyContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './popup.css'

export const PopupFailed = ({title, content}) => {
	const data = React.useContext(MyContext)
	return(
		<div className="popup">
			<div className="heading-popup">
				<h4>{title}</h4>
				<FontAwesomeIcon onClick={() => data.setConnectFailed({
						title: '',
						content: ''
					})} className="icon" icon={faTimes} />
			</div>
			<div className="txt-frame">
				<span>{content}</span>
				<div className="btn-pop-container">
					<div onClick={() => data.setConnectFailed({
						title: '',
						content: ''
					})} className="btn-popup">
						<a>
							Ok, I got it
						</a>
					</div>
				</div> 
			</div>
			
		</div>
	)
}
export const PopupSuccess = ({title,content}) => {
	const data = React.useContext(MyContext)
	return (
		<div className="popup">
			<div className="heading-popup">
				<h4>{title}</h4>
				<FontAwesomeIcon onClick={() => data.setConnectSuccess(false)} className="icon" icon={faTimes} />
			</div>
			<div className="txt-frame">
				<span>{content}</span>
				<div className="btn-pop-container">
					<div onClick={() => data.setConnectSuccess({
						title: '',
						content: ''
					})} className="btn-popup">
						<a>
							Ok, I got it
						</a>
					</div>
				</div> 
			</div>
		</div>
	)
}