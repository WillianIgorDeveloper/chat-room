import { supabase } from "../../supabaseClient"
import { useEffect, useState } from "react"

export const useGetSession = () => {

    const [session, setSession] = useState(null)
  
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
          setSession(session)
        })
      
        supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session)
        })
    }, [])

    return {
        session
    }
  }