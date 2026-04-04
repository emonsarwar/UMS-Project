import { prisma } from '../../config/database'
import { emailTransporter } from '../../config/email'
import { comparePassword, hashPassword } from '../../utils/bcrypt'
import { type AppRole, hashToken, signAccessToken, signRefreshToken, verifyRefreshToken } from '../../utils/jwt'

const resolveUserName = (user: {
  email: string
  student?: { fullName: string } | null
  teacher?: { fullName: string } | null
  admin?: { fullName: string } | null
} | null) => {
  if (!user) return ''
  return user.student?.fullName ?? user.teacher?.fullName ?? user.admin?.fullName ?? user.email
}

export const loginUser = async (identifier: string, password: string) => {
  const normalizedIdentifier = identifier.trim()
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: normalizedIdentifier.toLowerCase() },
        { student: { is: { studentId: normalizedIdentifier } } },
        { teacher: { is: { teacherId: normalizedIdentifier } } },
        normalizedIdentifier === 'ADM-001' ? { email: 'admin@metrouni.edu.bd' } : { email: '__invalid__' },
      ],
      isActive: true,
    },
    include: {
      student: true,
      teacher: true,
      admin: true,
    },
  })

  if (!user) {
    throw new Error('Invalid credentials.')
  }

  const passwordMatched = await comparePassword(password, user.passwordHash)
  if (!passwordMatched) {
    throw new Error('Invalid credentials.')
  }

  const role = user.role as AppRole
  const name = resolveUserName(user)
  const accessToken = signAccessToken({ sub: user.id, role, name })
  const refreshToken = signRefreshToken({ sub: user.id, role, name })

  await prisma.refreshToken.create({
    data: {
      token: hashToken(refreshToken),
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  })

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      role,
      name,
      email: user.email,
      portalId: user.student?.studentId ?? user.teacher?.teacherId ?? 'ADM-001',
    },
  }
}

export const refreshUserSession = async (token: string) => {
  const decoded = verifyRefreshToken(token)
  const storedToken = await prisma.refreshToken.findUnique({
    where: { token: hashToken(token) },
    include: { user: { include: { student: true, teacher: true, admin: true } } },
  })

  if (!storedToken || storedToken.expiresAt < new Date()) {
    throw new Error('Refresh token is invalid or expired.')
  }

  await prisma.refreshToken.delete({ where: { id: storedToken.id } })

  const name = resolveUserName(storedToken.user)
  const accessToken = signAccessToken({ sub: decoded.sub, role: decoded.role, name })
  const refreshToken = signRefreshToken({ sub: decoded.sub, role: decoded.role, name })

  await prisma.refreshToken.create({
    data: {
      token: hashToken(refreshToken),
      userId: decoded.sub,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  })

  return { accessToken, refreshToken }
}

export const logoutUserSession = async (token: string) => {
  await prisma.refreshToken.deleteMany({ where: { token: hashToken(token) } })
}

export const requestPasswordReset = async (email: string) => {
  await emailTransporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Metropolitan University password reset',
    text: 'This is a demo password reset email for the Metropolitan University portal.',
  }).catch(() => undefined)

  return { message: 'If the account exists, a reset email has been sent.' }
}

export const resetPassword = async (email: string, nextPassword: string) => {
  const passwordHash = await hashPassword(nextPassword)
  await prisma.user.updateMany({ where: { email }, data: { passwordHash } })
  return { message: 'Password updated successfully.' }
}
