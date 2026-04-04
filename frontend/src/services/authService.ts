import axios from 'axios'
import type { Role, User } from '../types'
import { adminUser, students, teachers } from './muMockData'

const AUTH_KEY = 'mu-auth-session'
const TOKEN_TTL_MS = 1000 * 60 * 15
const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api/v1'

interface StoredAuth {
  user: User
  role: Role
  token: string
  expiresAt: number
}

const sanitizeUser = (user: User): User => {
  const safeUser = { ...user }
  delete safeUser.password
  return safeUser
}

const storeSession = (user: User, role: Role, token: string) => {
  const payload: StoredAuth = {
    user: sanitizeUser(user),
    role,
    token,
    expiresAt: Date.now() + TOKEN_TTL_MS,
  }

  localStorage.setItem(AUTH_KEY, JSON.stringify(payload))

  return {
    ...payload.user,
    token,
  }
}

export const updateSessionToken = (token: string) => {
  const raw = localStorage.getItem(AUTH_KEY)
  if (!raw) return null

  try {
    const parsed = JSON.parse(raw) as StoredAuth
    return storeSession(parsed.user, parsed.role, token)
  } catch {
    localStorage.removeItem(AUTH_KEY)
    return null
  }
}

export const login = async (identifier: string, password: string, role: Role): Promise<User | null> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      { identifier, password, role },
      { withCredentials: true },
    )

    const payload = response.data.data as {
      accessToken: string
      user: { id: string; role: Role; name: string; email: string; portalId: string }
    }

    return storeSession(
      {
        id: payload.user.portalId,
        email: payload.user.email,
        name: payload.user.name,
        role: payload.user.role.toLowerCase() as Role,
      },
      payload.user.role.toLowerCase() as Role,
      payload.accessToken,
    )
  } catch {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const source = role === 'student' ? students : role === 'teacher' ? teachers : [adminUser]
    const matchedUser = source.find(
      (item) => item.id.toLowerCase() === identifier.trim().toLowerCase() && item.password === password,
    )

    if (!matchedUser) {
      return null
    }

    return storeSession(matchedUser, role, `${role}-${Date.now()}`)
  }
}

export const refreshSession = async (): Promise<User | null> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {}, { withCredentials: true })
    const token = response.data.data.accessToken as string
    return updateSessionToken(token)
  } catch {
    logout()
    return null
  }
}

export const logout = async () => {
  try {
    await axios.post(`${API_BASE_URL}/auth/logout`, {}, { withCredentials: true })
  } catch {
    // fallback to local session cleanup only
  } finally {
    localStorage.removeItem(AUTH_KEY)
  }
}

export const isTokenValid = () => {
  const raw = localStorage.getItem(AUTH_KEY)
  if (!raw) return false

  try {
    const parsed = JSON.parse(raw) as StoredAuth
    if (parsed.expiresAt < Date.now()) {
      localStorage.removeItem(AUTH_KEY)
      return false
    }
    return true
  } catch {
    localStorage.removeItem(AUTH_KEY)
    return false
  }
}

export const getCurrentUser = (): User | null => {
  const raw = localStorage.getItem(AUTH_KEY)
  if (!raw) return null

  try {
    const parsed = JSON.parse(raw) as StoredAuth
    if (parsed.expiresAt < Date.now()) {
      localStorage.removeItem(AUTH_KEY)
      return null
    }

    return {
      ...parsed.user,
      token: parsed.token,
    }
  } catch {
    localStorage.removeItem(AUTH_KEY)
    return null
  }
}

export const authService = {
  login,
  refreshSession,
  updateSessionToken,
  logout,
  getCurrentUser,
  isTokenValid,
}
