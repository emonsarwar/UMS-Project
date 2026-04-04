import { Router } from 'express'
import { body } from 'express-validator'
import { prisma } from '../../config/database'
import { authenticate } from '../../middleware/authenticate'
import { authorize } from '../../middleware/authorize'
import { validate } from '../../middleware/validate'
import { hashPassword } from '../../utils/bcrypt'
import { calculateCgpa } from '../../utils/cgpaCalc'
import { sendResponse } from '../../utils/response'

const router = Router()

router.get('/', authenticate, authorize('ADMIN'), async (req, res) => {
  const page = Number(req.query.page ?? 1)
  const limit = Number(req.query.limit ?? 10)
  const search = String(req.query.search ?? '')
  const department = String(req.query.department ?? '')

  const where = {
    ...(search
      ? {
          OR: [
            { fullName: { contains: search, mode: 'insensitive' as const } },
            { studentId: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {}),
    ...(department ? { department: { shortName: department } } : {}),
  }

  const [items, total] = await Promise.all([
    prisma.student.findMany({
      where,
      include: { department: true, user: true },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { fullName: 'asc' },
    }),
    prisma.student.count({ where }),
  ])

  return sendResponse(res, 200, 'Students fetched successfully.', { items, total, page, limit })
})

router.get('/:id/dashboard', authenticate, async (req, res) => {
  const student = await prisma.student.findUnique({
    where: { id: String(req.params.id) },
    include: {
      department: true,
      results: { include: { course: true } },
      attendances: true,
      feeRecords: true,
      enrollments: { include: { course: true } },
    },
  })

  if (!student) {
    return sendResponse(res, 404, 'Student not found.')
  }

  const attendanceScore = student.attendances.length
    ? Math.round((student.attendances.filter((item: (typeof student.attendances)[number]) => item.status === 'present').length / student.attendances.length) * 100)
    : 0

  return sendResponse(res, 200, 'Student dashboard summary fetched.', {
    student,
    cgpa: calculateCgpa(student.results),
    attendancePercentage: attendanceScore,
    totalDue: student.feeRecords.reduce((sum: number, item: (typeof student.feeRecords)[number]) => sum + (item.amount - item.paidAmount), 0),
    enrolledCourses: student.enrollments.length,
  })
})

router.get('/:id', authenticate, async (req, res) => {
  const student = await prisma.student.findUnique({
    where: { id: String(req.params.id) },
    include: { department: true, user: true, transportRoute: true },
  })

  if (!student) {
    return sendResponse(res, 404, 'Student not found.')
  }

  return sendResponse(res, 200, 'Student fetched successfully.', student)
})

router.post(
  '/',
  authenticate,
  authorize('ADMIN'),
  validate([
    body('email').isEmail(),
    body('fullName').notEmpty(),
    body('studentId').notEmpty(),
    body('departmentId').notEmpty(),
  ]),
  async (req: import('express').Request, res: import('express').Response) => {
    const passwordHash = await hashPassword(req.body.password ?? 'student@123')
    const created = await prisma.user.create({
      data: {
        email: req.body.email,
        passwordHash,
        role: 'STUDENT',
        student: {
          create: {
            studentId: req.body.studentId,
            fullName: req.body.fullName,
            phone: req.body.phone,
            address: req.body.address,
            guardianName: req.body.guardianName,
            guardianPhone: req.body.guardianPhone,
            departmentId: req.body.departmentId,
            semester: Number(req.body.semester ?? 1),
            session: req.body.session ?? 'Spring 2026',
          },
        },
      },
      include: { student: true },
    })

    return sendResponse(res, 201, 'Student created successfully.', created)
  },
)

router.put('/:id', authenticate, async (req, res) => {
  const updated = await prisma.student.update({
    where: { id: String(req.params.id) },
    data: {
      fullName: req.body.fullName,
      phone: req.body.phone,
      address: req.body.address,
      guardianName: req.body.guardianName,
      guardianPhone: req.body.guardianPhone,
      semester: req.body.semester ? Number(req.body.semester) : undefined,
    },
    include: { department: true },
  })

  if (req.body.email) {
    await prisma.user.update({
      where: { id: updated.userId },
      data: { email: req.body.email },
    })
  }

  return sendResponse(res, 200, 'Student updated successfully.', updated)
})

router.delete('/:id', authenticate, authorize('ADMIN'), async (req, res) => {
  const student = await prisma.student.findUnique({ where: { id: String(req.params.id) } })
  if (!student) {
    return sendResponse(res, 404, 'Student not found.')
  }

  await prisma.user.update({ where: { id: student.userId }, data: { isActive: false } })
  return sendResponse(res, 200, 'Student deactivated successfully.')
})

export default router
