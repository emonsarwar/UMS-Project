import type { Request, Response } from 'express'
import { departmentService } from './departments.service'
import { sendResponse } from '../../utils/response'

export const getAllDepartments = async (req: Request, res: Response) => {
  try {
    const departments = await departmentService.getAll()
    return sendResponse(res, 200, 'Departments fetched successfully.', departments)
  } catch (error) {
    return sendResponse(res, 500, (error as Error).message)
  }
}

export const getDepartmentById = async (req: Request, res: Response) => {
  try {
    const department = await departmentService.getById(String(req.params.id))
    return sendResponse(res, 200, 'Department fetched successfully.', department)
  } catch (error) {
    return sendResponse(res, 404, (error as Error).message)
  }
}

export const createDepartment = async (req: Request, res: Response) => {
  try {
    const department = await departmentService.create(req.body)
    return sendResponse(res, 201, 'Department created successfully.', department)
  } catch (error) {
    return sendResponse(res, 400, (error as Error).message)
  }
}

export const updateDepartment = async (req: Request, res: Response) => {
  try {
    const department = await departmentService.update(String(req.params.id), req.body)
    return sendResponse(res, 200, 'Department updated successfully.', department)
  } catch (error) {
    return sendResponse(res, 400, (error as Error).message)
  }
}

export const deleteDepartment = async (req: Request, res: Response) => {
  try {
    const result = await departmentService.delete(String(req.params.id))
    return sendResponse(res, 200, result.message)
  } catch (error) {
    return sendResponse(res, 400, (error as Error).message)
  }
}

export const getDepartmentStats = async (req: Request, res: Response) => {
  try {
    const stats = await departmentService.getDepartmentStats(String(req.params.id))
    return sendResponse(res, 200, 'Statistics fetched successfully.', stats)
  } catch (error) {
    return sendResponse(res, 500, (error as Error).message)
  }
}
