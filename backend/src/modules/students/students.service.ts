import { prisma } from '../../config/database'
import { hashPassword } from '../../utils/bcrypt'
import { calculateCgpa } from '../../utils/cgpaCalc'

export interface PaginationParams {
  page?: number
  limit?: number
  search?: string
  department?: string
}

export const studentService = {
  async getAll(params: PaginationParams) {
    const page = params.page || 1
    const limit = params.limit || 10
    const search = params.search || ''
    const department = params.department || ''

    const where = {
      ...(search
        ? {
            OR: [
              { fullName: { contains: search, mode: 'insensitive' as const } },
              { studentId: { contains: search, mode: 'insensitive' as const } },
            ],
          }
        : {}),
      ...(department ? { department: { shortName: department } } : {}),
    }

    const [items, total] = await Promise.all([
      prisma.student.findMany({
        where,
        include: { department: true, user: true },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { fullName: 'asc' },
      }),
      prisma.student.count({ where }),
    ])

    return { items, total, page, limit }
  },

  async getById(id: string) {
    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        department: true,
        user: { select: { email: true } },
        results: { include: { course: true } },
        attendances: { include: { course: true } },
        enrollments: { include: { course: true } },
      },
    })

    if (!student) throw new Error('Student not found')

    const cgpa = calculateCgpa(student.results)

    return { ...student, cgpa }
  },

  async getDashboard(id: string) {
    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        department: true,
        results: {
          include: { course: true },
          orderBy: { createdAt: 'desc' as const },
          take: 5,
        },
        attendances: {
          include: { course: true },
          orderBy: { createdAt: 'desc' as const },
          take: 10,
        },
        enrollments: {
          include: { course: { include: { department: true } } },
          take: 5,
        },
        feeRecords: {
          orderBy: { createdAt: 'desc' as const },
          take: 5,
        },
      },
    })

    if (!student) throw new Error('Student not found')

    const cgpa = calculateCgpa(student.results)
    const totalCredits = student.enrollments.reduce((sum, e) => sum + e.course.credits, 0)
    const attendancePercentage =
      student.attendances.length > 0
        ? (student.attendances.filter((a) => a.status === 'PRESENT').length / student.attendances.length) * 100
        : 0

    return {
      student,
      cgpa,
      totalCredits,
      attendancePercentage,
      recentResults: student.results.slice(0, 5),
      recentAttendance: student.attendances.slice(0, 10),
      currentCourses: student.enrollments,
      feeStatus: student.feeRecords.length > 0 ? student.feeRecords[0].status : 'PENDING',
    }
  },

  async create(data: {
    email: string
    password: string
    studentId: string
    fullName: string
    departmentId: string
    semester: number
    session: string
    phone?: string
    address?: string
    guardianName?: string
    guardianPhone?: string
  }) {
    const existingUser = await prisma.user.findUnique({ where: { email: data.email } })
    if (existingUser) throw new Error('Email already in use')

    const existingStudent = await prisma.student.findUnique({ where: { studentId: data.studentId } })
    if (existingStudent) throw new Error('Student ID already exists')

    const user = await prisma.user.create({
      data: {
        email: data.email.toLowerCase(),
        passwordHash: await hashPassword(data.password),
        role: 'STUDENT',
        student: {
          create: {
            studentId: data.studentId,
            fullName: data.fullName,
            departmentId: data.departmentId,
            semester: data.semester,
            session: data.session,
            phone: data.phone,
            address: data.address,
            guardianName: data.guardianName,
            guardianPhone: data.guardianPhone,
          },
        },
      },
      include: { student: true },
    })

    return user
  },

  async update(id: string, data: Partial<{
    fullName: string
    phone: string
    address: string
    guardianName: string
    guardianPhone: string
    semester: number
    photo: string
  }>) {
    const student = await prisma.student.update({
      where: { id },
      data,
      include: { department: true, user: true },
    })
    return student
  },

  async delete(id: string) {
    const student = await prisma.student.findUnique({ where: { id }, include: { user: true } })
    if (!student) throw new Error('Student not found')

    await prisma.student.delete({ where: { id } })
    await prisma.user.delete({ where: { id: student.userId } })

    return { message: 'Student deleted successfully' }
  },

  async getByDepartment(departmentId: string) {
    const students = await prisma.student.findMany({
      where: { departmentId },
      include: { department: true },
      orderBy: { fullName: 'asc' },
    })
    return students
  },

  async getEnrollments(studentId: string) {
    const enrollments = await prisma.enrollment.findMany({
      where: { studentId },
      include: {
        course: { include: { department: true, assignments: { include: { teacher: true } } } },
      },
      orderBy: { enrolledAt: 'desc' },
    })
    return enrollments
  },

  async getAttendance(studentId: string, courseId?: string) {
    const attendances = await prisma.attendance.findMany({
      where: {
        studentId,
        ...(courseId ? { courseId } : {}),
      },
      include: { course: true },
      orderBy: { createdAt: 'desc' },
    })
    return attendances
  },

  async getResults(studentId: string, courseId?: string) {
    const results = await prisma.result.findMany({
      where: {
        studentId,
        ...(courseId ? { courseId } : {}),
      },
      include: { course: true },
      orderBy: { createdAt: 'desc' },
    })
    return results
  },
}
