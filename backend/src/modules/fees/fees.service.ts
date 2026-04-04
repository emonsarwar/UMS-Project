import { prisma } from '../../config/database'

export type FeeStatus = 'PAID' | 'PENDING' | 'DUE' | 'OVERDUE'

export interface CreateFeeRecordData {
  studentId: string
  semesterFee: number
  libraryFee: number
  hostFee?: number
  transportFee?: number
  description?: string
}

export const feeService = {
  async getByStudent(studentId: string) {
    const feeRecords = await prisma.feeRecord.findMany({
      where: { studentId },
      include: { student: true },
      orderBy: { createdAt: 'desc' },
    })

    return feeRecords
  },

  async getById(id: string) {
    const feeRecord = await prisma.feeRecord.findUnique({
      where: { id },
      include: { student: { include: { department: true } } },
    })

    if (!feeRecord) throw new Error('Fee record not found')

    return feeRecord
  },

  async create(data: CreateFeeRecordData) {
    const totalAmount = data.semesterFee + data.libraryFee + (data.hostFee || 0) + (data.transportFee || 0)

    const feeRecord = await prisma.feeRecord.create({
      data: {
        studentId: data.studentId,
        totalAmount,
        semesterFee: data.semesterFee,
        libraryFee: data.libraryFee,
        hostFee: data.hostFee || 0,
        transportFee: data.transportFee || 0,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: 'PENDING',
        description: data.description,
      },
      include: { student: true },
    })

    return feeRecord
  },

  async updateStatus(id: string, status: FeeStatus, paidAmount?: number) {
    const feeRecord = await prisma.feeRecord.findUnique({ where: { id } })
    if (!feeRecord) throw new Error('Fee record not found')

    const updated = await prisma.feeRecord.update({
      where: { id },
      data: {
        status,
        paidAmount: paidAmount || feeRecord.paidAmount,
        paidDate: status === 'PAID' ? new Date() : feeRecord.paidDate,
      },
      include: { student: true },
    })

    return updated
  },

  async recordPayment(id: string, amount: number) {
    const feeRecord = await prisma.feeRecord.findUnique({ where: { id } })
    if (!feeRecord) throw new Error('Fee record not found')

    const totalPaid = (feeRecord.paidAmount || 0) + amount
    const status: FeeStatus = totalPaid >= feeRecord.totalAmount ? 'PAID' : 'PENDING'

    return this.updateStatus(id, status, totalPaid)
  },

  async getAll() {
    const feeRecords = await prisma.feeRecord.findMany({
      include: { student: { include: { department: true } } },
      orderBy: { createdAt: 'desc' },
    })

    return feeRecords
  },

  async getByDepartment(departmentId: string) {
    const feeRecords = await prisma.feeRecord.findMany({
      where: { student: { departmentId } },
      include: { student: { include: { department: true } } },
      orderBy: { createdAt: 'desc' },
    })

    return feeRecords
  },

  async getStatistics() {
    const [total, paid, pending, overdue] = await Promise.all([
      prisma.feeRecord.aggregate({
        _sum: { totalAmount: true },
      }),
      prisma.feeRecord.aggregate({
        where: { status: 'PAID' },
        _sum: { paidAmount: true },
      }),
      prisma.feeRecord.count({ where: { status: 'PENDING' } }),
      prisma.feeRecord.count({
        where: {
          status: { in: ['DUE', 'OVERDUE'] },
        },
      }),
    ])

    return {
      totalAmount: total._sum.totalAmount || 0,
      collectedAmount: paid._sum.paidAmount || 0,
      pendingCount: pending,
      overdueCount: overdue,
      collectionPercentage: total._sum.totalAmount ? ((paid._sum.paidAmount || 0) / total._sum.totalAmount) * 100 : 0,
    }
  },

  async delete(id: string) {
    await prisma.feeRecord.delete({ where: { id } })
    return { message: 'Fee record deleted successfully' }
  },
}
