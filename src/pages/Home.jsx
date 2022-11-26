import { ChatCircleDots, GithubLogo } from 'phosphor-react'
import { Link } from 'react-router-dom'
import react from '../assets/react.svg'
import vite from '../assets/vite.svg'
import tailwind from '../assets/tailwindcss.svg'
import supabase from '../assets/supabase.svg'
import reactRouter from '../assets/reactrouter.svg'
import { ThemeToggle } from '../components/ThemeToggle'

export const Home = () => {

    return (
        <div className='p-3 container m-auto relative min-h-screen flex flex-col'>
            <ThemeToggle />
            <div className='py-14 flex flex-col items-center gap-6 w-2/3 text-center m-auto lg:w-2/5'>
                <img src="/home-undraw.svg" alt="Ilustração" />
                <h1 className='flex items-center gap-3 text-4xl text-indigo-1'><ChatCircleDots />Chat Room</h1>
                <Link to="/login" className='bg-indigo-1 rounded w-full py-2 text-white-1 font-semibold hover:bg-indigo-2'><button>Entrar</button></Link>
            </div>

            <div className='py-5 bg-white-1 dark:bg-black-1 rounded shadow-md'>
                <a className='flex items-center justify-center gap-2 text-lg text-indigo-2' href="https://github.com/WillianIgorDeveloper/chat-room" target="_blank"><GithubLogo />Aplicativo de código aberto!</a>
                <span className='block text-center pt-5 pb-3 font-medium text-black-1 dark:text-white-1'>Tecnologias</span>
                <ul className='flex flex-wrap gap-4 justify-center'>
                    <li className='flex items-center gap-2'><img className='w-6' src={vite} alt="Vite" /> Vite</li>
                    <li className='flex items-center gap-2'><img className='w-6' src={react} alt="React" /> React</li>
                    <li className='flex items-center gap-2'><img className='w-6' src={tailwind} alt="Tailwind" /> Tailwind</li>
                    <li className='flex items-center gap-2'><img className='w-6' src={supabase} alt="Supabase" /> Supabase</li>
                    <li className='flex items-center gap-2'><img className='w-6' src={reactRouter} alt="React Router" /> React Router</li>
                </ul>
                <address className='text-center pt-8 text-sm text-black-2 dark:text-white-0'>desenvolvido por <a href="" target='_blank' className='text-indigo-2'>Willian Igor Developer</a></address>
            </div>
        </div>
    )
}