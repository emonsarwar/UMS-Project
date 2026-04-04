import { Router } from 'express'
import { prisma } from '../../config/database'
import { authenticate } from '../../middleware/authenticate'
import { authorize } from '../../middleware/authorize'
import { calculateCgpa } from '../../utils/cgpaCalc'
import { gradeFromMarks } from '../../utils/gradeCalc'
import { sendResponse } from '../../utils/response'

const router = Router()

router.get('/student/:studentId', authenticate, async (req, res) => {
  const results = await prisma.result.findMany({
    where: { studentId: String(req.params.studentId) },
    include: { course: true },
    orderBy: [{ session: 'desc' }, { publishedAt: 'desc' }],
  })
  return sendResponse(res, 200, 'Student results fetched.', results)
})

router.post('/upload', authenticate, authorize('TEACHER', 'ADMIN'), async (req, res) => {
  const { studentId, courseId, session, examType, marksObtained, totalMarks, isPublished } = req.body
  const marks = Number(marksObtained)
  const total = Number(totalMarks ?? 100)
  const percentage = total ? (marks / total) * 100 : 0
  const grade = gradeFromMarks(percentage)

  const result = await prisma.result.create({
    data: {
      studentId,
      courseId,
      session,
      examType,
      marksObtained: marks,
      totalMarks: total,
      grade: grade.grade,
      gradePoint: grade.point,
      isPublished: Boolean(isPublished),
      publishedAt: isPublished ? new Date() : null,
    },
  })

  return sendResponse(res, 201, 'Result uploaded successfully.', result)
})

router.put('/:id', authenticate, authorize('TEACHER', 'ADMIN'), async (req, res) => {
  const marks = req.body.marksObtained ? Number(req.body.marksObtained) : undefined
  const total = req.body.totalMarks ? Number(req.body.totalMarks) : undefined
  const grade = typeof marks === 'number' && typeof total === 'number' ? gradeFromMarks((marks / total) * 100) : null

  const result = await prisma.result.update({
    where: { id: String(req.params.id) },
    data: {
      marksObtained: marks,
      totalMarks: total,
      grade: grade?.grade,
      gradePoint: grade?.point,
    },
  })

  return sendResponse(res, 200, 'Result updated successfully.', result)
})

router.patch('/:id/publish', authenticate, authorize('TEACHER', 'ADMIN'), async (req, res) => {
  const result = await prisma.result.update({
    where: { id: String(req.params.id) },
    data: { isPublished: true, publishedAt: new Date() },
  })
  return sendResponse(res, 200, 'Result published successfully.', result)
})

router.get('/transcript/:studentId', authenticate, async (req, res) => {
  const student = await prisma.student.findUnique({
    where: { id: String(req.params.studentId) },
    include: { department: true, results: { include: { course: true } } },
  })

  if (!student) {
    return sendResponse(res, 404, 'Student not found.')
  }

  return sendResponse(res, 200, 'Transcript generated successfully.', {
    student,
    cgpa: calculateCgpa(student.results),
  })
})

export default router
