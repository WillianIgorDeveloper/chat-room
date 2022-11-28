import { ThemeToggle } from "../components/ThemeToggle"

export const NotFound = () => {

    return (
        <div className="h-screen w-full flex items-center justify-center text-center">
            <ThemeToggle hidden />
            <h1 className='flex items-center gap-3 text-4xl text-indigo-1'>Página não encontrada</h1>
        </div>
    )
}