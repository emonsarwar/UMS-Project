import type { NextFunction, Request, Response } from 'express'
import { verifyAccessToken } from '../utils/jwt'

declare global {
  namespace Express {
    interface Request {
      auth?: {
        sub: string
        role: 'STUDENT' | 'TEACHER' | 'ADMIN'
        name: string
      }
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication required.' })
  }

  try {
    req.auth = verifyAccessToken(token)
    next()
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid or expired token.' })
  }
}
