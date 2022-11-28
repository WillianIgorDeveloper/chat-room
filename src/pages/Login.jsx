import { ChatCircleDots, Check, CircleNotch, DiscordLogo, GithubLogo, MagicWand, Warning } from 'phosphor-react'
import { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'
import { useNavigate } from "react-router-dom"

export const Login = () => {

    const navigate = useNavigate()

    const verifySession = async () => {
        await supabase.auth.getSession().then(({ data: { session } }) => {
            session && navigate('/app')
        })
    }

    useEffect(() => {
        verifySession()
    }, [])

    const [loading, setLoading] = useState(false)
    const [mailSended, setMailSended] = useState(false)
    const [serverError, setServerError] = useState(false)

    async function signInWithEmail(e) {

        e.preventDefault()

        const email = e.target.email.value

        try {
            setLoading(true)
            const { error } = await supabase.auth.signInWithOtp({ email })
            if (error) throw error
        }
        catch (error) {
            setLoading(false)
            setServerError(true)
        }
        finally {
            setLoading(false)
            setMailSended(true)
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
        <div className='h-screen w-full flex flex-col items-center justify-center'>
            <h1 className='flex items-center gap-3 text-4xl text-indigo-1'><ChatCircleDots />Chat Room</h1>
            <div className='bg-white-1 dark:bg-black-1 m-4 max-w-sm py-5 rounded shadow-lg'>
                {
                    loading
                    ? (
                        <div className='w-60 text-2xl text-indigo-1 flex gap-3 justify-center items-center'>
                            <CircleNotch className='animate-spin' />
                            <h2>Carregando...</h2>
                        </div>
                    )
                    : mailSended
                    ? (
                        <div className='text-xl text-indigo-1 flex items-center gap-3 justify-center px-3 min-w-[260px]'>
                            <Check className='text-2xl' />
                            <h2>Verifique sua caixa de e-mail.</h2>
                        </div>
                    ) 
                    : serverError
                    ? (
                        <div className='flex items-center gap-3 justify-center px-3 flex-col min-w-[260px]'>
                            <h2 className='text-xl text-indigo-1 flex items-center gap-3'><Warning className='text-2xl animate-bounce' /> Algo deu errado.</h2>
                            <p className='text-sm underline hover:cursor-pointer' onClick={() => {setLoading(false); setMailSended(false); setMailError(false)}}>tentar novamente</p>
                        </div>
                    )
                    : (
                        <div>
                            <span className='block text-center pb-5 text-xl font-medium'>Login</span>
                            <div className='flex flex-wrap gap-5 justify-center'>
                                <button onClick={signInWithDiscord} className="flex items-center justify-center gap-3 bg-indigo-1 hover:bg-indigo-2 py-2 w-60 text-lg text-white-2 rounded"><DiscordLogo />Entrar com Discord</button>
                                <button onClick={signInWithGitHub} className="flex items-center justify-center gap-3 bg-indigo-1 hover:bg-indigo-2 py-2 w-60 text-lg text-white-2 rounded"><GithubLogo />Entrar com Github</button>
                            </div>
                            <form className='flex flex-col items-center gap-2' onSubmit={signInWithEmail}>
                                <label htmlFor="email" className='flex items-center justify-center gap-2 pt-5'>Entrar com link mágico <MagicWand /></label>
                                <input type="email" name="email" id="email" placeholder='Digite seu e-mail...' className='bg-white-2 text-black-1 py-2 px-4 w-60 rounded focus:outline-indigo-1' />
                                <button type='submit' className="flex items-center justify-center gap-3 bg-indigo-1 hover:bg-indigo-2 py-2 w-60 text-white-2 rounded">Enviar</button>
                            </form>
                        </div>
                    )
                }
            </div>
        </div>
    )
}