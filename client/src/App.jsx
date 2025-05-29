import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router';

import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import SignInPage from './pages/SignInPage';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
