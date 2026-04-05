import { Router } from 'express'
import { authenticate } from '../../middleware/authenticate'
import { authorize } from '../../middleware/authorize'
import { createNotification, getMyNotifications, markNotificationRead, getUnreadCount } from './notifications.controller'
import { Role } from '@prisma/client'

const router = Router()

router.use(authenticate)

router.post('/', authorize(Role.ADMIN), createNotification)
router.get('/my', getMyNotifications)
router.patch('/:id/read', markNotificationRead)
router.get('/unread', getUnreadCount)

export default router

