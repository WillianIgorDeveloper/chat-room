import { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'
import { Navigate } from 'react-router-dom'

export const App = () => {

    const [session, setSession] = useState(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })
        
        supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session)
        })
    }, [])
    
    return (
        <div>
            {
                !session && <Navigate to="/login" />
            }
        </div>
    )
}