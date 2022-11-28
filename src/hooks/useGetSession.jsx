import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import { supabase } from "../../supabaseClient"  

export const useGetSession = (redirect) => {

  const navigate = useNavigate()
  const [session, setSession] = useState(undefined)

  const verifySession = async () => {
    await supabase.auth.getSession().then(({ data: { session } }) => {
      redirect === "login" && !session && navigate('/login')
      redirect === "app" && session && navigate('/app')
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      session === "SIGNED_OUT" && navigate('/login')
      setSession(session)
    })
  }

  useEffect(() => {
    verifySession()
  }, [])

  return session
}