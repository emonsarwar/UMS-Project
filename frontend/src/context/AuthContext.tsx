import { useEffect, type PropsWithChildren } from 'react'
import { useAuthStore } from '../store/authStore'

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const initialize = useAuthStore((state) => state.initialize)

  useEffect(() => {
    initialize()
  }, [initialize])

  return <>{children}</>
}
