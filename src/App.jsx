import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminRoute from './components/AdminRoute'
import AppNavBar from './components/AppNavBar'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthContextProvider } from './contexts/AuthContext'
import AdminDashboard from './pages/AdminDashboard'
import AdminDatabase from './pages/AdminDatabase'
import AdminRanking from './pages/AdminRanking'
import ConsultantCenter from './pages/ConsultantCenter'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import LostnFoundCenter from './pages/LostnFoundCenter'
import ReportProblem from './pages/ReportProblem'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import SocialCenter from './pages/SocialCenter'
import Test from './pages/test'
import TagifyWithTemplates from './pages/test'
import UserProfile from './pages/UserProfile'
import "./styles.scss" // basic styles for this demo
import UserDatabase from './pages/UserDatabase'
import AcademicDashboard from './pages/Department/AcademicDashboard'
import BuildingDashboard from './pages/Department/BuildingDashboard'
import FinaceDashboard from './pages/Department/FinaceDashboard'
import WelfareDashboard from './pages/Department/WelfareDashboard'
import SCDashboard from './pages/Department/SCDashboard'
import DirectorDashboard from './pages/Department/DirectorDashboard'


function App() {
  return (
    <AuthContextProvider>
      <AppNavBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/test' element={<Test />} />

            <Route path = '/*' element= {<ProtectedRoute/>}>
              <Route path='reportproblem' element={<ReportProblem />} />
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='profile' element={<UserProfile />} />
              <Route path='social' element={<SocialCenter />} />
              <Route path='consultant' element={<ConsultantCenter />} />
              <Route path='lostnfound' element={<LostnFoundCenter />} />
            </Route>

            <Route path='/admin' element={<AdminRoute></AdminRoute>}>
              <Route path="dashboard" element={<AdminDashboard/>}/>
              <Route path="database" element={<AdminDatabase/>}/>
              <Route path="ranking" element={<AdminRanking/>}/>
              <Route path="userdb" element={<UserDatabase/>}/>
            </Route>
            
            <Route path="academic-dashboard" element={<AcademicDashboard/>}/>
            <Route path="building-dashboard" element={<BuildingDashboard/>}/>
            <Route path="welfare-dashboard" element={<WelfareDashboard/>}/>
            <Route path="finace-dashboard" element={<FinaceDashboard/>}/>
            <Route path="sc-dashboard" element={<SCDashboard/>}/>
            <Route path="director-dashboard" element={<DirectorDashboard/>}/>

          </Routes>
    </AuthContextProvider>
  )
}

export default App
