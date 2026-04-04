import { Router } from 'express'
import { prisma } from '../../config/database'
import { authenticate } from '../../middleware/authenticate'
import { authorize } from '../../middleware/authorize'
import { upload } from '../../middleware/upload'
import { sendResponse } from '../../utils/response'

const router = Router()

router.get('/', async (req, res) => {
  const category = String(req.query.category ?? '')
  const images = await prisma.galleryImage.findMany({
    where: category ? { category } : undefined,
    orderBy: { uploadedAt: 'desc' },
  })
  return sendResponse(res, 200, 'Gallery images fetched.', images)
})

router.post('/upload', authenticate, authorize('ADMIN'), upload.single('file'), async (req, res) => {
  const image = await prisma.galleryImage.create({
    data: {
      url: req.body.url ?? 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
      caption: req.body.caption,
      category: req.body.category ?? 'Campus',
      takenAt: req.body.takenAt ? new Date(req.body.takenAt) : null,
    },
  })

  return sendResponse(res, 201, 'Image uploaded successfully.', { image, uploadedFile: req.file?.originalname ?? null })
})

router.delete('/:id', authenticate, authorize('ADMIN'), async (req, res) => {
  await prisma.galleryImage.delete({ where: { id: String(req.params.id) } })
  return sendResponse(res, 200, 'Gallery image deleted successfully.')
})

export default router
