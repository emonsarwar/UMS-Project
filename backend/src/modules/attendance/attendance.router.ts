import { Router } from 'express'
import { prisma } from '../../config/database'
import { authenticate } from '../../middleware/authenticate'
import { authorize } from '../../middleware/authorize'
import { sendResponse } from '../../utils/response'

const router = Router()

router.get('/student/:studentId', authenticate, async (req, res) => {
  const records = await prisma.attendance.findMany({
    where: { studentId: String(req.params.studentId) },
    include: { course: true },
    orderBy: { date: 'desc' },
  })
  return sendResponse(res, 200, 'Attendance records fetched.', records)
})

router.get('/course/:courseId', authenticate, authorize('TEACHER', 'ADMIN'), async (req, res) => {
  const records = await prisma.attendance.findMany({
    where: { courseId: String(req.params.courseId) },
    include: { student: true },
    orderBy: { date: 'desc' },
  })
  return sendResponse(res, 200, 'Course attendance fetched.', records)
})

router.post('/mark', authenticate, authorize('TEACHER', 'ADMIN'), async (req, res) => {
  const { courseId, date, records } = req.body as {
    courseId: string
    date: string
    records: Array<{ studentId: string; status: string }>
  }

  await prisma.attendance.createMany({
    data: records.map((record) => ({
      courseId,
      studentId: record.studentId,
      date: new Date(date),
      status: record.status,
      markedBy: req.auth?.sub ?? 'system',
    })),
  })

  return sendResponse(res, 201, 'Attendance marked successfully.')
})

router.get('/summary/:studentId', authenticate, async (req, res) => {
  const records = await prisma.attendance.findMany({
    where: { studentId: String(req.params.studentId) },
    include: { course: true },
  })

  const summaryMap = new Map<string, { courseId: string; course: string; percentage: number }>()

  for (const record of records) {
    const key = record.courseId
    const courseTitle = (record as typeof record & { course?: { title: string } }).course?.title ?? 'Course'
    const existing = summaryMap.get(key) ?? { courseId: key, course: courseTitle, percentage: 0 }
    summaryMap.set(key, existing)
  }

  const summary = Array.from(summaryMap.values()).map((item) => {
    const related = records.filter((record: (typeof records)[number]) => record.courseId === item.courseId)
    const presentScore = related.reduce(
      (sum: number, current: (typeof related)[number]) => sum + (current.status === 'present' ? 1 : current.status === 'late' ? 0.5 : 0),
      0,
    )
    return { ...item, percentage: Math.round((presentScore / Math.max(related.length, 1)) * 100) }
  })

  return sendResponse(res, 200, 'Attendance summary fetched.', summary)
})

export default router
