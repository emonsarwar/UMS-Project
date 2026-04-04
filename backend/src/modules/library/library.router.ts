import { Router } from 'express'
import { prisma } from '../../config/database'
import { authenticate } from '../../middleware/authenticate'
import { authorize } from '../../middleware/authorize'
import { sendResponse } from '../../utils/response'

const router = Router()

// GET /api/v1/library/categories
router.get('/categories', async (_req, res) => {
  const categories = await prisma.bookCategory.findMany({
    include: { books: { include: { category: true } } }
  })
  return sendResponse(res, 200, 'Book categories fetched.', categories)
})

// POST /api/v1/library/categories
router.post('/categories', authenticate, authorize('ADMIN'), async (req, res) => {
  const category = await prisma.bookCategory.create({
    data: {
      name: req.body.name,
      description: req.body.description
    }
  })
  return sendResponse(res, 201, 'Book category created.', category)
})

// GET /api/v1/library/books
router.get('/books', async (req, res) => {
  const { category, author, isbn, title, available } = req.query
  const where: any = {
    availableQuantity: { gt: 0 }
  }
  if (title) where.title = { contains: title as string }
  if (isbn) where.isbn = isbn as string
  if (category) where.categoryId = category as string
  const books = await prisma.book.findMany({
    where,
    include: { category: true, authorBooks: { include: { author: true } } },
    orderBy: { title: 'asc' }
  })
  return sendResponse(res, 200, 'Books fetched.', books)
})

// POST /api/v1/library/books
router.post('/books', authenticate, authorize('ADMIN'), async (req, res) => {
  const book = await prisma.book.create({
    data: {
      title: req.body.title,
      isbn: req.body.isbn,
      edition: req.body.edition,
      totalQuantity: Number(req.body.totalQuantity),
      availableQuantity: Number(req.body.availableQuantity),
      publicationYear: req.body.publicationYear ? Number(req.body.publicationYear) : undefined,
      description: req.body.description,
      coverImage: req.body.coverImage,
      categoryId: req.body.categoryId,
      authorBooks: {
        create: req.body.authors?.map((authorName: string) => ({
          author: {
            connectOrCreate: {
              where: { name: authorName },
              create: { name: authorName }
            }
          }
        })) || []
      }
    },
    include: { category: true, authorBooks: { include: { author: true } } }
  })
  return sendResponse(res, 201, 'Book created.', book)
})

// PUT /api/v1/library/books/:id
router.put('/books/:id', authenticate, authorize('ADMIN'), async (req, res) => {
  const book = await prisma.book.update({
    where: { id: req.params.id },
    data: req.body,
    include: { category: true, authorBooks: { include: { author: true } } }
  })
  return sendResponse(res, 200, 'Book updated.', book)
})

// DELETE /api/v1/library/books/:id
router.delete('/books/:id', authenticate, authorize('ADMIN'), async (req, res) => {
  await prisma.book.delete({ where: { id: req.params.id } })
  return sendResponse(res, 200, 'Book deleted.')
})

// POST /api/v1/library/issue
router.post('/issue', authenticate, async (req, res) => {
  const { bookId, dueDays = 14 } = req.body
  const book = await prisma.book.findUnique({ where: { id: bookId } })
  if (!book || book.availableQuantity <= 0) {
    return sendResponse(res, 400, 'Book not available.')
  }
  const memberId = req.user.student?.id || req.user.teacher?.id
  const memberType = req.user.role === 'STUDENT' ? 'STUDENT' : 'TEACHER'
  const dueDate = new Date()
  dueDate.setDate(dueDate.getDate() + Number(dueDays))
  
  const issueRecord = await prisma.issueRecord.create({
    data: {
      bookId,
      memberId,
      memberType,
      dueDate
    }
  })
  await prisma.book.update({
    where: { id: bookId },
    data: { availableQuantity: { decrement: 1 } }
  })
  return sendResponse(res, 201, 'Book issued.', issueRecord)
})

// PUT /api/v1/library/return/:id
router.put('/return/:id', authenticate, async (req, res) => {
  const issueRecord = await prisma.issueRecord.update({
    where: { id: req.params.id },
    data: {
      returnDate: new Date(),
      status: 'RETURNED'
    },
    include: { book: true }
  })
  await prisma.book.update({
    where: { id: issueRecord.bookId },
    data: { availableQuantity: { increment: 1 } }
  })
  return sendResponse(res, 200, 'Book returned.', issueRecord)
})

// GET /api/v1/library/my-issues
router.get('/my-issues', authenticate, async (req, res) => {
  const memberId = req.user.student?.id || req.user.teacher?.id
  const memberType = req.user.role === 'STUDENT' ? 'STUDENT' : 'TEACHER'
  const issues = await prisma.issueRecord.findMany({
    where: { memberId, memberType },
    include: { book: { include: { category: true } } },
    orderBy: { issueDate: 'desc' }
  })
  return sendResponse(res, 200, 'Issue records fetched.', issues)
})

export default router

