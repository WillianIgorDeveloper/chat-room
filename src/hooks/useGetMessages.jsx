import { useEffect, useState } from "react"
import { supabase } from "../../supabaseClient"

export const useGetMessages = (setServerError) => {

  const [messages, setMessages] = useState({})

  const getMessages = async () => {
    try {
      const { data: message, error } = await supabase
        .from('message')
        .select('*')

      if (error) throw error

      setMessages(message)
    } catch (error) {
      setServerError(true)
    }
  }

  useEffect(() => {
    getMessages()
  }, [])

  return messages
}