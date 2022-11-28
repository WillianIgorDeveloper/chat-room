import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../../supabaseClient"

export const UpdateUser = () => {

    const [loading, setLoading] = useState(false)
    const [serverError, setServerError] = useState(false)



    const navigate = useNavigate()
    const [userSession, setUserSession] = useState(undefined)

    const verifySession = async () => {
        await supabase.auth.getSession().then(({ data: { session } }) => {
            !session && navigate('/login')
            setUserSession(session)
        })
    }

    useEffect(() => {
        verifySession()
    }, [])



    const [userName, setUserName] = useState(undefined) 

    const getUser = async () => {
        try {
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



    const handleUpdateUser = async (e) => {
        e.preventDefault()


        const username = e.target.userName.value

        try {
            setLoading(true)
            const { user } = userSession
      
            const { error } = await supabase.from('profiles').update({user_name: username, updated_at: new Date()}).eq('id', user.id)
      
            if (error) throw error
          } catch (error) {
            setLoading(false)
            setServerError(true)
          } finally {
            setLoading(false)
          }
    }

    return (
        <div>

            <form onSubmit={handleUpdateUser}>
                <label htmlFor="userName">Escolha seu nome de usuário:</label>
                <input type="text" name="userName" id="userName" />

                <button type="submit">Salvar</button>
            </form>
        </div>
    )
}