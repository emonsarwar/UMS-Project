import { Router } from 'express'
import { prisma } from '../../config/database'
import { authenticate } from '../../middleware/authenticate'
import { authorize } from '../../middleware/authorize'
import { sendResponse } from '../../utils/response'

const router = Router()

router.get('/', async (_req, res) => {
  const departments = await prisma.department.findMany({
    include: {
      _count: { select: { students: true, teachers: true, courses: true } },
    },
    orderBy: { school: 'asc' },
  })
  return sendResponse(res, 200, 'Departments fetched successfully.', departments)
})

router.get('/:id', async (req, res) => {
  const department = await prisma.department.findUnique({
    where: { id: String(req.params.id) },
    include: { teachers: true, courses: true, students: true },
  })
  return department ? sendResponse(res, 200, 'Department fetched successfully.', department) : sendResponse(res, 404, 'Department not found.')
})

router.post('/', authenticate, authorize('ADMIN'), async (req, res) => {
  const department = await prisma.department.create({
    data: {
      name: req.body.name,
      shortName: req.body.shortName,
      school: req.body.school,
      headName: req.body.headName,
      description: req.body.description,
      icon: req.body.icon,
    },
  })
  return sendResponse(res, 201, 'Department created successfully.', department)
})

router.put('/:id', authenticate, authorize('ADMIN'), async (req, res) => {
  const department = await prisma.department.update({
    where: { id: String(req.params.id) },
    data: {
      name: req.body.name,
      shortName: req.body.shortName,
      school: req.body.school,
      headName: req.body.headName,
      description: req.body.description,
      icon: req.body.icon,
    },
  })
  return sendResponse(res, 200, 'Department updated successfully.', department)
})

export default router
