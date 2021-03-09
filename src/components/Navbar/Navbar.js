/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import logo from '../../assets/logo.png'
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
	const onHandleSwap = () => {
		document.querySelectorAll('#btn-swap')[0].click()
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

			{!data.isConnectSuccess ? (
				<div onClick={onHandleConnect} className='btn-trans cursor-pointer'>
					<a>Connect LSB Wallet</a>
				</div>
			) : (
				<div onClick={onHandleSwap} className='btn-trans cursor-pointer'>
					<a>Swap</a>
				</div>
			)}
		</div>
	)
}
