import type { NextFunction, Request, Response } from 'express'
import type { AppRole } from '../utils/jwt'

export const authorize = (...roles: AppRole[]) => (req: Request, res: Response, next: NextFunction) => {
  if (!req.auth || !roles.includes(req.auth.role)) {
    return res.status(403).json({ success: false, message: 'Access denied.' })
  }
  next()
}
