import { Router } from 'express'
import { prisma } from '../../config/database'
import { emailTransporter } from '../../config/email'
import { authenticate } from '../../middleware/authenticate'
import { authorize } from '../../middleware/authorize'
import { sendResponse } from '../../utils/response'

const router = Router()

router.get('/applications', authenticate, authorize('ADMIN'), async (_req, res) => {
  const applications = await prisma.admissionApplication.findMany({ orderBy: { submittedAt: 'desc' } })
  return sendResponse(res, 200, 'Admission applications fetched.', applications)
})

router.post('/apply', async (req, res) => {
  const application = await prisma.admissionApplication.create({
    data: {
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      programme: req.body.programme,
      department: req.body.department,
      session: req.body.session ?? 'Spring 2026',
      documents: req.body.documents ?? [],
    },
  })

  await emailTransporter.sendMail({
    from: process.env.SMTP_USER,
    to: req.body.email,
    subject: 'MU admission application received',
    text: `Dear ${req.body.fullName}, your admission application for ${req.body.programme} has been received.`,
  }).catch(() => undefined)

  return sendResponse(res, 201, 'Application submitted successfully.', application)
})

router.patch('/:id/status', authenticate, authorize('ADMIN'), async (req, res) => {
  const application = await prisma.admissionApplication.update({
    where: { id: String(req.params.id) },
    data: { status: req.body.status },
  })

  await emailTransporter.sendMail({
    from: process.env.SMTP_USER,
    to: application.email,
    subject: 'MU admission status updated',
    text: `Your application status is now: ${application.status}.`,
  }).catch(() => undefined)

  return sendResponse(res, 200, 'Application status updated.', application)
})

export default router
