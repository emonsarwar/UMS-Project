import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Role, User } from '../types'
import { authService } from '../services/authService'

interface AuthState {
  user: User | null
  role: Role | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  initialize: () => void
  login: (identifier: string, password: string, role: Role) => Promise<User | null>
  logout: () => void
  refreshUser: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      role: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      initialize: () => {
        const currentUser = authService.getCurrentUser()
        set({
          user: currentUser,
          role: currentUser?.role ?? null,
          token: currentUser?.token ?? null,
          isAuthenticated: Boolean(currentUser?.token),
          isLoading: false,
        })
      },
      login: async (identifier, password, role) => {
        set({ isLoading: true })
        const user = await authService.login(identifier, password, role)
        set({
          user,
          role: user?.role ?? null,
          token: user?.token ?? null,
          isAuthenticated: Boolean(user?.token),
          isLoading: false,
        })
        return user
      },
      logout: () => {
        authService.logout()
        set({ user: null, role: null, token: null, isAuthenticated: false })
      },
      refreshUser: () => {
        const currentUser = authService.getCurrentUser()
        set({
          user: currentUser,
          role: currentUser?.role ?? null,
          token: currentUser?.token ?? null,
          isAuthenticated: Boolean(currentUser?.token),
        })
      },
    }),
    {
      name: 'mu-auth-store',
      partialize: (state) => ({
        user: state.user,
        role: state.role,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)

export const getAccessToken = () => useAuthStore.getState().token
