import { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'
import { Navigate } from 'react-router-dom'
import { useGetSession } from '../hooks/useGetSession'

export const App = ( { session: {session} } ) => {

    return (
        <div>
            {
                !session && <Navigate to="/login" />
            }
        </div>
    )
}