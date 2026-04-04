import { Router } from 'express'
import { prisma } from '../../config/database'
import { authenticate } from '../../middleware/authenticate'
import { authorize } from '../../middleware/authorize'
import { sendResponse } from '../../utils/response'

const router = Router()

router.get('/student/:studentId', authenticate, async (req, res) => {
  const items = await prisma.feeRecord.findMany({
    where: { studentId: String(req.params.studentId) },
    orderBy: { dueDate: 'asc' },
  })

  const summary = items.reduce(
    (acc: { total: number; paid: number; due: number }, item: (typeof items)[number]) => {
      acc.total += item.amount
      acc.paid += item.paidAmount
      acc.due += item.amount - item.paidAmount
      return acc
    },
    { total: 0, paid: 0, due: 0 },
  )

  return sendResponse(res, 200, 'Fee summary fetched successfully.', { summary, items })
})

router.get('/', authenticate, authorize('ADMIN'), async (_req, res) => {
  const items = await prisma.feeRecord.findMany({ include: { student: true }, orderBy: { dueDate: 'desc' } })
  return sendResponse(res, 200, 'All fee records fetched.', items)
})

router.post('/', authenticate, authorize('ADMIN'), async (req, res) => {
  const fee = await prisma.feeRecord.create({
    data: {
      studentId: req.body.studentId,
      session: req.body.session ?? 'Spring 2026',
      feeType: req.body.feeType,
      amount: Number(req.body.amount),
      dueDate: new Date(req.body.dueDate),
      paidAmount: Number(req.body.paidAmount ?? 0),
      status: req.body.status ?? 'pending',
      receiptNo: req.body.receiptNo,
    },
  })

  return sendResponse(res, 201, 'Fee record created.', fee)
})

router.patch('/:id/pay', authenticate, async (req, res) => {
  const paidAmount = Number(req.body.paidAmount ?? 0)
  const fee = await prisma.feeRecord.findUnique({ where: { id: String(req.params.id) } })

  if (!fee) {
    return sendResponse(res, 404, 'Fee record not found.')
  }

  const updated = await prisma.feeRecord.update({
    where: { id: String(req.params.id) },
    data: {
      paidAmount: fee.paidAmount + paidAmount,
      paidAt: new Date(),
      status: fee.paidAmount + paidAmount >= fee.amount ? 'paid' : 'partial',
      receiptNo: req.body.receiptNo ?? fee.receiptNo ?? `MU-PAY-${Date.now()}`,
    },
  })

  return sendResponse(res, 200, 'Payment processed successfully.', updated)
})

router.post('/:id/waiver', authenticate, authorize('ADMIN'), async (req, res) => {
  const waiver = Number(req.body.amount ?? 0)
  const fee = await prisma.feeRecord.update({
    where: { id: String(req.params.id) },
    data: {
      paidAmount: { increment: waiver },
      status: 'waived',
    },
  })
  return sendResponse(res, 200, 'Waiver applied successfully.', fee)
})

export default router
