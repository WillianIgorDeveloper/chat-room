import { Warning } from 'phosphor-react'
import { Link } from 'react-router-dom'

export const ServerError = ({ bg }) => {

  return (
    <div
      className={`
        flex flex-col justify-center items-center gap-3 m-auto w-72 py-4
        ${bg && 'bg-white-2 dark:bg-black-2 rounded shadow'}
      `}
    >
      <span 
        className='text-2xl text-red flex items-center gap-3'
      >
        <Warning className='text-3xl'/>Algo deu errado
      </span>
      <Link to="/app" className='text-sm underline hover:cursor-pointer'>Retornar ao app</Link>
    </div>
  )
}