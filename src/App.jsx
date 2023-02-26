import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminRoute from './components/AdminRoute'
import AppNavBar from './components/AppNavBar'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthContextProvider } from './contexts/AuthContext'
import AdminDashboard from './pages/AdminDashboard'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import ReportProblem from './pages/ReportProblem'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Test from './pages/test'
import TagifyWithTemplates from './pages/test'
import "./styles.scss" // basic styles for this demo


function App() {
  return (
    <AuthContextProvider>
      <AppNavBar />
        <Container className='mt-5'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/test' element={<Test />} />
            <Route path = '/*' element= {<ProtectedRoute/>}>
              <Route path='reportproblem' element={<ReportProblem />} />
              <Route path='dashboard' element={<Dashboard />} />
            </Route>

            <Route path='/admin' element={<AdminRoute></AdminRoute>}>
              <Route path="dashboard" element={<AdminDashboard/>}/>
            </Route>
          </Routes>
        </Container>
    </AuthContextProvider>
  )
}

export default App
