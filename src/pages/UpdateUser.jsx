import { useState } from "react"
import { supabase } from "../../supabaseClient"
import { BackTo } from "../components/BackTo"

import { Button } from "../components/Button"
import { Loading } from "../components/Loading"
import { ServerError } from "../components/ServerError"
import { ThemeToggle } from "../components/ThemeToggle"

import { useGetSession } from "../hooks/useGetSession"
import { useGetUser } from "../hooks/useGetUser"

export const UpdateUser = () => {

  const [loading, setLoading] = useState(true)
  const [serverError, setServerError] = useState(false)
  const [userUpdated, setUserUpdated] = useState(false)

  const session = useGetSession("login")

  const user = useGetUser(session, setLoading, setServerError)

  const handleUpdateUser = async (e) => {
    e.preventDefault()

    const username = e.target.userName.value

    try {
      setLoading(true)
      const { user } = session
      const { error } = await supabase.from('profiles').update({ userName: username, updated_at: new Date() }).eq('id', user.id)
      if (error) throw error
      console.log("oi")
      setUserUpdated(true)
      setTimeout(() => {setUserUpdated(false)}, 3000)
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
        : (
          <div className='bg-white-1 dark:bg-black-1 p-5 rounded shadow-lg w-full flex justify-center items-center container mx-auto relative'>
                <BackTo to="/app" />
                <form onSubmit={handleUpdateUser} className='flex flex-col gap-5 max-w-lg m-auto w-full'>
                  <legend className="text-center font-semibold text-xl">Editar Perfil</legend>
                  <div>
                    <label htmlFor="userName">Nome de usuário:</label>
                    <input type="text" name="userName" id="userName" className='bg-white-2 text-black-1 py-2 px-4 w-full rounded focus:outline-indigo-2' placeholder={user.userName} />
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