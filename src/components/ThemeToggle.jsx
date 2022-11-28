import { Monitor, Moon, Palette, Sun } from "phosphor-react"
import { useEffect, useState } from "react"

export const ThemeToggle = ({ fixed, position, hidden }) => {

  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const [changeTheme, setChangeTheme] = useState(true)

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [changeTheme])

  return (
    <div className={`
        p-2 rounded shadow cursor-pointer z-30 
        text-2xl
        bg-indigo-1 hover:bg-indigo-2 text-white-1
        ${fixed ? "fixed top-5 right-5" : "relative"}
        ${hidden && "hidden" }
      `}
      onClick={() => { setIsOptionsOpen(!isOptionsOpen) }}
    >
      <Palette />
      <div className={`
            absolute top-11 rounded shadow text-xl flex flex-col overflow-hidden ${position === "left" && "left-0"} ${position === "right" && "right-0"}
            bg-indigo-1 text-white-1
            ${isOptionsOpen ? "" : "hidden"}
         `}>
        <span className="flex items-center gap-3 px-6 py-2 cursor-pointer hover:bg-indigo-2" onClick={() => { setChangeTheme(!changeTheme); setIsOptionsOpen(!isOptionsOpen); localStorage.theme = 'dark' }}><Moon />Escuro</span>
        <span className="flex items-center gap-3 px-6 py-2 cursor-pointer hover:bg-indigo-2" onClick={() => { setChangeTheme(!changeTheme); setIsOptionsOpen(!isOptionsOpen); localStorage.theme = 'light' }}><Sun />Claro</span>
        <span className="flex items-center gap-3 px-6 py-2 cursor-pointer hover:bg-indigo-2" onClick={() => { setChangeTheme(!changeTheme); setIsOptionsOpen(!isOptionsOpen); localStorage.removeItem('theme') }}><Monitor />Sistema</span>
      </div>
    </div>
  )
}