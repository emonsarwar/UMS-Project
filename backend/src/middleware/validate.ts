import type { NextFunction, Request, Response } from 'express'
import { validationResult, type ValidationChain } from 'express-validator'

export const validate = (validations: ValidationChain[]) => [
  ...validations,
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, message: 'Validation failed.', errors: errors.array() })
    }
    next()
  },
]
