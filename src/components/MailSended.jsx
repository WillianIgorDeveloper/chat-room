import { Check } from "phosphor-react"

export const MailSended = ({ bg }) => {

  return (
    <div
      className={`
        flex gap-3 justify-center items-center m-auto w-72 py-4
        text-green text-xl
        ${bg && 'bg-white-2 dark:bg-black-2 rounded shadow'}
      `}
    >
      <Check className='text-4xl'/>
      <span>Verifique seu e-mail</span>
    </div>
  )
}