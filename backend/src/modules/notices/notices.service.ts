import { prisma } from '../../config/database'

export interface NoticeData {
  title: string
  content: string
  departmentId?: string
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
}

export const noticeService = {
  async getAll(departmentId?: string) {
    const notices = await prisma.notice.findMany({
      where: departmentId ? { departmentId } : undefined,
      include: { department: true },
      orderBy: { createdAt: 'desc' },
    })

    return notices
  },

  async getById(id: string) {
    const notice = await prisma.notice.findUnique({
      where: { id },
      include: { department: true },
    })

    if (!notice) throw new Error('Notice not found')

    return notice
  },

  async create(data: NoticeData) {
    const notice = await prisma.notice.create({
      data,
      include: { department: true },
    })

    return notice
  },

  async update(id: string, data: Partial<NoticeData>) {
    const notice = await prisma.notice.update({
      where: { id },
      data,
      include: { department: true },
    })

    return notice
  },

  async delete(id: string) {
    await prisma.notice.delete({ where: { id } })
    return { message: 'Notice deleted successfully' }
  },

  async getRecent(limit = 10) {
    const notices = await prisma.notice.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { department: true },
    })

    return notices
  },
}
