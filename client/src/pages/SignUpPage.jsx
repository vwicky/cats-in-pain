import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import imageLogo from '../assets/cat.svg'

import './SignInPage.css'
import { Link } from 'react-router'

function SignUpPage() {

  const handleSignIn = (e) => {
    e.preventDefault()
    // Replace this with real auth logic
    alert("Signed in!")
  }

  return (
    <div className='sign-in-page'>

      <div className="form-container">
        <Link to="/"><img src={imageLogo} className='image-logo-signin' alt="cat logo"></img></Link>
        <h1 className='title'>Welcome Thee O Cute Kitty</h1>
        <p className='description'>Sign up to begin checking your cat's health</p>

        <form onSubmit={handleSignIn}>
          <input type="text" placeholder="Username" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Sign Up</button>
        </form>

        <a href="/signin" className='terms'>Already have an account? Sign In!</a>
      </div>

    </div>
  )
}

export default SignUpPage
