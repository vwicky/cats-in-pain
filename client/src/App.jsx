import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router';

import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
