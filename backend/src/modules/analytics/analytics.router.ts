import { Router } from 'express'
import { prisma } from '../../config/database'
import { authenticate } from '../../middleware/authenticate'
import { authorize } from '../../middleware/authorize'
import { sendResponse } from '../../utils/response'

const router = Router()

router.use(authenticate, authorize('ADMIN'))

router.get('/overview', async (_req, res) => {
  const [students, teachers, courses, admissions] = await Promise.all([
    prisma.student.count(),
    prisma.teacher.count(),
    prisma.course.count(),
    prisma.admissionApplication.count({ where: { status: 'pending' } }),
  ])

  return sendResponse(res, 200, 'Analytics overview fetched.', {
    students,
    teachers,
    courses,
    pendingAdmissions: admissions,
  })
})

router.get('/enrollment-trends', async (_req, res) => {
  const students = await prisma.user.findMany({
    where: { role: 'STUDENT' },
    select: { createdAt: true },
    orderBy: { createdAt: 'asc' },
  })

  return sendResponse(res, 200, 'Enrollment trend data fetched.', students)
})

router.get('/department-stats', async (_req, res) => {
  const stats = await prisma.department.findMany({
    include: { _count: { select: { students: true, teachers: true, courses: true } } },
  })
  return sendResponse(res, 200, 'Department stats fetched.', stats)
})

router.get('/fee-collection', async (_req, res) => {
  const fees = await prisma.feeRecord.findMany({ select: { amount: true, paidAmount: true, session: true } })
  return sendResponse(res, 200, 'Fee collection data fetched.', fees)
})

router.get('/attendance-overview', async (_req, res) => {
  const attendance = await prisma.attendance.findMany({ select: { status: true, date: true } })
  return sendResponse(res, 200, 'Attendance overview fetched.', attendance)
})

export default router
