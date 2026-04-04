import { Router, type Request, type Response } from 'express'
import { body } from 'express-validator'
import { prisma } from '../../config/database'
import { authenticate } from '../../middleware/authenticate'
import { validate } from '../../middleware/validate'
import { sendResponse } from '../../utils/response'

const router = Router()

router.get('/student/:studentId', authenticate, async (req, res) => {
  const items = await prisma.enrollment.findMany({
    where: { studentId: String(req.params.studentId) },
    include: { course: { include: { department: true } } },
  })
  return sendResponse(res, 200, 'Student enrollments fetched.', items)
})

router.post('/register', authenticate, validate([body('studentId').notEmpty(), body('courseId').notEmpty()]), async (req: Request, res: Response) => {
  const enrollment = await prisma.enrollment.create({
    data: {
      studentId: req.body.studentId,
      courseId: req.body.courseId,
      session: req.body.session ?? 'Spring 2026',
    },
  })
  return sendResponse(res, 201, 'Course registered successfully.', enrollment)
})

router.delete('/drop/:enrollmentId', authenticate, async (req, res) => {
  await prisma.enrollment.delete({ where: { id: String(req.params.enrollmentId) } })
  return sendResponse(res, 200, 'Enrollment dropped successfully.')
})

export default router
