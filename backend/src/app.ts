import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import authRouter from './modules/auth/auth.router'
import studentsRouter from './modules/students/students.router'
import teachersRouter from './modules/teachers/teachers.router'
import coursesRouter from './modules/courses/courses.router'
import enrollmentRouter from './modules/enrollment/enrollment.router'
import attendanceRouter from './modules/attendance/attendance.router'
import resultsRouter from './modules/results/results.router'
import feesRouter from './modules/fees/fees.router'
import noticesRouter from './modules/notices/notices.router'
import newsRouter from './modules/news/news.router'
import eventsRouter from './modules/events/events.router'
import galleryRouter from './modules/gallery/gallery.router'
import admissionRouter from './modules/admission/admission.router'
import transportRouter from './modules/transport/transport.router'
import libraryRouter from './modules/library/library.router'

import departmentsRouter from './modules/departments/departments.router'
import analyticsRouter from './modules/analytics/analytics.router'
import { errorHandler } from './middleware/errorHandler'

dotenv.config()

const app = express()
const clientUrl = process.env.CLIENT_URL ?? 'http://localhost:5173'

app.use(
  cors({
    origin: clientUrl,
    credentials: true,
  }),
)
app.use(helmet())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan('dev'))

app.get('/health', (_req, res) => {
  res.json({ success: true, message: 'MU backend is healthy.' })
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/students', studentsRouter)
app.use('/api/v1/teachers', teachersRouter)
app.use('/api/v1/courses', coursesRouter)
app.use('/api/v1/enrollment', enrollmentRouter)
app.use('/api/v1/attendance', attendanceRouter)
app.use('/api/v1/results', resultsRouter)
app.use('/api/v1/fees', feesRouter)
app.use('/api/v1/notices', noticesRouter)
app.use('/api/v1/news', newsRouter)
app.use('/api/v1/events', eventsRouter)
app.use('/api/v1/gallery', galleryRouter)
app.use('/api/v1/admission', admissionRouter)
app.use('/api/v1/transport', transportRouter)
app.use('/api/v1/departments', departmentsRouter)
app.use('/api/v1/library', libraryRouter)
app.use('/api/v1/analytics', analyticsRouter)

app.use(errorHandler)

export default app
