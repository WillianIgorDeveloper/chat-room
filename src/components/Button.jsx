import { Link } from 'react-router-dom'

export const Button = ({ children, to, onClick }) => {

  return (
    <>
      {
        to ? (
          <button className='w-full'>
            <Link to={to} className='flex items-center justify-center gap-3 w-full py-2 bg-indigo-1 hover:bg-indigo-2 rounded text-white-1 font-medium text-lg'>
              {children}
            </Link>
          </button>
        )
          : (
            <button onClick={onClick} className='flex items-center justify-center gap-3 w-full py-2 bg-indigo-1 hover:bg-indigo-2 rounded text-white-1 font-medium text-lg'>
              {children}
            </button>
          )
      }
    </>
  )
}