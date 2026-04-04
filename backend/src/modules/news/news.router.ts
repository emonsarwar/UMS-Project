import { Router } from 'express'
import { prisma } from '../../config/database'
import { authenticate } from '../../middleware/authenticate'
import { authorize } from '../../middleware/authorize'
import { sendResponse } from '../../utils/response'

const router = Router()

router.get('/', async (_req, res) => {
  const articles = await prisma.newsArticle.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: 'desc' },
  })
  return sendResponse(res, 200, 'News articles fetched.', articles)
})

router.get('/:slug', async (req, res) => {
  const article = await prisma.newsArticle.findUnique({ where: { slug: req.params.slug } })
  return article ? sendResponse(res, 200, 'News article fetched.', article) : sendResponse(res, 404, 'News article not found.')
})

router.post('/', authenticate, authorize('ADMIN'), async (req, res) => {
  const article = await prisma.newsArticle.create({
    data: {
      title: req.body.title,
      slug: req.body.slug,
      excerpt: req.body.excerpt,
      content: req.body.content,
      coverImage: req.body.coverImage,
      category: req.body.category,
      isPublished: Boolean(req.body.isPublished),
      publishedAt: req.body.isPublished ? new Date() : null,
    },
  })
  return sendResponse(res, 201, 'News article created.', article)
})

router.put('/:id', authenticate, authorize('ADMIN'), async (req, res) => {
  const article = await prisma.newsArticle.update({
    where: { id: String(req.params.id) },
    data: {
      title: req.body.title,
      excerpt: req.body.excerpt,
      content: req.body.content,
      coverImage: req.body.coverImage,
      category: req.body.category,
    },
  })
  return sendResponse(res, 200, 'News article updated.', article)
})

export default router
