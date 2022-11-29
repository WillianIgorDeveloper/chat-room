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


import { useNavigate } from "react-router-dom"


export const App = () => {

   const navigate = useNavigate()
   const [loading, setLoading] = useState(false)
   const [serverError, setServerError] = useState(false)



   const [session, setSession] = useState()

   const getSession = async () => {
      setLoading(true)
      const { data, error } = await supabase.auth.getSession()
      if (error) {
         setServerError(true)
         return
      }
      if (!data.session) {
         navigate('/login')
         return
      }
      setSession(data)
      setLoading(false)
   }

   useEffect(() => {
      getSession()
   }, [])



   const [user, setUser] = useState()

   const getUser = async () => {
      setLoading(true)
      const { data: profile, error } = await supabase
         .from('profiles')
         .select("*")
         .eq('user_id', session.session.user.id)

      if (error) {
         setServerError(true)
         return
      }

      if (!profile.length) {
         const { error } = await supabase
            .from('profiles')
            .insert([
               { user_id: session.session.user.id, nick_name: "" },
            ])

         if (error) {
            setServerError(true)
            return
         }

         getUser()
         return
      }

      if (profile[0].nick_name === "") {
         navigate('/updateUser')
         return
      }

      setUser(profile[0])
      setLoading(false)
   }

   useEffect(() => {
      session && getUser()
   }, [session])



   const [messages, setMessages] = useState()

   const getMessages = async () => {
      const { data: messages, error } = await supabase
         .from('messages')
         .select('*')

      if (error) {
         setServerError(true)
         return
      }

      setMessages(messages)
   }

   useEffect(() => {
      user && getMessages()
   }, [user])



   const handleNewPost = async (e) => {
      e.preventDefault()
      const newMessage = e.target.message.value
      const { error } = await supabase
         .from('messages')
         .insert([
            { posted_by: user.nick_name, content: newMessage },
         ])

      if (error) {
         setServerError(true)
         return
      }

      e.target.message.value = ""
   }

   useEffect(() => {

      supabase.channel('messages')
         .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'messages' },
            () => {
               getMessages()
            }
         )
         .subscribe()
   }, [])

   return (
      <div className="p-2 h-screen">
         {
            loading ? <Loading bg />
               : serverError ? <ServerError bg />
                  : user && (
                     <div className='bg-white-1 dark:bg-black-1 rounded shadow-lg w-full container mx-auto h-full relative overflow-hidden flex flex-col'>
                        <div className="flex justify-between items-center bg-indigo-0 p-2">
                           <div className="flex items-center gap-3 pl-3">
                              <span>{user.nick_name}</span>
                              <Link to="/updateUser" title="Editar perfil"><PencilSimple className="text-xl" /></Link>
                           </div>
                           <ThemeToggle position="right" />
                        </div>

                        <div className="flex-1 overflow-hidden p-3 overflow-y-auto flex flex-col gap-3">
                           {
                              messages &&
                              messages.map(element => {
                                 return (
                                    <div key={element.id} className={`p-3 rounded-xl ${user.nick_name === element.posted_by ? "bg-indigo-2 text-right self-end" : "bg-white-2 dark:bg-black-2 self-start"}`}>
                                       <span className="block text-sm pb-2">{element.posted_by}</span>
                                       {element.content}
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