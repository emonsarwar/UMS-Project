import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class NotificationService {
  static async createNotification(userId: string, title: string, message: string, type: string) {
    return prisma.notification.create({
      data: {
        userId,
        title,
        message,
        type,
      },
    })
  }

  static async getUserNotifications(userId: string, limit = 20) {
    return prisma.notification.findMany({
      where: { userId },
      take: limit,
      orderBy: { createdAt: 'desc' },
    })
  }

  static async markAsRead(notificationId: string) {
    return prisma.notification.update({
      where: { id: notificationId },
      data: { readAt: new Date() },
    })
  }

  static async getUnreadCount(userId: string) {
    return prisma.notification.count({
      where: { 
        userId,
        readAt: null,
      },
    })
  }

  static async sendFeeDueNotification(studentId: string) {
    // Triggered when fee due
    return this.createNotification(studentId, 'Fee Due', 'Your tuition fee is due. Please pay immediately.', 'fee_due')
  }

  static async sendAssignmentNotification(studentId: string, assignmentTitle: string) {
    return this.createNotification(studentId, 'New Assignment', `${assignmentTitle} has been assigned. Due soon.`, 'assignment')
  }
}

