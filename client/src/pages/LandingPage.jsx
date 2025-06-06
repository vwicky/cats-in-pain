import React, { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

import './LandingPage.css'

function LandingPage() {

  const beginPromptingFunc = () => {
    window.location.href = "/chat"
  }

  useEffect(() => {
    localStorage.removeItem('userId')
    console.log(localStorage.getItem('userId'));
    
  }, [])

  return (
    <div className='landing-page'>
      <Header />

      <div className="greeting-container">
        <h1 className='title'>Check your cat's aches with powerful AI models</h1>
        <p className='description'>Upload a photo, text description or a video of a cat to dicover his inner state</p>
      
        <button onClick={beginPromptingFunc}>Begin Prompting</button>
        <a href="/" className='terms'>see terms & conditions</a>
      </div>

      <Footer />
    </div>
  )
}

export default LandingPage
