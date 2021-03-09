/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react'
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
export const SettingPopup = () => {
	const data = useContext(MyContext)
	const [active, setActive] = React.useState({
		active: `percent-${
			data.slippage
				? data.slippage === 1
					? '1'
					: data.slippage === 1.5
					? '2'
					: data.slippage === 2
					? '3'
					: '4'
				: '1'
		}`,
		prevActive: '',
	})
	console.log('active', active)
	const onClickPercent = (item) => {
		setActive({
			active: item,
			prevActive: active.active,
		})
	}
	React.useEffect(() => {
		if (active.prevActive) {
			document
				.querySelector(`.setting-popup .${active.prevActive}`)
				.classList.remove('active')
		}
		document
			.querySelector(`.setting-popup .${active.active}`)
			.classList.add('active')
	}, [active.active, active.prevActive])
	return (
		<div className='setting-popup'>
			<div className='content-setting'>
				<span className='title'>Slippage</span>
				<div className='slippage'>
					<div
						onClick={() => {
							onClickPercent('percent-1')
							data.setSlippage(1)
						}}
						className='item percent-1'
					>
						<span>1%</span>
					</div>
					<div
						onClick={() => {
							onClickPercent('percent-2')
							data.setSlippage(1.5)
						}}
						className='item percent-2'
					>
						<span>1.5%</span>
					</div>
					<div
						onClick={() => {
							onClickPercent('percent-3')
							data.setSlippage(2)
						}}
						className='item percent-3'
					>
						<span>2%</span>
					</div>
					<div className='input-txt'>
						<input
							value={
								data.slippage !== 1 &&
								data.slippage !== 1.5 &&
								data.slippage !== 2
									? data.slippage
									: ''
							}
							onChange={(e) => {
								const value = parseFloat(e.target.value)
								if (!isNaN(value)) {
									data.setSlippage(e.target.value)
								}
							}}
							type='number'
							className='percent-4'
							onClick={() => onClickPercent('percent-4')}
						/>
					</div>
				</div>
				{/* <div className='btn-pop-container'>
					<div className='btn-popup'>
						<a>Done</a>
					</div>
				</div> */}
			</div>
		</div>
	)
}
