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
import { faCopy } from '@fortawesome/free-regular-svg-icons'
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
					className={`content ${
						title === 'Connection Request' ? 'connect' : ''
					}`}
				>
					<span>{content}</span>
					{title !== 'Connection Request' ? (
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
	const onClickPercent = (item) => {
		data.setActiveSlippage({
			active: item,
			prevActive: data.activeSlippage.active,
		})
	}
	React.useEffect(() => {
		if (data.activeSlippage.prevActive) {
			document
				.querySelector(`.setting-popup .${data.activeSlippage.prevActive}`)
				.classList.remove('active')
		}
		document
			.querySelector(`.setting-popup .${data.activeSlippage.active}`)
			.classList.add('active')
	}, [data.activeSlippage.active, data.activeSlippage.prevActive])
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
							defaultValue={data.slippage || 1}
							onChange={(e) => {
								const value = parseFloat(e.target.value)
								data.setSlippage(value)
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
export const PopupInfoAccount = () => {
	const data = React.useContext(MyContext)
	const onHandleInfoAccount = () => {
		data.setIsOpenInfoAccount(!data.isOpenInfoAccount)
	}
	const onLogoutAccount = () => {
		onHandleInfoAccount()
		localStorage.removeItem('account-trade')
		data.setAccountTrading({
			accountName: '',
			paymentAddress: '',
			privateKey: '',
			dataExpiration: '',
		})
	}
	const onCopyAddress = () => {
		const elem = document.createElement('textarea')
		document.body.appendChild(elem)
		elem.value = data.accountTrading.paymentAddress
		elem.select()
		document.execCommand('copy')
		document.body.removeChild(elem)
	}
	return (
		<div className='info-account'>
			<div className='heading-popup'>
				<h4>Your Wallet</h4>
				<FontAwesomeIcon
					onClick={onHandleInfoAccount}
					className='icon cursor-pointer'
					icon={faTimes}
				/>
			</div>
			<div className='txt-frame'>
				<span className='payment-address'>
					{data.accountTrading.paymentAddress.substr(0, 55) + '...'}
				</span>
				<span onClick={onCopyAddress} className='payment-copy'>
					Copy Address <FontAwesomeIcon className='icon-copy' icon={faCopy} />
				</span>
				<div className='btn-pop-container btn-logout'>
					<div onClick={onLogoutAccount} className='btn-popup'>
						<a>Logout</a>
					</div>
				</div>
			</div>
		</div>
	)
}
