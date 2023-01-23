import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home'
import Dashboard from './components/DashBoard'
import Login from './components/Login'
import SignUp from './components/SignUp'
import { AuthProvider } from "./components/Auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
