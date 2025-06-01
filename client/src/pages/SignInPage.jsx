import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import imageLogo from '../assets/cat.svg'

import './SignInPage.css'
import { Link } from 'react-router'

const mockUser = {
  id: 1,
  username: "Adam",
  email: "adam@example.com",
  password: "password1234",
}

function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const authorizeMockUser = () => {
    if (email === mockUser.email) {
      if (password === mockUser.password) {
        // TODO: add real authintication
        return {
          user: mockUser,
          message: "Succesfull!"
        }
      }
      else {
        return {
          user: null,
          message: "Wrong Password"
        }
      }
    }
    else {
      return {
          user: null,
          message: "No Such User"
        }
    }
  }

  const authorizeUser = async () => {
    const data = {email, password}

    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    const userResponse = await response.json();

    console.log(userResponse);
    return userResponse
  }

  const handleSignIn = async (e) => {
    e.preventDefault()

    console.log(email, ' ', password)

    const authResponse = await authorizeUser()
    console.log('auth token', authResponse.token);
    console.log('auth id', authResponse.userId);
    localStorage.setItem('token', authResponse.token)
    window.location.href = `/user/${authResponse.userId}`

    // for mock users
    // if (authResponse.user === null) {
    //   alert(authResponse.message)
    // } 
    // else {
    //   // TODO: implement saving into a session
    //   localStorage.setItem("userId", mockUser.id)
    //   window.location.href = `/user/${mockUser.id}`
    // }
  }

  return (
    <div className='sign-in-page'>

      <div className="form-container">
        <Link to="/"><img src={imageLogo} className='image-logo-signin' alt="cat logo"></img></Link>
        <h1 className='title'>Welcome Back</h1>
        <p className='description'>Sign in to continue checking your cat's health</p>

        <form>
          <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)}/>
          <button type="submit" onClick={handleSignIn}>Sign In</button>
        </form>

        <a href="/signup" className='terms'>Don't have an account? Sign Up!</a>
      </div>

    </div>
  )
}

export default SignInPage
