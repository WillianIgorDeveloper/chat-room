import { Link } from "react-router-dom"
import { ChatCircleDots }from 'phosphor-react'

export const UserChecked = () => {

    return (
        <div className='h-screen w-full flex justify-center items-center flex-col gap-3 text-center'>
            <h1 className='flex items-center gap-3 text-4xl text-indigo-1'><ChatCircleDots />Chat Room</h1>
            <h2>Login efetuado com sucesso!</h2>
            <Link to="/app" className='bg-indigo-1 rounded w-60 py-2 text-white-1 font-semibold hover:bg-indigo-2'><button>Entrar no app</button></Link>
        </div> 
    )
}