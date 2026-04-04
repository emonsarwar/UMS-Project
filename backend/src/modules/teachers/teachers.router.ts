import { Router } from 'express'
import { body } from 'express-validator'
import { prisma } from '../../config/database'
import { authenticate } from '../../middleware/authenticate'
import { authorize } from '../../middleware/authorize'
import { validate } from '../../middleware/validate'
import { hashPassword } from '../../utils/bcrypt'
import { sendResponse } from '../../utils/response'

const router = Router()

router.get('/', authenticate, authorize('ADMIN'), async (_req, res) => {
  const teachers = await prisma.teacher.findMany({
    include: { department: true, user: true, courses: { include: { course: true } } },
    orderBy: { fullName: 'asc' },
  })
  return sendResponse(res, 200, 'Teachers fetched successfully.', teachers)
})

router.get('/:id/dashboard', authenticate, async (req, res) => {
  const teacher = await prisma.teacher.findUnique({
    where: { id: String(req.params.id) },
    include: { courses: { include: { course: { include: { enrollments: true } } } } },
  })

  if (!teacher) {
    return sendResponse(res, 404, 'Teacher not found.')
  }

  const totalStudents = teacher.courses.reduce((sum: number, item: (typeof teacher.courses)[number]) => sum + item.course.enrollments.length, 0)

  return sendResponse(res, 200, 'Teacher dashboard fetched.', {
    teacher,
    totalCourses: teacher.courses.length,
    totalStudents,
    pendingResults: Math.max(teacher.courses.length * 2, 0),
  })
})

router.get('/:id', authenticate, async (req, res) => {
  const teacher = await prisma.teacher.findUnique({
    where: { id: String(req.params.id) },
    include: { department: true, user: true, courses: { include: { course: true } } },
  })
  return teacher ? sendResponse(res, 200, 'Teacher fetched successfully.', teacher) : sendResponse(res, 404, 'Teacher not found.')
})

router.post(
  '/',
  authenticate,
  authorize('ADMIN'),
  validate([body('email').isEmail(), body('fullName').notEmpty(), body('teacherId').notEmpty(), body('departmentId').notEmpty()]),
  async (req: import('express').Request, res: import('express').Response) => {
    const passwordHash = await hashPassword(req.body.password ?? 'teacher@123')
    const teacher = await prisma.user.create({
      data: {
        email: req.body.email,
        passwordHash,
        role: 'TEACHER',
        teacher: {
          create: {
            teacherId: req.body.teacherId,
            fullName: req.body.fullName,
            phone: req.body.phone,
            designation: req.body.designation,
            departmentId: req.body.departmentId,
            researchArea: req.body.researchArea,
          },
        },
      },
      include: { teacher: true },
    })

    return sendResponse(res, 201, 'Teacher created successfully.', teacher)
  },
)

router.put('/:id', authenticate, async (req, res) => {
  const teacher = await prisma.teacher.update({
    where: { id: String(req.params.id) },
    data: {
      fullName: req.body.fullName,
      phone: req.body.phone,
      designation: req.body.designation,
      researchArea: req.body.researchArea,
    },
    include: { department: true },
  })
  return sendResponse(res, 200, 'Teacher updated successfully.', teacher)
})

export default router
