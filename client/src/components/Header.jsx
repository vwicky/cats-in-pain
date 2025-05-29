import React, { useEffect, useState } from 'react'
import './Header.css'

import { Link } from 'react-router';
import imageLogo from '../assets/cat.svg'

function Header() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

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
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <Link to="/signin"><p>User</p></Link>
      </div>
    </header>
  )
}

export default Header
