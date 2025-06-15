import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './components/Layout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './components/Dashboard'
import UserDashboard from './components/UserDashboard'
import Profile from './components/Profile'
import About from './pages/About'
import Books from './components/Books'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <>
      <Routes>
        <Route element={<Layout toggleTheme={toggleTheme} isDarkMode={isDarkMode}/>}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/books" element={<Books />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
