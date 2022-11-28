import { Link } from "react-router-dom"
import { ArrowLeft } from 'phosphor-react'

export const BackTo = ({ to }) => {

  return <Link className="absolute z-20 bg-indigo-1 hover:bg-indigo-2 text-2xl rounded p-1 top-2 left-2" to={to}><ArrowLeft /></Link>
}