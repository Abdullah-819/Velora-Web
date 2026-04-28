import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppBootLoader from './components/AppBootLoader'
import Login from './features/auth/Login'
import Register from './features/auth/Register'

function App() {
  const [isBooting, setIsBooting] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsBooting(false)
    }, 900)

    return () => window.clearTimeout(timer)
  }, [])

  if (isBooting) {
    return <AppBootLoader />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
