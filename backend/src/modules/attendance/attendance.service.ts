import { prisma } from '../../config/database'

export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE'

export interface MarkAttendanceData {
  courseId: string
  date: Date
  attendances: Array<{
    studentId: string
    status: AttendanceStatus
  }>
}

export const attendanceService = {
  async getByStudent(studentId: string, courseId?: string) {
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

  async getByCourse(courseId: string) {
    const attendances = await prisma.attendance.findMany({
      where: { courseId },
      include: { student: true, course: true },
      orderBy: { createdAt: 'desc' },
    })

    return attendances
  },

  async markAttendance(data: MarkAttendanceData) {
    const createdAttendances = await Promise.all(
      data.attendances.map((att) =>
        prisma.attendance.create({
          data: {
            studentId: att.studentId,
            courseId: data.courseId,
            status: att.status,
            createdAt: data.date,
          },
          include: { student: true, course: true },
        }),
      ),
    )

    return createdAttendances
  },

  async updateAttendance(id: string, status: AttendanceStatus) {
    const attendance = await prisma.attendance.update({
      where: { id },
      data: { status },
      include: { student: true, course: true },
    })

    return attendance
  },

  async getAttendanceReport(studentId: string, courseId: string) {
    const attendances = await prisma.attendance.findMany({
      where: { studentId, courseId },
    })

    const total = attendances.length
    const present = attendances.filter((a) => a.status === 'PRESENT').length
    const absent = attendances.filter((a) => a.status === 'ABSENT').length
    const late = attendances.filter((a) => a.status === 'LATE').length
    const percentage = total > 0 ? (present / total) * 100 : 0

    return {
      total,
      present,
      absent,
      late,
      percentage: Math.round(percentage * 100) / 100,
    }
  },

  async getCourseAttendanceReport(courseId: string) {
    const attendance = await prisma.attendance.groupBy({
      by: ['studentId'],
      where: { courseId },
      _count: {
        id: true,
        status: true,
      },
    })

    const studentAttendance = await Promise.all(
      attendance.map(async (att) => {
        const report = await this.getAttendanceReport(att.studentId, courseId)
        const student = await prisma.student.findUnique({
          where: { id: att.studentId },
        })
        return { student, ...report }
      }),
    )

    return studentAttendance
  },

  async delete(id: string) {
    await prisma.attendance.delete({ where: { id } })
    return { message: 'Attendance record deleted' }
  },
}
