import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import imageLogo from '../assets/cat.svg'

import './SignInPage.css'
import { Link } from 'react-router'
import { useState } from 'react'

function SignUpPage() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSignIn = async (e) => {
    e.preventDefault()
    const fullData = {username, email, password}
    const data = {email, password}

    // registering user
    const response = await fetch('http://localhost:5000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fullData)
    });
    const userResponse = await response.json();

    console.log(userResponse);

    const responseAuth = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    const userResponseAuth = await responseAuth.json();

    console.log('auth token', userResponseAuth.token);
    console.log('auth id', userResponseAuth.userId);
    localStorage.setItem('token', userResponseAuth.token)
    window.location.href = `/user/${userResponseAuth.userId}`

    return userResponse
  }

  return (
    <div className='sign-in-page'>

      <div className="form-container">
        <Link to="/"><img src={imageLogo} className='image-logo-signin' alt="cat logo"></img></Link>
        <h1 className='title'>Welcome Thee O Cute Kitty</h1>
        <p className='description'>Sign up to begin checking your cat's health</p>

        <form>
          <input type="text" placeholder="Username" required onChange={(e) => setUsername(e.target.value)}/>
          <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)}/>
          <button type="submit" onClick={handleSignIn}>Sign Up</button>
        </form>

        <a href="/signin" className='terms'>Already have an account? Sign In!</a>
      </div>

    </div>
  )
}

export default SignUpPage
