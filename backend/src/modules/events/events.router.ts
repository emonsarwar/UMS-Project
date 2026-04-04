import { Router } from 'express'
import { prisma } from '../../config/database'
import { authenticate } from '../../middleware/authenticate'
import { authorize } from '../../middleware/authorize'
import { sendResponse } from '../../utils/response'

const router = Router()

router.get('/', async (_req, res) => {
  const events = await prisma.event.findMany({ orderBy: { startDate: 'asc' } })
  return sendResponse(res, 200, 'Events fetched successfully.', events)
})

router.post('/', authenticate, authorize('ADMIN'), async (req, res) => {
  const event = await prisma.event.create({
    data: {
      title: req.body.title,
      description: req.body.description,
      venue: req.body.venue,
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate),
      coverImage: req.body.coverImage,
      category: req.body.category,
      isPublished: Boolean(req.body.isPublished ?? true),
    },
  })
  return sendResponse(res, 201, 'Event created successfully.', event)
})

router.put('/:id', authenticate, authorize('ADMIN'), async (req, res) => {
  const event = await prisma.event.update({
    where: { id: String(req.params.id) },
    data: {
      title: req.body.title,
      description: req.body.description,
      venue: req.body.venue,
      startDate: req.body.startDate ? new Date(req.body.startDate) : undefined,
      endDate: req.body.endDate ? new Date(req.body.endDate) : undefined,
      category: req.body.category,
      coverImage: req.body.coverImage,
    },
  })
  return sendResponse(res, 200, 'Event updated successfully.', event)
})

export default router
