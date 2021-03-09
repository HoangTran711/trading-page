/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Tooltip } from 'components/Tooltips/Tooltips'
import logo from '../../assets/logo.png'
import './Navbar.css'

export const Navbar = () => {
	const handleScroll = () => {
		if (window.scrollY > 20) {
			document.querySelector('.navbar').classList.add('scrolled')
		} else {
			document.querySelector('.navbar').classList.remove('scrolled')
		}
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
			<Tooltip>
				<div className='cursor-not-allowed btn-trans'>
					<a className='btn cursor-not-allowed'>Connect LSB Wallet</a>
				</div>
			</Tooltip>
		</div>
	)
}
