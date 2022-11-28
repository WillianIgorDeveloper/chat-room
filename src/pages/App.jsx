import { useEffect, useState } from "react"
import { PencilSimple } from 'phosphor-react'
import { supabase } from "../../supabaseClient"

import { Loading } from "../components/Loading"
import { ServerError } from "../components/ServerError"

import { useGetSession } from "../hooks/useGetSession"
import { useGetUser } from "../hooks/useGetUser"
import { ThemeToggle } from "../components/ThemeToggle"
import { Link } from "react-router-dom"
import { useGetMessages } from "../hooks/useGetMessages"

export const App = () => {

  const [loading, setLoading] = useState(true)
  const [serverError, setServerError] = useState(false)

  const session = useGetSession("login")

  const user = useGetUser(session, setLoading, setServerError)

  const messages = useGetMessages(setServerError)

  const handleNewPost = async (e) => {
    e.preventDefault()
    const newMessage = e.target.message.value
    e.target.message.value = ""
    try {
      const { error } = await supabase
        .from('message')
        .insert([
          { user_id: session.user.id, message: newMessage, user_name: user.userName },
        ])
      if (error) throw error
    } catch (error) {
      setServerError(true)
    }
  }

  return (
    <div className="p-2 h-screen">
      {
        loading ? <Loading bg />
          : serverError ? <ServerError bg />
            : (
              <div className='bg-white-1 dark:bg-black-1 rounded shadow-lg w-full container mx-auto h-full relative overflow-hidden flex flex-col'>
                <div className="flex justify-between items-center bg-indigo-0 p-2">
                  <div className="flex items-center gap-3 pl-3">
                    <span>{user.userName}</span>
                    <Link to="/updateUser" title="Editar perfil"><PencilSimple className="text-xl" /></Link>
                  </div>
                  <ThemeToggle position="right" />
                </div>

                <div className="flex-1 overflow-hidden p-3 overflow-y-auto flex flex-col gap-3">
                  {
                    messages &&
                    messages.map(element => {
                      return (
                        <div key={element.id} className={`p-3 rounded-xl ${user.userName === element.user_name ? "bg-indigo-2 text-right self-end" : "bg-white-2 dark:bg-black-2 self-start"}`}>
                          <span className="block text-sm pb-2">{element.user_name}</span>
                          {element.message}
                        </div>
                      )
                    })
                  }
                </div>

                <form className="w-full bg-indigo-1 p-2 flex gap-2" onSubmit={handleNewPost}>
                  <label htmlFor="message" className="hidden">Menssagem</label>
                  <input type="text" id="message" name="message" placeholder="Digite sua mensagem..." className='bg-white-2 text-black-1 py-2 px-4 w-full rounded focus:outline-indigo-2' />
                  <button>Enviar</button>
                </form>
              </div>
            )
      }
    </div>
  )
}