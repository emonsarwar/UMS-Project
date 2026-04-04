import type { Request, Response } from 'express'
import { teacherService, type TeacherData } from './teachers.service'
import { sendResponse } from '../../utils/response'

export const getAllTeachers = async (req: Request, res: Response) => {
  try {
    const teachers = await teacherService.getAll()
    return sendResponse(res, 200, 'Teachers fetched successfully.', teachers)
  } catch (error) {
    return sendResponse(res, 500, (error as Error).message)
  }
}

export const getTeacherById = async (req: Request, res: Response) => {
  try {
    const teacher = await teacherService.getById(String(req.params.id))
    return sendResponse(res, 200, 'Teacher fetched successfully.', teacher)
  } catch (error) {
    return sendResponse(res, 404, (error as Error).message)
  }
}

export const getTeacherDashboard = async (req: Request, res: Response) => {
  try {
    const dashboard = await teacherService.getDashboard(String(req.params.id))
    return sendResponse(res, 200, 'Dashboard fetched successfully.', dashboard)
  } catch (error) {
    return sendResponse(res, 404, (error as Error).message)
  }
}

export const createTeacher = async (req: Request, res: Response) => {
  try {
    const data: TeacherData = {
      email: req.body.email,
      password: req.body.password,
      teacherId: req.body.teacherId,
      fullName: req.body.fullName,
      departmentId: req.body.departmentId,
      designation: req.body.designation,
      phone: req.body.phone,
      researchArea: req.body.researchArea,
    }

    const teacher = await teacherService.create(data)
    return sendResponse(res, 201, 'Teacher created successfully.', teacher)
  } catch (error) {
    return sendResponse(res, 400, (error as Error).message)
  }
}

export const updateTeacher = async (req: Request, res: Response) => {
  try {
    const data: Partial<Omit<TeacherData, 'email' | 'password'>> = {
      teacherId: req.body.teacherId,
      fullName: req.body.fullName,
      phone: req.body.phone,
      designation: req.body.designation,
      researchArea: req.body.researchArea,
    }

    const teacher = await teacherService.update(String(req.params.id), data)
    return sendResponse(res, 200, 'Teacher updated successfully.', teacher)
  } catch (error) {
    return sendResponse(res, 400, (error as Error).message)
  }
}

export const deleteTeacher = async (req: Request, res: Response) => {
  try {
    const result = await teacherService.delete(String(req.params.id))
    return sendResponse(res, 200, result.message)
  } catch (error) {
    return sendResponse(res, 400, (error as Error).message)
  }
}

export const getTeachersByDepartment = async (req: Request, res: Response) => {
  try {
    const teachers = await teacherService.getByDepartment(String(req.params.departmentId))
    return sendResponse(res, 200, 'Teachers fetched successfully.', teachers)
  } catch (error) {
    return sendResponse(res, 500, (error as Error).message)
  }
}

export const getTeacherCourses = async (req: Request, res: Response) => {
  try {
    const courses = await teacherService.getCourses(String(req.params.id))
    return sendResponse(res, 200, 'Courses fetched successfully.', courses)
  } catch (error) {
    return sendResponse(res, 500, (error as Error).message)
  }
}

export const getTeacherStudents = async (req: Request, res: Response) => {
  try {
    const students = await teacherService.getStudents(String(req.params.id))
    return sendResponse(res, 200, 'Students fetched successfully.', students)
  } catch (error) {
    return sendResponse(res, 500, (error as Error).message)
  }
}
