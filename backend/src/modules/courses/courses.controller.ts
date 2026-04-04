import type { Request, Response } from 'express'
import { courseService, type CourseData } from './courses.service'
import { sendResponse } from '../../utils/response'

export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const departmentId = req.query.departmentId ? String(req.query.departmentId) : undefined
    const courses = await courseService.getAll(departmentId)
    return sendResponse(res, 200, 'Courses fetched successfully.', courses)
  } catch (error) {
    return sendResponse(res, 500, (error as Error).message)
  }
}

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const course = await courseService.getById(String(req.params.id))
    return sendResponse(res, 200, 'Course fetched successfully.', course)
  } catch (error) {
    return sendResponse(res, 404, (error as Error).message)
  }
}

export const createCourse = async (req: Request, res: Response) => {
  try {
    const data: CourseData = {
      code: req.body.code,
      title: req.body.title,
      credits: Number(req.body.credits),
      departmentId: req.body.departmentId,
      semester: Number(req.body.semester),
      description: req.body.description,
    }

    const course = await courseService.create(data)
    return sendResponse(res, 201, 'Course created successfully.', course)
  } catch (error) {
    return sendResponse(res, 400, (error as Error).message)
  }
}

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const data: Partial<CourseData> = {
      code: req.body.code,
      title: req.body.title,
      credits: req.body.credits ? Number(req.body.credits) : undefined,
      departmentId: req.body.departmentId,
      semester: req.body.semester ? Number(req.body.semester) : undefined,
      description: req.body.description,
    }

    const course = await courseService.update(String(req.params.id), data)
    return sendResponse(res, 200, 'Course updated successfully.', course)
  } catch (error) {
    return sendResponse(res, 400, (error as Error).message)
  }
}

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const result = await courseService.delete(String(req.params.id))
    return sendResponse(res, 200, result.message)
  } catch (error) {
    return sendResponse(res, 400, (error as Error).message)
  }
}

export const getCoursesByDepartment = async (req: Request, res: Response) => {
  try {
    const courses = await courseService.getByDepartment(String(req.params.departmentId))
    return sendResponse(res, 200, 'Courses fetched successfully.', courses)
  } catch (error) {
    return sendResponse(res, 500, (error as Error).message)
  }
}

export const assignTeacher = async (req: Request, res: Response) => {
  try {
    const assignment = await courseService.assignTeacher(
      String(req.params.courseId),
      String(req.body.teacherId),
    )
    return sendResponse(res, 201, 'Teacher assigned successfully.', assignment)
  } catch (error) {
    return sendResponse(res, 400, (error as Error).message)
  }
}

export const removeTeacher = async (req: Request, res: Response) => {
  try {
    const result = await courseService.removeTeacher(
      String(req.params.courseId),
      String(req.body.teacherId),
    )
    return sendResponse(res, 200, result.message)
  } catch (error) {
    return sendResponse(res, 400, (error as Error).message)
  }
}

export const getCourseEnrollments = async (req: Request, res: Response) => {
  try {
    const enrollments = await courseService.getEnrollments(String(req.params.courseId))
    return sendResponse(res, 200, 'Enrollments fetched successfully.', enrollments)
  } catch (error) {
    return sendResponse(res, 500, (error as Error).message)
  }
}

export const getCourseStatistics = async (req: Request, res: Response) => {
  try {
    const stats = await courseService.getStatistics(String(req.params.courseId))
    return sendResponse(res, 200, 'Statistics fetched successfully.', stats)
  } catch (error) {
    return sendResponse(res, 500, (error as Error).message)
  }
}
