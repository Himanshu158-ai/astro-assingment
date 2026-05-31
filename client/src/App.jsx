import React from 'react'
import {Routes, Route} from "react-router-dom"
import RegisterPage from "./pages/register.page"
import ChatPage from "./pages/chat.page"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RegisterPage />} />
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  )
}

export default App