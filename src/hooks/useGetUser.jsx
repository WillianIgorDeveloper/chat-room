import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../supabaseClient'

export const useGetUser = (session, setLoading, setServerError) => {

  const navigate = useNavigate()

  const [userData, setUserData] = useState(undefined)

  const getUser = async () => {
    try {
      setLoading(true)
      const { user } = session
      const { data, error, status } = await supabase
        .from('profiles')
        .select(`userName`)
        .eq('id', user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }
      if (data) {
        setUserData(data)
      }
    } catch (error) {
      setServerError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    session != undefined && getUser()
  }, [session])

  useEffect(() => {
    userData === null && navigate('/updateUser')
  }, [userData])

  return userData
}