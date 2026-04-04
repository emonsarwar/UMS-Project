import type { Request, Response } from 'express'
import { studentService, type PaginationParams } from './students.service'
import { sendResponse } from '../../utils/response'

export const getAllStudents = async (req: Request, res: Response) => {
  const params: PaginationParams = {
    page: req.query.page ? Number(req.query.page) : 1,
    limit: req.query.limit ? Number(req.query.limit) : 10,
    search: req.query.search ? String(req.query.search) : '',
    department: req.query.department ? String(req.query.department) : '',
  }

  try {
    const result = await studentService.getAll(params)
    return sendResponse(res, 200, 'Students fetched successfully.', result)
  } catch (error) {
    return sendResponse(res, 500, (error as Error).message)
  }
}

export const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await studentService.getById(String(req.params.id))
    return sendResponse(res, 200, 'Student fetched successfully.', student)
  } catch (error) {
    return sendResponse(res, 404, (error as Error).message)
  }
}

export const getStudentDashboard = async (req: Request, res: Response) => {
  try {
    const dashboard = await studentService.getDashboard(String(req.params.id))
    return sendResponse(res, 200, 'Dashboard fetched successfully.', dashboard)
  } catch (error) {
    return sendResponse(res, 404, (error as Error).message)
  }
}

export const createStudent = async (req: Request, res: Response) => {
  try {
    const student = await studentService.create(req.body)
    return sendResponse(res, 201, 'Student created successfully.', student)
  } catch (error) {
    return sendResponse(res, 400, (error as Error).message)
  }
}

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const student = await studentService.update(String(req.params.id), req.body)
    return sendResponse(res, 200, 'Student updated successfully.', student)
  } catch (error) {
    return sendResponse(res, 400, (error as Error).message)
  }
}

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const result = await studentService.delete(String(req.params.id))
    return sendResponse(res, 200, result.message)
  } catch (error) {
    return sendResponse(res, 400, (error as Error).message)
  }
}

export const getStudentsByDepartment = async (req: Request, res: Response) => {
  try {
    const students = await studentService.getByDepartment(String(req.params.departmentId))
    return sendResponse(res, 200, 'Students fetched successfully.', students)
  } catch (error) {
    return sendResponse(res, 500, (error as Error).message)
  }
}

export const getStudentEnrollments = async (req: Request, res: Response) => {
  try {
    const enrollments = await studentService.getEnrollments(String(req.params.id))
    return sendResponse(res, 200, 'Enrollments fetched successfully.', enrollments)
  } catch (error) {
    return sendResponse(res, 500, (error as Error).message)
  }
}

export const getStudentAttendance = async (req: Request, res: Response) => {
  try {
    const courseId = req.query.courseId ? String(req.query.courseId) : undefined
    const attendance = await studentService.getAttendance(String(req.params.id), courseId)
    return sendResponse(res, 200, 'Attendance fetched successfully.', attendance)
  } catch (error) {
    return sendResponse(res, 500, (error as Error).message)
  }
}

export const getStudentResults = async (req: Request, res: Response) => {
  try {
    const courseId = req.query.courseId ? String(req.query.courseId) : undefined
    const results = await studentService.getResults(String(req.params.id), courseId)
    return sendResponse(res, 200, 'Results fetched successfully.', results)
  } catch (error) {
    return sendResponse(res, 500, (error as Error).message)
  }
}
