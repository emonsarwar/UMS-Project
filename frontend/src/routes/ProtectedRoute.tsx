import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Loader from '../components/ui/Loader'
import { useAuth } from '../hooks/useAuth'
import type { Role } from '../types'

interface ProtectedRouteProps {
  allowedRole: Role
}

const ProtectedRoute = ({ allowedRole }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, role } = useAuth()

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || role !== allowedRole)) {
      toast.error('Please login with the correct portal account.')
    }
  }, [allowedRole, isAuthenticated, isLoading, role])

  if (isLoading) {
    return <Loader />
  }

  if (!isAuthenticated || role !== allowedRole) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
