import { CircleNotch } from "phosphor-react"

export const Loading = ({ bg }) => {

  return (
    <div 
      className={`
        flex gap-2 justify-center items-center m-auto w-72 py-4
        text-indigo-0 text-2xl
        ${bg && 'bg-white-2 dark:bg-black-2 rounded shadow'}
      `}
    >
      <CircleNotch className='animate-spin text-3xl' />
      <span>Carregando...</span>
    </div>
  )
}