import type { Request, Response } from 'express'
import { enrollmentService } from './enrollment.service'
import { sendResponse } from '../../utils/response'

export const getStudentEnrollments = async (req: Request, res: Response) => {
  try {
    const enrollments = await enrollmentService.getByStudent(String(req.params.studentId))
    return sendResponse(res, 200, 'Enrollments fetched successfully.', enrollments)
  } catch (error) {
    return sendResponse(res, 500, (error as Error).message)
  }
}

export const getCourseEnrollments = async (req: Request, res: Response) => {
  try {
    const enrollments = await enrollmentService.getByCourse(String(req.params.courseId))
    return sendResponse(res, 200, 'Enrollments fetched successfully.', enrollments)
  } catch (error) {
    return sendResponse(res, 500, (error as Error).message)
  }
}

export const enrollStudent = async (req: Request, res: Response) => {
  try {
    const enrollment = await enrollmentService.enroll(
      String(req.body.studentId),
      String(req.body.courseId),
    )
    return sendResponse(res, 201, 'Student enrolled successfully.', enrollment)
  } catch (error) {
    return sendResponse(res, 400, (error as Error).message)
  }
}

export const unenrollStudent = async (req: Request, res: Response) => {
  try {
    const result = await enrollmentService.unenroll(String(req.params.enrollmentId))
    return sendResponse(res, 200, result.message)
  } catch (error) {
    return sendResponse(res, 400, (error as Error).message)
  }
}

export const bulkEnrollStudents = async (req: Request, res: Response) => {
  try {
    const enrollments = await enrollmentService.bulkEnroll(
      String(req.params.courseId),
      req.body.studentIds,
    )
    return sendResponse(res, 201, 'Students enrolled successfully.', enrollments)
  } catch (error) {
    return sendResponse(res, 400, (error as Error).message)
  }
}

export const getEnrollmentStats = async (req: Request, res: Response) => {
  try {
    const stats = await enrollmentService.getEnrollmentStats(String(req.params.courseId))
    return sendResponse(res, 200, 'Statistics fetched successfully.', stats)
  } catch (error) {
    return sendResponse(res, 500, (error as Error).message)
  }
}
