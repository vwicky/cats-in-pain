import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import imageLogo from '../assets/cat.svg'

import './SignInPage.css'
import { Link } from 'react-router'

function SignInPage() {

  const handleSignIn = (e) => {
    e.preventDefault()
    // Replace this with real auth logic
    alert("Signed in!")
  }

  return (
    <div className='sign-in-page'>

      <div className="form-container">
        <Link to="/"><img src={imageLogo} className='image-logo-signin' alt="cat logo"></img></Link>
        <h1 className='title'>Welcome Back</h1>
        <p className='description'>Sign in to continue checking your cat's health</p>

        <form onSubmit={handleSignIn}>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Sign In</button>
        </form>

        <a href="/" className='terms'>Don't have an account? Sign Up!</a>
      </div>

    </div>
  )
}

export default SignInPage
