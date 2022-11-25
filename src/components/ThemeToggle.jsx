import { Monitor, Moon, Palette, Sun } from "phosphor-react"
import { useEffect, useState } from "react"


export const ThemeToggle = () => {

   const [isOptionsOpen, setIsOptionsOpen] = useState(false)

   const [changeTheme, setChangeTheme] = useState(true)

   useEffect(() => {
      if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
         document.documentElement.classList.add('dark')
      } else {
         document.documentElement.classList.remove('dark')
      }
   },[changeTheme])

   return (
      <div className="
         text-2xl relative
         text-nord-polarNight-1
         dark:text-nord-snowStorm-1
      ">
         <Palette onClick={()=>{setIsOptionsOpen(!isOptionsOpen)}} className="cursor-pointer active:scale-95" />
         <div className={`
            absolute top-9 -right-1 py-3 px-6 rounded shadow text-xl flex flex-col gap-4
            bg-nord-snowStorm-2 text-nord-polarNight-1
            dark:bg-nord-polarNight-2 dark:text-nord-snowStorm-1
            ${isOptionsOpen ? "" : "hidden"}
         `}>
            <span className="flex items-center gap-3 hover:scale-105 cursor-pointer" onClick={()=>{setChangeTheme(!changeTheme); setIsOptionsOpen(!isOptionsOpen); localStorage.theme = 'dark'}}><Moon />Escuro</span>
            <span className="flex items-center gap-3 hover:scale-105 cursor-pointer" onClick={()=>{setChangeTheme(!changeTheme); setIsOptionsOpen(!isOptionsOpen); localStorage.theme = 'light'}}><Sun />Claro</span>
            <span className="flex items-center gap-3 hover:scale-105 cursor-pointer" onClick={()=>{setChangeTheme(!changeTheme); setIsOptionsOpen(!isOptionsOpen); localStorage.removeItem('theme')}}><Monitor />Sistema</span>
         </div>
      </div>
   )
}