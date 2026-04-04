import type { Request, Response } from 'express'
import { attendanceService, type AttendanceStatus, type MarkAttendanceData } from './attendance.service'
import { sendResponse } from '../../utils/response'

export const getStudentAttendance = async (req: Request, res: Response) => {
  try {
    const courseId = req.query.courseId ? String(req.query.courseId) : undefined
    const attendances = await attendanceService.getByStudent(String(req.params.studentId), courseId)
    return sendResponse(res, 200, 'Attendance fetched successfully.', attendances)
  } catch (error) {
    return sendResponse(res, 500, (error as Error).message)
  }
}

export const getCourseAttendance = async (req: Request, res: Response) => {
  try {
    const attendances = await attendanceService.getByCourse(String(req.params.courseId))
    return sendResponse(res, 200, 'Attendance fetched successfully.', attendances)
  } catch (error) {
    return sendResponse(res, 500, (error as Error).message)
  }
}

export const markAttendance = async (req: Request, res: Response) => {
  try {
    const data: MarkAttendanceData = {
      courseId: req.body.courseId,
      date: new Date(req.body.date),
      attendances: req.body.attendances,
    }

    const attendances = await attendanceService.markAttendance(data)
    return sendResponse(res, 201, 'Attendance marked successfully.', attendances)
  } catch (error) {
    return sendResponse(res, 400, (error as Error).message)
  }
}

export const updateAttendance = async (req: Request, res: Response) => {
  try {
    const status: AttendanceStatus = req.body.status
    const attendance = await attendanceService.updateAttendance(String(req.params.id), status)
    return sendResponse(res, 200, 'Attendance updated successfully.', attendance)
  } catch (error) {
    return sendResponse(res, 400, (error as Error).message)
  }
}

export const getAttendanceReport = async (req: Request, res: Response) => {
  try {
    const report = await attendanceService.getAttendanceReport(
      String(req.params.studentId),
      String(req.params.courseId),
    )
    return sendResponse(res, 200, 'Report fetched successfully.', report)
  } catch (error) {
    return sendResponse(res, 500, (error as Error).message)
  }
}

export const getCourseAttendanceReport = async (req: Request, res: Response) => {
  try {
    const report = await attendanceService.getCourseAttendanceReport(String(req.params.courseId))
    return sendResponse(res, 200, 'Report fetched successfully.', report)
  } catch (error) {
    return sendResponse(res, 500, (error as Error).message)
  }
}

export const deleteAttendance = async (req: Request, res: Response) => {
  try {
    const result = await attendanceService.delete(String(req.params.id))
    return sendResponse(res, 200, result.message)
  } catch (error) {
    return sendResponse(res, 400, (error as Error).message)
  }
}
