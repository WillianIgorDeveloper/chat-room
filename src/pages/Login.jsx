import { useState } from 'react'
import { DiscordLogo, GithubLogo, MagicWand } from 'phosphor-react'
import { supabase } from '../../supabaseClient'

import { Loading } from '../components/Loading'
import { MailSended } from '../components/MailSended'
import { ServerError } from "../components/ServerError"
import { Logo } from '../components/Logo'
import { Button } from '../components/Button'
import { ThemeToggle } from "../components/ThemeToggle"

import { useGetSession } from "../hooks/useGetSession"

export const Login = () => {

   const [loading, setLoading] = useState(false)
   const [serverError, setServerError] = useState(false)
   const [mailSended, setMailSended] = useState(false)

   const session = useGetSession("app")

   async function signInWithEmail(e) {
      e.preventDefault()
      setLoading(true)
      const newEmail = e.target.email.value
      try {
         const { error } = await supabase.auth.signInWithOtp({ email: newEmail })
         if (error) throw error
         setMailSended(true)
      }
      catch (error) {
         setServerError(true)
      }
      finally {
         setLoading(false)
      }
   }

   async function signInWithDiscord() {
      const { error } = await supabase.auth.signInWithOAuth({
         provider: 'discord',
      })
      error && setServerError(true)
   }

   async function signInWithGitHub() {
      const { error } = await supabase.auth.signInWithOAuth({
         provider: 'github',
      })
      error && setServerError(true)
   }

   return (
      <div className='h-screen w-full flex flex-col items-center justify-center p-4'>
         <ThemeToggle fixed={true} position="right" />
         <Logo />
         <div className='bg-white-1 dark:bg-black-1 p-5 mt-4 rounded shadow-lg w-full container mx-auto'>
            {
               loading ? <Loading />
                  : mailSended ? <MailSended />
                     : serverError ? <ServerError />
                        : (
                           <div className='max-w-lg m-auto'>
                              <span className='block text-center pb-5 text-xl font-semibold'>Login</span>
                              <div className='flex flex-col gap-5'>
                                 <Button onClick={signInWithDiscord}><DiscordLogo />Entrar com Discord</Button>
                                 <Button onClick={signInWithGitHub}><GithubLogo />Entrar com Github</Button>
                              </div>
                              <form className='flex flex-col items-center gap-2 pt-5' onSubmit={signInWithEmail}>
                                 <legend className='hidden'>Login</legend>
                                 <label htmlFor="email" className='flex items-center justify-center gap-3'>Entrar com link mágico <MagicWand /></label>
                                 <input type="email" name="email" id="email" placeholder='Digite seu e-mail...' className='bg-white-2 text-black-1 py-2 px-4 w-full rounded focus:outline-indigo-2' />
                                 <Button type='submit'>Enviar</Button>
                              </form>
                           </div>
                        )
            }
         </div>
      </div>
   )
}