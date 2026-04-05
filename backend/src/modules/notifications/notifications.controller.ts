import { Request, Response } from 'express'
import { NotificationService } from './notifications.service'
import { sendResponse } from '../../utils/response'

export const createNotification = async (req: Request, res: Response) => {
  try {
    const { userId, title, message, type } = req.body
    const notification = await NotificationService.createNotification(userId, title, message, type)
    sendResponse(res, 201, 'Notification created', notification)
  } catch (error) {
    sendResponse(res, 500, (error as Error).message)
  }
}

export const getMyNotifications = async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.sub as string
    const notifications = await NotificationService.getUserNotifications(userId)
    sendResponse(res, 200, 'Notifications fetched', notifications)
  } catch (error) {
    sendResponse(res, 500, (error as Error).message)
  }
}

export const markNotificationRead = async (req: Request, res: Response) => {
  try {
const notificationId = String(req.params.id)

    const notification = await NotificationService.markAsRead(notificationId)
    sendResponse(res, 200, 'Notification marked read', notification)
  } catch (error) {
    sendResponse(res, 400, (error as Error).message)
  }
}

export const getUnreadCount = async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.sub as string
    const count = await NotificationService.getUnreadCount(userId)
    sendResponse(res, 200, 'Unread count', { count })
  } catch (error) {
    sendResponse(res, 500, (error as Error).message)
  }
}

