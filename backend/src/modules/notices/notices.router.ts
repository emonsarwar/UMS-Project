import { Router } from 'express'
import sanitizeHtml from 'sanitize-html'
import { prisma } from '../../config/database'
import { authenticate } from '../../middleware/authenticate'
import { authorize } from '../../middleware/authorize'
import { sendResponse } from '../../utils/response'

const router = Router()

router.get('/', async (_req, res) => {
  const notices = await prisma.notice.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: 'desc' },
  })
  return sendResponse(res, 200, 'Published notices fetched.', notices)
})

router.post('/', authenticate, authorize('ADMIN'), async (req, res) => {
  const notice = await prisma.notice.create({
    data: {
      title: req.body.title,
      content: sanitizeHtml(req.body.content ?? ''),
      category: req.body.category,
      targetRole: req.body.targetRole ?? 'all',
      targetDept: req.body.targetDept,
      isPublished: Boolean(req.body.isPublished),
      publishedAt: req.body.isPublished ? new Date() : null,
      expiresAt: req.body.expiresAt ? new Date(req.body.expiresAt) : null,
      createdBy: req.auth?.sub ?? 'system',
    },
  })

  return sendResponse(res, 201, 'Notice created successfully.', notice)
})

router.put('/:id', authenticate, authorize('ADMIN'), async (req, res) => {
  const notice = await prisma.notice.update({
    where: { id: String(req.params.id) },
    data: {
      title: req.body.title,
      content: sanitizeHtml(req.body.content ?? ''),
      category: req.body.category,
      targetRole: req.body.targetRole,
      targetDept: req.body.targetDept,
      expiresAt: req.body.expiresAt ? new Date(req.body.expiresAt) : null,
    },
  })
  return sendResponse(res, 200, 'Notice updated successfully.', notice)
})

router.patch('/:id/publish', authenticate, authorize('ADMIN'), async (req, res) => {
  const notice = await prisma.notice.findUnique({ where: { id: String(req.params.id) } })
  if (!notice) {
    return sendResponse(res, 404, 'Notice not found.')
  }
  const updated = await prisma.notice.update({
    where: { id: String(req.params.id) },
    data: {
      isPublished: !notice.isPublished,
      publishedAt: !notice.isPublished ? new Date() : null,
    },
  })
  return sendResponse(res, 200, 'Notice publish state updated.', updated)
})

router.delete('/:id', authenticate, authorize('ADMIN'), async (req, res) => {
  await prisma.notice.delete({ where: { id: String(req.params.id) } })
  return sendResponse(res, 200, 'Notice deleted successfully.')
})

export default router
