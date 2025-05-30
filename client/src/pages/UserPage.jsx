import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './UserPage.css'

const mockUser = {
  id: 1,
  username: "Adam",
  bio: "I am a young Data Science fan, eager to explore more. My Github: https://github.com/vwicky", 
  email: "adam@example.com",
  memberSince: "March 2024",
  catsUploaded: 17
}

const mockPrompts = [
  { text: "Why is my cat screaming at 3am?", timestamp: Date.now() - 1000 * 60 * 60 * 24 },
  { text: "How to stop cats from biting cords?", timestamp: Date.now() - 1000 * 60 * 60 * 12 },
  { text: "Signs of cat depression", timestamp: Date.now() - 1000 * 60 * 60 * 3 },
]

function UserPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [savedPrompts, setSavedPrompts] = useState([])

  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const userId = parseInt(id)
    if (userId === mockUser.id) {
      setUser(mockUser)
      setSavedPrompts(mockPrompts)
    }
  }, [id])

  const formatTimeAgo = (timestamp) => {
    const diff = Date.now() - timestamp
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
    return 'Just now'
  }

  const handlePromptClick = (promptText) => {
    // simulate going to chat page with pre-filled prompt
    navigate(`/chat?prompt=${encodeURIComponent(promptText)}`);
  }

  const handleDelete = (index) => {
    const updated = [...savedPrompts]
    updated.splice(index, 1)
    setSavedPrompts(updated)
  }

  if (!user) {
    return (
      <div className="user-page">
        <Header />
        <div className="profile-container">
          <h2>User not found.</h2>
        </div>
        <Footer />
      </div>
    )
  }

return (
  <div className="user-page">
    <Header />

    <main className="ollama-style-container">
  <div className="profile-card">
    <img src="/cat_avatar.jpg" alt="Avatar" className="avatar" />
    <h1 className="username">{user.username}</h1>
    <p className="bio">{user.bio || "No bio"}</p>
    <button className="edit-profile" onClick={() => alert("not implemented yet, sorry🐱")}>Edit profile</button>
    <button className="start-prompting" onClick={() => window.location.href = '/chat'}>
      🪄 Begin Prompting
    </button>
  </div>

  <div className="prompt-section">
    <div className="prompt-header">
      <h2>Saved Prompts</h2>
      <div className="filter-bar">
  <button
    className={`filter-button ${filter === 'all' ? 'active' : ''}`}
    onClick={() => setFilter('all')}
  >
    All
  </button>
  <button
    className={`filter-button ${filter === 'popular' ? 'active' : ''}`}
    onClick={() => setFilter('popular')}
  >
    Popular
  </button>
</div>
    </div>

    {savedPrompts.length === 0 ? (
      <p className="empty-message">No saved prompts</p>
    ) : (
      <ul className="prompt-list">
        {savedPrompts.map((prompt, index) => (
          <li key={index} className="prompt-item">
            <div onClick={() => handlePromptClick(prompt.text)} className="prompt-content">
              <p className="prompt-text">{prompt.text}</p>
              <span className="timestamp">{formatTimeAgo(prompt.timestamp)}</span>
            </div>
            <button onClick={() => handleDelete(index)} className="delete-button">✕</button>
          </li>
        ))}
      </ul>
    )}
  </div>
</main>


    <Footer />
  </div>
)
}

export default UserPage
