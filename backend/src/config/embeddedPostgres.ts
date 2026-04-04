import path from 'node:path'
import EmbeddedPostgres from 'embedded-postgres'
import { logger } from './logger'

let embeddedPostgres: EmbeddedPostgres | null = null

const readDatabaseConfig = () => {
  const databaseUrl = process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@127.0.0.1:5432/metropolitan_university'
  const parsed = new URL(databaseUrl)

  return {
    port: Number(parsed.port || '5432'),
    user: decodeURIComponent(parsed.username || 'postgres'),
    password: decodeURIComponent(parsed.password || 'postgres'),
    database: parsed.pathname.replace(/^\//, '') || 'metropolitan_university',
  }
}

export const ensureEmbeddedPostgres = async () => {
  const shouldUseEmbedded = (process.env.USE_EMBEDDED_POSTGRES ?? 'true') === 'true'

  if (!shouldUseEmbedded) {
    return
  }

  if (embeddedPostgres) {
    return
  }

  const { port, user, password, database } = readDatabaseConfig()

  embeddedPostgres = new EmbeddedPostgres({
    databaseDir: path.resolve(process.cwd(), '.embedded-postgres'),
    port,
    user,
    password,
    authMethod: 'password',
    persistent: true,
    onLog: (message: unknown) => logger.info(String(message)),
    onError: (message: unknown) => logger.warn(String(message)),
  })

  try {
    await embeddedPostgres.initialise()
  } catch {
    logger.info('Embedded PostgreSQL is reusing an existing local data directory.')
  }

  await embeddedPostgres.start()

  try {
    await embeddedPostgres.createDatabase(database)
  } catch {
    logger.info(`Embedded PostgreSQL database '${database}' already exists.`)
  }

  logger.info(`Embedded PostgreSQL is ready on port ${port}.`)
}

export const stopEmbeddedPostgres = async () => {
  if (!embeddedPostgres) {
    return
  }

  await embeddedPostgres.stop()
  embeddedPostgres = null
}
