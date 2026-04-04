import { prisma } from '../../config/database'
import { hashPassword } from '../../utils/bcrypt'

export interface TeacherData {
  email: string
  password: string
  teacherId: string
  fullName: string
  departmentId: string
  designation: string
  phone?: string
  researchArea?: string
}

export const teacherService = {
  async getAll() {
    const teachers = await prisma.teacher.findMany({
      include: {
        department: true,
        user: { select: { email: true, isActive: true } },
        courses: { include: { course: true } },
      },
      orderBy: { fullName: 'asc' },
    })
    return teachers
  },

  async getById(id: string) {
    const teacher = await prisma.teacher.findUnique({
      where: { id },
      include: {
        department: true,
        user: { select: { email: true, isActive: true } },
        courses: {
          include: {
            course: { include: { enrollments: true, assignments: true } },
          },
        },
      },
    })

    if (!teacher) throw new Error('Teacher not found')

    return teacher
  },

  async getDashboard(id: string) {
    const teacher = await prisma.teacher.findUnique({
      where: { id },
      include: {
        department: true,
        courses: {
          include: {
            course: {
              include: {
                enrollments: true,
                assignments: true,
              },
            },
          },
        },
      },
    })

    if (!teacher) throw new Error('Teacher not found')

    return {
      teacher,
      totalCourses: teacher.courses.length,
      totalStudents: teacher.courses.reduce((sum, ca) => sum + ca.course.enrollments.length, 0),
      courses: teacher.courses.map((ca) => ({
        ...ca.course,
        enrolledStudents: ca.course.enrollments.length,
      })),
    }
  },

  async create(data: TeacherData) {
    const existingUser = await prisma.user.findUnique({ where: { email: data.email } })
    if (existingUser) throw new Error('Email already in use')

    const existingTeacher = await prisma.teacher.findUnique({ where: { teacherId: data.teacherId } })
    if (existingTeacher) throw new Error('Teacher ID already exists')

    const user = await prisma.user.create({
      data: {
        email: data.email.toLowerCase(),
        passwordHash: await hashPassword(data.password),
        role: 'TEACHER',
        teacher: {
          create: {
            teacherId: data.teacherId,
            fullName: data.fullName,
            departmentId: data.departmentId,
            designation: data.designation,
            phone: data.phone,
            researchArea: data.researchArea,
          },
        },
      },
      include: { teacher: true },
    })

    return user
  },

  async update(id: string, data: Partial<Omit<TeacherData, 'email' | 'password'>>) {
    const teacher = await prisma.teacher.update({
      where: { id },
      data: {
        fullName: data.fullName,
        phone: data.phone,
        designation: data.designation,
        researchArea: data.researchArea,
      },
      include: { department: true, user: true },
    })

    return teacher
  },

  async delete(id: string) {
    const teacher = await prisma.teacher.findUnique({ where: { id }, include: { user: true } })
    if (!teacher) throw new Error('Teacher not found')

    await prisma.teacher.delete({ where: { id } })
    await prisma.user.delete({ where: { id: teacher.userId } })

    return { message: 'Teacher deleted successfully' }
  },

  async getByDepartment(departmentId: string) {
    const teachers = await prisma.teacher.findMany({
      where: { departmentId },
      include: { department: true, courses: { include: { course: true } } },
      orderBy: { fullName: 'asc' },
    })

    return teachers
  },

  async getCourses(teacherId: string) {
    const courses = await prisma.courseAssignment.findMany({
      where: { teacherId },
      include: { course: { include: { enrollments: true, department: true } } },
    })

    return courses
  },

  async getStudents(teacherId: string) {
    const courses = await this.getCourses(teacherId)
    const studentIds = new Set<string>()

    courses.forEach((ca) => {
      ca.course.enrollments.forEach((e) => {
        studentIds.add(e.studentId)
      })
    })

    const students = await prisma.student.findMany({
      where: { id: { in: Array.from(studentIds) } },
      include: { department: true },
    })

    return students
  },
}
