import { prisma } from '../../config/database'

export const departmentService = {
  async getAll() {
    const departments = await prisma.department.findMany({
      include: {
        students: true,
        teachers: true,
        courses: true,
      },
      orderBy: { name: 'asc' },
    })

    return departments.map((d) => ({
      ...d,
      studentCount: d.students.length,
      teacherCount: d.teachers.length,
      courseCount: d.courses.length,
    }))
  },

  async getById(id: string) {
    const dept = await prisma.department.findUnique({
      where: { id },
      include: {
        students: true,
        teachers: true,
        courses: { include: { assignments: { include: { teacher: true } } } },
      },
    })

    if (!dept) throw new Error('Department not found')

    return {
      ...dept,
      studentCount: dept.students.length,
      teacherCount: dept.teachers.length,
      courseCount: dept.courses.length,
    }
  },

  async create(data: { name: string; shortName: string; school: string; headName?: string; description?: string; icon?: string }) {
    const dept = await prisma.department.create({
      data,
      include: { students: true, teachers: true, courses: true },
    })

    return dept
  },

  async update(id: string, data: Partial<{ name: string; school: string; headName: string; description: string; icon: string }>) {
    const dept = await prisma.department.update({
      where: { id },
      data,
      include: { students: true, teachers: true, courses: true },
    })

    return dept
  },

  async delete(id: string) {
    await prisma.department.delete({ where: { id } })
    return { message: 'Department deleted successfully' }
  },

  async getDepartmentStats(id: string) {
    const [students, teachers, courses] = await Promise.all([
      prisma.student.count({ where: { departmentId: id } }),
      prisma.teacher.count({ where: { departmentId: id } }),
      prisma.course.count({ where: { departmentId: id } }),
    ])

    return {
      studentCount: students,
      teacherCount: teachers,
      courseCount: courses,
    }
  },
}
