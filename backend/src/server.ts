import dotenv from 'dotenv'
import app from './app'
import { prisma } from './config/database'
import { ensureEmbeddedPostgres, stopEmbeddedPostgres } from './config/embeddedPostgres'
import { logger } from './config/logger'

dotenv.config()

const port = Number(process.env.PORT ?? 5000)

const startServer = async () => {
  try {
    await ensureEmbeddedPostgres()
    await prisma.$connect()

    const server = app.listen(port, () => {
      logger.info(`🚀 Metropolitan University backend listening on port ${port}`)
    })

    const shutdown = async () => {
      server.close()
      await prisma.$disconnect()
      await stopEmbeddedPostgres()
      process.exit(0)
    }

    process.on('SIGINT', () => void shutdown())
    process.on('SIGTERM', () => void shutdown())
  } catch (error) {
    logger.error(error)
    process.exit(1)
  }
}

void startServer()
