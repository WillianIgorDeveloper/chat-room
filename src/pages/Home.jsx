import { GithubLogo } from 'phosphor-react'

import { Logo } from '../components/Logo'
import { Button } from '../components/Button'
import { ThemeToggle } from '../components/ThemeToggle'

import reactIcon from '../assets/react-icon.svg'
import viteIcon from '../assets/vite-icon.svg'
import tailwindIcon from '../assets/tailwindcss-icon.svg'
import supabaseIcon from '../assets/supabase-icon.svg'
import reactRouterIcon from '../assets/reactrouter-icon.svg'

export const Home = () => {

  return (
    <div className='p-3 container m-auto min-h-screen flex flex-col items-center'>
      <ThemeToggle position="right" fixed />
      <div className='py-10 flex flex-col items-center gap-6 w-2/3 lg:w-2/5'>
        <img src="/undraw-home.svg" alt="Ilustração" />
        <Logo />
        <Button to="/app">Entrar</Button>
      </div>

      <div className='p-5 bg-white-1 dark:bg-black-1 rounded shadow-lg w-full'>
        <a className='flex items-center justify-center gap-2 text-lg text-indigo-2' href="https://github.com/WillianIgorDeveloper/chat-room" target="_blank"><GithubLogo />Aplicativo de código aberto!</a>
        <span className='block text-center pt-5 pb-3 font-medium text-black-1 dark:text-white-1'>Tecnologias</span>
        <ul className='flex flex-wrap gap-4 justify-center'>
          <li className='flex items-center gap-2'><img className='w-6' src={viteIcon} alt="Vite" /> Vite</li>
          <li className='flex items-center gap-2'><img className='w-6' src={reactIcon} alt="React" /> React</li>
          <li className='flex items-center gap-2'><img className='w-6' src={tailwindIcon} alt="Tailwind" /> Tailwind</li>
          <li className='flex items-center gap-2'><img className='w-6' src={supabaseIcon} alt="Supabase" /> Supabase</li>
          <li className='flex items-center gap-2'><img className='w-6' src={reactRouterIcon} alt="React Router" /> React Router</li>
        </ul>
        <address className='text-center pt-8 text-sm text-black-2 dark:text-white-0'>desenvolvido por <a href="https://willianigordeveloper.vercel.app/" target='_blank' className='text-indigo-2'>Willian Igor Developer</a></address>
      </div>
    </div>
  )
}