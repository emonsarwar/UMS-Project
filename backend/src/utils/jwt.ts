import crypto from 'crypto'
import jwt from 'jsonwebtoken'

export type AppRole = 'STUDENT' | 'TEACHER' | 'ADMIN'

interface JwtPayload {
  sub: string
  role: AppRole
  name: string
}

const accessSecret = process.env.JWT_ACCESS_SECRET ?? 'mu-access-secret'
const refreshSecret = process.env.JWT_REFRESH_SECRET ?? 'mu-refresh-secret'

export const signAccessToken = (payload: JwtPayload) =>
  jwt.sign(payload, accessSecret, { expiresIn: '15m' })

export const signRefreshToken = (payload: JwtPayload) =>
  jwt.sign(payload, refreshSecret, { expiresIn: '7d' })

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, accessSecret) as JwtPayload

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, refreshSecret) as JwtPayload

export const hashToken = (token: string) => crypto.createHash('sha256').update(token).digest('hex')
