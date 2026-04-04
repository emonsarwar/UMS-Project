import { Router } from 'express'
import { body } from 'express-validator'
import rateLimit from 'express-rate-limit'
import { forgotPassword, login, logout, refresh, resetPasswordAction } from './auth.controller'
import { validate } from '../../middleware/validate'

const router = Router()

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many login attempts. Please try again later.' },
})

router.post(
  '/login',
  loginLimiter,
  validate([
    body('identifier').notEmpty().withMessage('Identifier is required.'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters.'),
  ]),
  login,
)
router.post('/refresh', refresh)
router.post('/logout', logout)
router.post('/forgot-password', validate([body('email').isEmail()]), forgotPassword)
router.post('/reset-password', validate([body('email').isEmail(), body('password').isLength({ min: 8 })]), resetPasswordAction)

export default router
