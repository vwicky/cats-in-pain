import React from 'react'
import './Header.css'

import imageLogo from '../assets/cat.svg'

function Header() {
  return (
    <header className="header-container">
      <div className="left">
        <div className="navbar-container">
          <p className='more-link'>About</p>
          <p className='more-link'>GitHub</p>
        </div>
      </div>
      <div className="center">
        <h1>Cat's in Pain</h1>
        <img src={imageLogo} className='image-logo' alt="cat logo"></img>
      </div>
      <div className="right">
        <p>User</p>
      </div>
    </header>
  )
}

export default Header
