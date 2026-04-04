import type { Request, Response } from 'express'
import {
  loginUser,
  logoutUserSession,
  refreshUserSession,
  requestPasswordReset,
  resetPassword,
} from './auth.service'
import { sendResponse } from '../../utils/response'

const refreshCookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
}

export const login = async (req: Request, res: Response) => {
  const { identifier, password } = req.body
  const result = await loginUser(identifier, password)

  res.cookie('mu_refresh_token', result.refreshToken, refreshCookieOptions)
  return sendResponse(res, 200, 'Login successful.', {
    accessToken: result.accessToken,
    refreshToken: result.refreshToken,
    user: result.user,
  })
}

export const refresh = async (req: Request, res: Response) => {
  const token = req.cookies.mu_refresh_token || req.body.refreshToken
  const result = await refreshUserSession(token)

  res.cookie('mu_refresh_token', result.refreshToken, refreshCookieOptions)
  return sendResponse(res, 200, 'Session refreshed.', result)
}

export const logout = async (req: Request, res: Response) => {
  const token = req.cookies.mu_refresh_token || req.body.refreshToken
  if (token) {
    await logoutUserSession(token)
  }
  res.clearCookie('mu_refresh_token')
  return sendResponse(res, 200, 'Logged out successfully.')
}

export const forgotPassword = async (req: Request, res: Response) => {
  const result = await requestPasswordReset(req.body.email)
  return sendResponse(res, 200, result.message)
}

export const resetPasswordAction = async (req: Request, res: Response) => {
  const result = await resetPassword(req.body.email, req.body.password)
  return sendResponse(res, 200, result.message)
}
