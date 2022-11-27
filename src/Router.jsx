import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeToggle } from './components/ThemeToggle'
import { Home } from './pages/Home'
import { App } from './pages/App'
import { Login } from './pages/Login'
import { UserChecked } from './pages/UserChecked'
import { NotFound } from './pages/NotFound'
import { useGetSession } from './hooks/useGetSession'

export const Router = () => {

    const session = useGetSession()

    return (
        <BrowserRouter>
            <ThemeToggle />
            <Routes>
                <Route index element={<Home />} />
                <Route path='/app' element={<App session={session} />} />
                <Route path='/login' element={<Login />} />
                <Route path='/userChecked' element={<UserChecked />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}