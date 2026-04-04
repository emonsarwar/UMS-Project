import { prisma } from '../../config/database'
import { calculateCgpa, calculateGrade } from '../../utils/gradeCalc'

export interface UploadResultData {
  studentId: string
  courseId: string
  score: number
}

export const resultService = {
  async getByStudent(studentId: string, courseId?: string) {
    const results = await prisma.result.findMany({
      where: {
        studentId,
        ...(courseId ? { courseId } : {}),
      },
      include: { course: { include: { department: true } } },
      orderBy: { createdAt: 'desc' },
    })

    return results.map((r) => ({
      ...r,
      grade: calculateGrade(r.score),
    }))
  },

  async getByCourse(courseId: string) {
    const results = await prisma.result.findMany({
      where: { courseId },
      include: { student: true, course: true },
      orderBy: { createdAt: 'desc' },
    })

    return results.map((r) => ({
      ...r,
      grade: calculateGrade(r.score),
    }))
  },

  async uploadResult(data: UploadResultData) {
    const existingResult = await prisma.result.findFirst({
      where: { studentId: data.studentId, courseId: data.courseId },
    })

    if (existingResult) {
      return this.updateResult(existingResult.id, data.score)
    }

    const result = await prisma.result.create({
      data: {
        studentId: data.studentId,
        courseId: data.courseId,
        score: data.score,
      },
      include: { student: true, course: true },
    })

    return {
      ...result,
      grade: calculateGrade(result.score),
    }
  },

  async uploadBulkResults(courseId: string, results: Array<{ studentId: string; score: number }>) {
    const uploadedResults = await Promise.all(
      results.map((r) =>
        this.uploadResult({
          studentId: r.studentId,
          courseId,
          score: r.score,
        }),
      ),
    )

    return uploadedResults
  },

  async updateResult(id: string, score: number) {
    const result = await prisma.result.update({
      where: { id },
      data: { score },
      include: { student: true, course: true },
    })

    return {
      ...result,
      grade: calculateGrade(result.score),
    }
  },

  async getStudentGPA(studentId: string) {
    const results = await prisma.result.findMany({
      where: { studentId },
      include: { course: true },
    })

    if (results.length === 0) return { cgpa: 0, totalCredits: 0, semesterGPA: 0 }

    const cgpa = calculateCgpa(results)
    const totalCredits = results.reduce((sum, r) => sum + r.course.credits, 0)

    return { cgpa, totalCredits }
  },

  async getTranscript(studentId: string) {
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        department: true,
        results: {
          include: { course: true },
          orderBy: { createdAt: 'asc' },
        },
      },
    })

    if (!student) throw new Error('Student not found')

    const results = student.results.map((r) => ({
      ...r,
      grade: calculateGrade(r.score),
    }))

    const gpa = calculateCgpa(student.results)

    return {
      student,
      results,
      gpa,
      totalCredits: student.results.reduce((sum, r) => sum + r.course.credits, 0),
    }
  },

  async delete(id: string) {
    await prisma.result.delete({ where: { id } })
    return { message: 'Result deleted successfully' }
  },
}
