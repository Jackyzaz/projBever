import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppNavBar from './components/AppNavBar'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
      <BrowserRouter>
        <AppNavBar />
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
