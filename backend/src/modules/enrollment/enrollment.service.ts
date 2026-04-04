import { prisma } from '../../config/database'

export const enrollmentService = {
  async getByStudent(studentId: string) {
    const enrollments = await prisma.enrollment.findMany({
      where: { studentId },
      include: { course: { include: { department: true, assignments: { include: { teacher: true } } } } },
      orderBy: { enrolledAt: 'desc' },
    })

    return enrollments
  },

  async getByCourse(courseId: string) {
    const enrollments = await prisma.enrollment.findMany({
      where: { courseId },
      include: { student: { include: { department: true } } },
      orderBy: { enrolledAt: 'desc' },
    })

    return enrollments
  },

  async enroll(studentId: string, courseId: string) {
    const existingEnroll = await prisma.enrollment.findUnique({
      where: {
        studentId_courseId: {
          studentId,
          courseId,
        },
      },
    })

    if (existingEnroll) {
      throw new Error('Student is already enrolled in this course')
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        studentId,
        courseId,
      },
      include: { student: true, course: { include: { assignments: { include: { teacher: true } } } } },
    })

    return enrollment
  },

  async unenroll(enrollmentId: string) {
    await prisma.enrollment.delete({ where: { id: enrollmentId } })
    return { message: 'Student unenrolled successfully' }
  },

  async bulkEnroll(courseId: string, studentIds: string[]) {
    const enrollments = await Promise.all(
      studentIds.map((studentId) =>
        this.enroll(studentId, courseId).catch(() => null),
      ),
    )

    return enrollments.filter(Boolean)
  },

  async getEnrollmentStats(courseId: string) {
    const [totalEnrollments, attendanceRecords, results] = await Promise.all([
      prisma.enrollment.count({ where: { courseId } }),
      prisma.attendance.findMany({ where: { courseId } }),
      prisma.result.findMany({ where: { courseId } }),
    ])

    return {
      totalEnrollments,
      totalAttendanceRecords: attendanceRecords.length,
      totalResults: results.length,
      averageScore: results.length > 0 ? results.reduce((sum, r) => sum + r.score, 0) / results.length : 0,
    }
  },
}
