import express, { Application } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import studentRouter from './modules/students/students.router'
import teacherRouter from './modules/teachers/teachers.router'
import adminRouter from './modules/admin/admin.router' // assume
import notificationsRouter from './modules/notifications/notifications.router'

const app: Application = express()

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}))

app.use(express.json())
app.use(cookieParser())

app.use('/api/students', studentRouter)
app.use('/api/teachers', teacherRouter)
app.use('/api/notifications', notificationsRouter)

// Health check
app.get('/health', (req, res) => {
  res.json({ success: true, message: 'MU backend is healthy.' })
})

export default app
