import { prisma } from '../../config/database'

export const analyticsService = {
  async getDashboardStats() {
    const [totalStudents, totalTeachers, totalCourses, totalEnrollments, totalDepartments] = await Promise.all([
      prisma.student.count(),
      prisma.teacher.count(),
      prisma.course.count(),
      prisma.enrollment.count(),
      prisma.department.count(),
    ])

    return {
      totalStudents,
      totalTeachers,
      totalCourses,
      totalEnrollments,
      totalDepartments,
    }
  },

  async getDepartmentAnalytics() {
    const departments = await prisma.department.findMany({
      include: {
        _count: {
          select: {
            students: true,
            teachers: true,
            courses: true,
          },
        },
      },
    })

    return departments.map((d) => ({
      id: d.id,
      name: d.name,
      shortName: d.shortName,
      students: d._count.students,
      teachers: d._count.teachers,
      courses: d._count.courses,
    }))
  },

  async getEnrollmentTrend(days = 30) {
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

    const enrollments = await prisma.enrollment.findMany({
      where: {
        enrolledAt: { gte: startDate },
      },
      select: { enrolledAt: true },
      orderBy: { enrolledAt: 'asc' },
    })

    const trend = new Map<string, number>()

    enrollments.forEach((e) => {
      const date = e.enrolledAt.toISOString().split('T')[0]
      trend.set(date, (trend.get(date) || 0) + 1)
    })

    return Array.from(trend.entries()).map(([date, count]) => ({ date, count }))
  },

  async getPerformanceStats() {
    const results = await prisma.result.findMany({
      select: { score: true },
    })

    if (results.length === 0) {
      return {
        averageScore: 0,
        highestScore: 0,
        lowestScore: 0,
        passRate: 0,
      }
    }

    const scores = results.map((r) => r.score)
    const average = scores.reduce((a, b) => a + b, 0) / scores.length
    const passed = scores.filter((s) => s >= 40).length
    const passRate = (passed / scores.length) * 100

    return {
      averageScore: Math.round(average * 100) / 100,
      highestScore: Math.max(...scores),
      lowestScore: Math.min(...scores),
      passRate: Math.round(passRate * 100) / 100,
    }
  },

  async getAttendanceStats() {
    const [totalRecords, present, absent, late] = await Promise.all([
      prisma.attendance.count(),
      prisma.attendance.count({ where: { status: 'PRESENT' } }),
      prisma.attendance.count({ where: { status: 'ABSENT' } }),
      prisma.attendance.count({ where: { status: 'LATE' } }),
    ])

    return {
      totalRecords,
      present,
      absent,
      late,
      presentPercentage: totalRecords > 0 ? (present / totalRecords) * 100 : 0,
    }
  },
}
