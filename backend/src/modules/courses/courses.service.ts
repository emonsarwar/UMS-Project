import { prisma } from '../../config/database'

export interface CourseData {
  code: string
  title: string
  credits: number
  departmentId: string
  semester: number
  description?: string
}

export const courseService = {
  async getAll(departmentId?: string) {
    const courses = await prisma.course.findMany({
      where: departmentId ? { departmentId } : undefined,
      include: {
        department: true,
        assignments: { include: { teacher: true } },
      },
      orderBy: { code: 'asc' },
    })
    return courses
  },

  async getById(id: string) {
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        department: true,
        assignments: { include: { teacher: true } },
        enrollments: true,
        results: true,
      },
    })

    if (!course) throw new Error('Course not found')

    return course
  },

  async create(data: CourseData) {
    const existingCode = await prisma.course.findUnique({ where: { code: data.code } })
    if (existingCode) throw new Error('Course code already exists')

    const course = await prisma.course.create({
      data: {
        code: data.code.toUpperCase(),
        title: data.title,
        credits: data.credits,
        departmentId: data.departmentId,
        semester: data.semester,
        description: data.description,
      },
      include: { department: true },
    })

    return course
  },

  async update(id: string, data: Partial<CourseData>) {
    if (data.code) {
      const existing = await prisma.course.findFirst({
        where: { code: data.code, NOT: { id } },
      })
      if (existing) throw new Error('Course code already in use')
    }

    const course = await prisma.course.update({
      where: { id },
      data: {
        ...(data.code && { code: data.code.toUpperCase() }),
        ...(data.title && { title: data.title }),
        ...(data.credits && { credits: data.credits }),
        ...(data.semester && { semester: data.semester }),
        ...(data.description && { description: data.description }),
      },
      include: { department: true, assignments: { include: { teacher: true } } },
    })

    return course
  },

  async delete(id: string) {
    await prisma.course.delete({ where: { id } })
    return { message: 'Course deleted successfully' }
  },

  async getByDepartment(departmentId: string) {
    const courses = await prisma.course.findMany({
      where: { departmentId },
      include: { department: true, assignments: { include: { teacher: true } } },
      orderBy: [{ semester: 'asc' }, { code: 'asc' }],
    })
    return courses
  },

  async assignTeacher(courseId: string, teacherId: string) {
    const existingAssignment = await prisma.courseAssignment.findFirst({
      where: { courseId, teacherId },
    })

    if (existingAssignment) throw new Error('Teacher already assigned to this course')

    const assignment = await prisma.courseAssignment.create({
      data: { courseId, teacherId },
      include: { course: true, teacher: true },
    })

    return assignment
  },

  async removeTeacher(courseId: string, teacherId: string) {
    await prisma.courseAssignment.deleteMany({
      where: { courseId, teacherId },
    })
    return { message: 'Teacher removed from course' }
  },

  async getEnrollments(courseId: string) {
    const enrollments = await prisma.enrollment.findMany({
      where: { courseId },
      include: { student: true },
    })
    return enrollments
  },

  async getStatistics(courseId: string) {
    const [totalEnrollments, totalAttendance, averageScore] = await Promise.all([
      prisma.enrollment.count({ where: { courseId } }),
      prisma.attendance.count({ where: { courseId } }),
      prisma.result.aggregate({
        where: { courseId },
        _avg: { score: true },
      }),
    ])

    return {
      totalEnrollments,
      totalAttendance,
      averageScore: averageScore._avg.score || 0,
    }
  },
}
