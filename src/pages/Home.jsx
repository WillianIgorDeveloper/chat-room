import { ChatCircleDots } from 'phosphor-react'
import { Link } from 'react-router-dom'
import react from '../assets/react.svg'
import vite from '../assets/vite.svg'
import tailwind from '../assets/tailwindcss.svg'
import supabase from '../assets/supabase.svg'
import reactRouter from '../assets/reactrouter.svg'
import { ThemeToggle } from '../components/ThemeToggle'

export const Home = () => {

    return (
        <div className='flex flex-col h-screen md:flex-row'>
            <div className='fixed top-5 right-5'>
                <ThemeToggle />
            </div>
            <div className='py-20 flex flex-col items-center gap-6 w-2/3 text-center m-auto md:w-2/5 md:max-w-md'>
                <img src="/home-undraw.svg" alt="Ilustração" />
                <h1 className='flex items-center gap-3 text-4xl text-indigo-0'><ChatCircleDots /> Chat Room</h1>
                <Link to="/login" className='bg-indigo-0 rounded w-full py-2 text-gray-white-1 font-semibold hover:bg-indigo-1'><button>Entrar</button></Link>
            </div>

            <div className='p-4 flex bg-gray-white-1 dark:bg-gray-black-1 items-center md:flex-col-reverse md:justify-center md:items-start md:w-2/5 md:p-8'>
                <div>
                    <span className='block font-medium pb-2 text-gray-black-1 dark:text-gray-white-1 md:pt-6'>Tecnologias:</span>
                    <ul className='flex flex-col gap-1'>
                        <li className='flex items-center gap-2'><img className='w-6' src={vite} alt="Vite" /> Vite</li>
                        <li className='flex items-center gap-2'><img className='w-6' src={react} alt="React" /> React</li>
                        <li className='flex items-center gap-2'><img className='w-6' src={tailwind} alt="Tailwind" /> Tailwind</li>
                        <li className='flex items-center gap-2'><img className='w-6' src={supabase} alt="Supabase" /> Supabase</li>
                        <li className='flex items-center gap-2'><img className='w-6' src={reactRouter} alt="React Router" /> React Router</li>
                    </ul>
                </div>
                <div className='text-right flex-1 md:flex-none md:text-start'>
                    <strong className='pb-6 block font-semibold text-gray-black-1 dark:text-gray-white-1' >Desenvolvido por <a className='text-indigo-2 block underline' href="https://willianigordeveloper.vercel.app/" target="_blank">Willian Igor Developer</a></strong>
                    <span className='block text-sm'>Aplicativo de código aberto!</span>
                    <a className='text-sm text-nord-frost-3 text-indigo-2 underline' href="https://github.com/WillianIgorDeveloper/chat-room" target="_blank">Repositório no Github</a>
                </div>
            </div>
        </div>
    )
}