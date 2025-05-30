import React, { useEffect, useState } from 'react'
import './Header.css'

import { Link } from 'react-router';
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
    const userId = localStorage.getItem('userId') || null;

    if (userId !== null) {
      // TODO: mock user here
      setUser(mockUser)
    } 
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
        {
          user === null ?
            (<Link to="/signin"><p>User</p></Link>) :
            (<Link to={`/user/${user.id}`}><p>{user.username}</p></Link>)
        }
      </div>
    </header>
  )
}

export default Header
