import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppNavBar from './components/AppNavBar'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthContextProvider } from './contexts/AuthContext'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'

function App() {
  return (
    <AuthContextProvider>
      <AppNavBar />
        <Container className='mt-5'>
          <Routes>
            <Route path='/' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          </Routes>
        </Container>
    </AuthContextProvider>
  )
}

export default App
