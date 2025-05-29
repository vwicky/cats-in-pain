import React from 'react'
import './Header.css'

import { Link } from 'react-router';
import imageLogo from '../assets/cat.svg'

function Header() {
  return (
    <header className="header-container">
      <div className="left">
        <div className="navbar-container">
          <p className='more-link'>About</p>
          <Link to="https://github.com/vwicky/cats-in-pain" className='more-link'>GitHub</Link>
        </div>
      </div>
      <div className="center">
        <h1 onClick={() => window.location.href="/"}>Cat's in Pain</h1>
        <img src={imageLogo} className='image-logo' alt="cat logo"></img>
      </div>
      <div className="right">
        <Link to="/signin"><p>User</p></Link>
      </div>
    </header>
  )
}

export default Header
