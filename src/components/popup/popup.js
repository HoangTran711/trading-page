/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { MyContext } from 'Context/MyContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faTimes,
	faArrowUp,
	faThumbsUp,
	faExternalLinkAlt,
	faThumbsDown,
} from '@fortawesome/free-solid-svg-icons'
import './popup.css'

export const PopupFailed = ({ title, content }) => {
	const data = React.useContext(MyContext)
	return (
		<div className='popup error'>
			<div className='heading-popup'>
				<h4>{title}</h4>
				<FontAwesomeIcon
					onClick={() =>
						data.setConnectFailed({
							title: '',
							content: '',
						})
					}
					className='icon'
					icon={faTimes}
				/>
			</div>
			<div className='txt-frame'>
				<div className='view-on'>
					<FontAwesomeIcon className='icon' icon={faThumbsDown} />
				</div>
				<div className='content'>
					<span>{content}</span>
				</div>
				<div className='btn-pop-container'>
					<div
						onClick={() =>
							data.setConnectFailed({
								title: '',
								content: '',
							})
						}
						className='btn-popup'
					>
						<a>Close</a>
					</div>
				</div>
			</div>
		</div>
	)
}
export const PopupSuccess = ({ title, content }) => {
	const data = React.useContext(MyContext)
	const onHandleViewDetail = () => {
		if (title === 'Trade request') {
			window.open(
				`https://mainnet.incognito.org/tx/${data.linkDetail}`,
				'_blank'
			)
		}
	}
	return (
		<div className='popup'>
			<div className='heading-popup'>
				<h4>{title}</h4>
				<FontAwesomeIcon
					onClick={() => data.setConnectSuccess(false)}
					className='icon'
					icon={faTimes}
				/>
			</div>
			<div className='txt-frame'>
				<div className='view-on'>
					<FontAwesomeIcon
						className='icon'
						icon={title !== 'Connect' ? faArrowUp : faThumbsUp}
					/>
				</div>
				<div
					onClick={onHandleViewDetail}
					className={`content ${title === 'Connect' ? 'connect' : ''}`}
				>
					<span>{content}</span>
					{title !== 'Connect' ? (
						<FontAwesomeIcon icon={faExternalLinkAlt} className='icon' />
					) : null}
				</div>
				<div className='btn-pop-container'>
					<div
						onClick={() =>
							data.setConnectSuccess({
								title: '',
								content: '',
							})
						}
						className='btn-popup'
					>
						<a>Close</a>
					</div>
				</div>
			</div>
		</div>
	)
}
