import type { NextFunction, Request, Response } from 'express'

export const errorHandler = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  const status = error.message.includes('Prisma') ? 400 : 500
  res.status(status).json({
    success: false,
    message: error.message || 'Internal server error',
  })
}
