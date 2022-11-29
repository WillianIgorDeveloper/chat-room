import { useState, useEffect } from "react"
import { supabase } from "../../supabaseClient"
import { BackTo } from "../components/BackTo"

import { Button } from "../components/Button"
import { Loading } from "../components/Loading"
import { ServerError } from "../components/ServerError"
import { ThemeToggle } from "../components/ThemeToggle"


export const UpdateUser = () => {

   const [loading, setLoading] = useState(true)
   const [serverError, setServerError] = useState(false)
   const [userUpdated, setUserUpdated] = useState(false)



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

      setUser(profile[0])
      setLoading(false)
   }

   useEffect(() => {
      session && getUser()
   }, [session])



   const handleUpdateUser = async (e) => {
      e.preventDefault()
      const newNickName = e.target.nickName.value
      setLoading(true)
      try {
         const { error } = await supabase
            .from('profiles')
            .update({ nick_name: newNickName })
            .eq('user_id', user.user_id)

         if (error) throw error

         setUserUpdated(true)
         setTimeout(() => { setUserUpdated(false) }, 3000)
         getUser()
      } catch (error) {
         setServerError(true)
      } finally {
         setLoading(false)
      }
   }



   return (
      <div className='h-screen w-full flex flex-col items-center justify-center p-4'>
         <ThemeToggle fixed={true} position="right" />
         {
            loading ? <Loading />
               : serverError ? <ServerError />
                  : user && (
                     <div className='bg-white-1 dark:bg-black-1 p-5 rounded shadow-lg w-full flex justify-center items-center container mx-auto relative'>
                        <BackTo to="/app" />
                        <form onSubmit={handleUpdateUser} className='flex flex-col gap-5 max-w-lg m-auto w-full'>
                           <legend className="text-center font-semibold text-xl">Editar Perfil</legend>
                           <div>
                              <label htmlFor="nickName">Nome de usuário:</label>
                              <input type="text" name="nickName" id="nickName" className='bg-white-2 text-black-1 py-2 px-4 w-full rounded focus:outline-indigo-2' placeholder={user.nick_name} />
                           </div>
                           <Button type="submit">Salvar</Button>
                        </form>
                     </div>
                  )
         }
         {
            userUpdated && <div className="w-40 bg-green flex items-center justify-center py-2 rounded shadow fixed bottom-5 animate-pulse text-lg text-white-0">Perfil atualizado!</div>
         }
      </div>
   )
}