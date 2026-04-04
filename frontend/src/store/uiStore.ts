import { create } from 'zustand'

type Theme = 'light' | 'dark'

interface UIState {
  theme: Theme
  notificationsOpen: boolean
  toggleTheme: () => void
  setNotificationsOpen: (open: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  theme: (localStorage.getItem('mu-theme') as Theme | null) ?? 'dark',
  notificationsOpen: false,
  toggleTheme: () =>
    set((state) => {
      const nextTheme = state.theme === 'dark' ? 'light' : 'dark'
      localStorage.setItem('mu-theme', nextTheme)
      document.documentElement.classList.toggle('dark', nextTheme === 'dark')
      return { theme: nextTheme }
    }),
  setNotificationsOpen: (open) => set({ notificationsOpen: open }),
}))
