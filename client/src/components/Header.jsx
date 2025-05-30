import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import './Header.css'

import imageLogo from '../assets/cat.svg'

const mockUser = {
  id: 1,
  username: "Adam",
  email: "adam@example.com",
  memberSince: "March 2024",
  catsUploaded: 17
}

function Header() {
  const [theme, setTheme] = useState('light')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    if (userId) setUser(mockUser)
  }, [])

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
      <div className="header-left navbar-container">
        <Link to="/about" className="nav-link">About</Link>
        <a href="https://github.com/vwicky/cats-in-pain" className="nav-link" target="_blank" rel="noreferrer">GitHub</a>
      </div>

      <div className="center" onClick={() => window.location.href = '/'}>
        <h1 className="site-title">Cat's in Pain</h1>
        <img src={imageLogo} className="image-logo" alt="cat logo" />
      </div>

      <div className="header-right">
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        {user ? (
          <Link to={`/user/${user.id}`} className="nav-link">{user.username}</Link>
        ) : (
          <Link to="/signin" className="nav-link">Sign In</Link>
        )}
      </div>
    </header>
  )
}

export default Header
