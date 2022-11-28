import { useEffect, useState } from "react"
import { redirect, useNavigate } from "react-router-dom"
import { supabase } from '../../supabaseClient'
import { CircleNotch } from 'phosphor-react'

export const App = () => {

    const [loading, setLoading] = useState(false)
    const [serverError, setServerError] = useState(false)



    const navigate = useNavigate()
    const [userSession, setUserSession] = useState(undefined)

    const verifySession = async () => {
        await supabase.auth.getSession().then(({ data: { session } }) => {
            !session && navigate('/login')
            setUserSession(session)
        })
              
        supabase.auth.onAuthStateChange((_event, session) => {
            session === "SIGNED_OUT" && navigate('/login')
            setUserSession(session)
        })
    }

    useEffect(() => {
        verifySession()
    }, [])


    
    const [userName, setUserName] = useState(undefined) 

    const getUser = async () => {
        try {
            setLoading(true)
            const { user } = userSession
      
            const { data, error, status } = await supabase
              .from('profiles')
              .select(`user_name`)
              .eq('id', user.id)
              .single()
      
            if (error && status !== 406) {
              throw error
            }
      
            if (data) {
                setUserName(data.user_name)
            }
          } catch (error) {
            setLoading(false)
            setServerError(true)
          } finally {
            setLoading(false)
          }
    }

    useEffect(() => {
        userSession != undefined && getUser()
    }, [userSession])

    useEffect(() => {
        userName === null && navigate('/updateUser')
    }, [userName])


    return (
        <div>
            {
                loading ? (
                    <div className='w-60 text-2xl text-indigo-1 flex gap-3 justify-center items-center'>
                        <CircleNotch className='animate-spin' />
                        <h2>Carregando...</h2>
                    </div>
                )
                : serverError ? (
                    <div className='flex items-center gap-3 justify-center px-3 flex-col min-w-[260px]'>
                        <h2 className='text-xl text-indigo-1 flex items-center gap-3'><Warning className='text-2xl animate-bounce' /> Algo deu errado.</h2>
                        <p className='text-sm underline hover:cursor-pointer' onClick={() => {setLoading(false); setMailSended(false); setMailError(false)}}>tentar novamente</p>
                    </div>
                )  
                : (
                    <h1>Seja bem vindo {userName}!</h1>
                )
            }
        </div>
    )
}