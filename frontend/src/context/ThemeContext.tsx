import { useEffect, type PropsWithChildren } from 'react'
import { useUIStore } from '../store/uiStore'

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const theme = useUIStore((state) => state.theme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return <>{children}</>
}

export const useTheme = () => {
  const theme = useUIStore((state) => state.theme)
  const toggleTheme = useUIStore((state) => state.toggleTheme)

  return { theme, toggleTheme }
}
