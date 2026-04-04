import { Router, type Request, type Response } from 'express'
import { body } from 'express-validator'
import { prisma } from '../../config/database'
import { authenticate } from '../../middleware/authenticate'
import { authorize } from '../../middleware/authorize'
import { validate } from '../../middleware/validate'
import { sendResponse } from '../../utils/response'

const router = Router()

router.get('/', async (req, res) => {
  const dept = String(req.query.dept ?? '')
  const courses = await prisma.course.findMany({
    where: dept ? { department: { shortName: dept } } : undefined,
    include: { department: true, assignments: { include: { teacher: true } } },
    orderBy: { code: 'asc' },
  })
  return sendResponse(res, 200, 'Courses fetched successfully.', courses)
})

router.get('/:id', async (req, res) => {
  const course = await prisma.course.findUnique({
    where: { id: String(req.params.id) },
    include: { department: true, assignments: { include: { teacher: true } }, enrollments: true },
  })
  return course ? sendResponse(res, 200, 'Course fetched successfully.', course) : sendResponse(res, 404, 'Course not found.')
})

router.post(
  '/',
  authenticate,
  authorize('ADMIN'),
  validate([body('code').notEmpty(), body('title').notEmpty(), body('departmentId').notEmpty()]),
  async (req: Request, res: Response) => {
    const course = await prisma.course.create({
      data: {
        code: req.body.code,
        title: req.body.title,
        credits: Number(req.body.credits ?? 3),
        departmentId: req.body.departmentId,
        semester: Number(req.body.semester ?? 1),
        description: req.body.description,
      },
    })
    return sendResponse(res, 201, 'Course created successfully.', course)
  },
)

router.put('/:id', authenticate, authorize('ADMIN'), async (req, res) => {
  const course = await prisma.course.update({
    where: { id: String(req.params.id) },
    data: {
      title: req.body.title,
      credits: req.body.credits ? Number(req.body.credits) : undefined,
      semester: req.body.semester ? Number(req.body.semester) : undefined,
      description: req.body.description,
    },
  })
  return sendResponse(res, 200, 'Course updated successfully.', course)
})

router.post('/:id/assign', authenticate, authorize('ADMIN'), async (req, res) => {
  const assignment = await prisma.courseAssignment.create({
    data: {
      courseId: String(req.params.id),
      teacherId: req.body.teacherId,
      session: req.body.session ?? 'Spring 2026',
      section: req.body.section ?? 'A',
    },
  })
  return sendResponse(res, 201, 'Teacher assigned successfully.', assignment)
})

router.get('/:id/students', authenticate, authorize('TEACHER', 'ADMIN'), async (req, res) => {
  const students = await prisma.enrollment.findMany({
    where: { courseId: String(req.params.id) },
    include: { student: { include: { department: true } } },
  })
  return sendResponse(res, 200, 'Enrolled students fetched.', students)
})

export default router
