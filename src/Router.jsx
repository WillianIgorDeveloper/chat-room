import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { App } from './pages/App'
import { Login } from './pages/Login'
import { NotFound } from './pages/NotFound'
import { UpdateUser } from './pages/UpdateUser'

export const Router = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/app' element={<App />} />
        <Route path='/login' element={<Login />} />
        <Route path='/updateUser' element={<UpdateUser />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}