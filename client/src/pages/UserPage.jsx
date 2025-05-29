import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './UserPage.css'

function UserPage() {
  const user = {
    username: "whiskerlover99",
    email: "catmom@example.com",
    memberSince: "March 2024",
    catsUploaded: 17
  }

  return (
    <div className='user-page'>
      <Header />

      <div className="profile-container">
        <h1 className='title'>Welcome, {user.username}!</h1>
        <p className='description'>Here's your profile info:</p>

        <div className="user-info">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Member Since:</strong> {user.memberSince}</p>
          <p><strong>Cats Uploaded:</strong> {user.catsUploaded}</p>
        </div>

        <button className="upload-button" onClick={() => window.location.href = '/upload'}>
          Upload New Cat
        </button>
      </div>

      <Footer />
    </div>
  )
}

export default UserPage
