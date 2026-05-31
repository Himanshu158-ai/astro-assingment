import React from 'react'
import {Routes, Route} from "react-router-dom"
import RegisterPage from "./pages/register.page"
import ChatPage from "./pages/chat.page"
import ProtectedRoute from './components/ProtectedRoute'



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  )
}

export default App