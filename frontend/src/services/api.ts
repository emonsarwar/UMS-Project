import axios from 'axios'
import { getAccessToken } from '../store/authStore'
import { authService } from './authService'

const baseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api/v1'

const api = axios.create({
  baseURL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as typeof error.config & { _retry?: boolean }

    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true
      try {
        const refreshed = await authService.refreshSession()
        if (refreshed?.token) {
          originalRequest.headers.Authorization = `Bearer ${refreshed.token}`
          return api(originalRequest)
        }
      } catch {
        authService.logout()
      }
    }

    return Promise.reject(error)
  },
)

export default api
