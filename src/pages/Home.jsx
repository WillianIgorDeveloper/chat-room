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
            <div className='flex-1 flex flex-col justify-center items-center gap-2'>
                <h1 className='flex items-center gap-3 text-4xl text-nord-frost-1'>Chat Room<ChatCircleDots /></h1>
                <p className='text-lg'>Seja bem vindo!</p>
                <Link to="/login" className='bg-nord-aurora-gren text-nord-snowStorm-1 px-12 rounded font-semibold py-2 hover:opacity-90'><button>Entrar</button></Link>
            </div>
            <div className='flex-1 flex flex-col bg-nord-snowStorm-1 dark:bg-nord-polarNight-1 gap-4 p-4 md:justify-center md:p-8'>
                <div className='flex flex-col gap-2'>
                    <span className='text-nord-polarNight-1 dark:text-nord-snowStorm-1 font-medium'>Tecnologias:</span>
                    <ul className='flex flex-col gap-1'>
                        <li className='flex items-center gap-2'><img className='w-6' src={vite} alt="Vite" /> Vite</li>
                        <li className='flex items-center gap-2'><img className='w-6' src={react} alt="React" /> React</li>
                        <li className='flex items-center gap-2'><img className='w-6' src={tailwind} alt="Tailwind" /> Tailwind</li>
                        <li className='flex items-center gap-2'><img className='w-6' src={supabase} alt="Supabase" /> Supabase</li>
                        <li className='flex items-center gap-2'><img className='w-6' src={reactRouter} alt="React Router" /> React Router</li>
                    </ul>
                </div>
                <div>
                    <span className='block text-sm'>Aplicativo de código aberto!</span>
                    <a className='text-sm text-nord-frost-3' href="https://github.com/WillianIgorDeveloper/chat-room" target="_blank">Repositório do projeto no Github</a>
                </div>
                <strong className='text-center font-medium' >Desenvolvido por <a className='text-nord-frost-3' href="https://willianigordeveloper.vercel.app/" target="_blank">Willian Igor Developer</a></strong>
            </div>
        </div>
    )
}