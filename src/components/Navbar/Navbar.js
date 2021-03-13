/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import logo from '../../assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { MyContext } from 'Context/MyContext'
import './Navbar.css'

export const Navbar = () => {
	const data = React.useContext(MyContext)
	const handleScroll = () => {
		if (window.scrollY > 20) {
			document.querySelector('.navbar').classList.add('scrolled')
		} else {
			document.querySelector('.navbar').classList.remove('scrolled')
		}
	}
	const onHandleConnect = () => {
		document.querySelectorAll('#btn-connect-wallet')[0].click()
	}
	const onHandleInfoAccount = () => {
		data.setIsOpenInfoAccount(!data.isOpenInfoAccount)
	}
	React.useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])
	return (
		<div className='navbar'>
			<div className='navbar-left'>
				<div className='container-logo'>
					<img className='img-logo' src={logo} alt='logo' />
					<img className='img-logo-add' src={logo} alt='logo' />
					<img className='img-logo-add' src={logo} alt='logo' />
				</div>

				<ul className='list-menu'>
					<li className='menu-item active'>pSwap</li>
					{/* Coming soon */}
					{/* <li className="menu-item">Charts</li> 
					<li className="menu-item">Stacking</li>
					<li className="menu-item">LSB Token</li> */}
				</ul>
			</div>

			{!data.accountTrading.privateKey &&
			!data.accountTrading.paymentAddress ? (
				<div onClick={onHandleConnect} className='btn-trans cursor-pointer'>
					<a>Connect LSB Wallet</a>
				</div>
			) : (
				<div
					onClick={onHandleInfoAccount}
					className='account-nav cursor-pointer'
				>
					<span>
						{data.accountTrading.paymentAddress.substr(0, 8) +
							'...' +
							data.accountTrading.paymentAddress.substr(
								data.accountTrading.paymentAddress.length - 8,
								data.accountTrading.paymentAddress.length
							)}
					</span>
					<FontAwesomeIcon icon={faUserCircle} className='icon-avt' />
				</div>
			)}
		</div>
	)
}
