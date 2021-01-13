import React from 'react'
import logo from '../../assets/logo.png'
import './Navbar.css'

export const Navbar = () => {
	return (
		<div className="navbar">
			<div className="navbar-left">
				<div className="container-logo">
					<img className="img-logo" src={logo} alt="logo" />
					<img className="img-logo-add" src={logo} alt="logo" />
					<img className="img-logo-add" src={logo} alt="logo" />
				</div>

				<ul className="list-menu">
					<li className="menu-item active">pSwap</li>
					<li className="menu-item">Charts</li>
					<li className="menu-item">Stacking</li>
					<li className="menu-item">LSB Token</li>
				</ul>
			</div>
			<div className="btn-trans">
				<a href="#/" target="_blank" className="btn">Connect LSB Wallet</a>
			</div>
		</div>
		
	)
}