import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { App } from './pages/App'
import { Login } from './pages/Login'
import { UserChecked } from './pages/UserChecked'
import './index.css'
import { ThemeToggle } from './components/ThemeToggle'
import { NotFound } from './pages/NotFound'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeToggle />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/app' element={<App />} />
        <Route path='/login' element={<Login />} />
        <Route path='/userChecked' element={<UserChecked />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
