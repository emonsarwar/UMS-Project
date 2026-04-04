import type { Request, Response } from 'express'
import { analyticsService } from './analytics.service'
import { sendResponse } from '../../utils/response'

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const stats = await analyticsService.getDashboardStats()
    return sendResponse(res, 200, 'Dashboard stats fetched successfully.', stats)
  } catch (error) {
    return sendResponse(res, 500, (error as Error).message)
  }
}

export const getDepartmentAnalytics = async (req: Request, res: Response) => {
  try {
    const analytics = await analyticsService.getDepartmentAnalytics()
    return sendResponse(res, 200, 'Department analytics fetched successfully.', analytics)
  } catch (error) {
    return sendResponse(res, 500, (error as Error).message)
  }
}

export const getEnrollmentTrend = async (req: Request, res: Response) => {
  try {
    const days = req.query.days ? Number(req.query.days) : 30
    const trend = await analyticsService.getEnrollmentTrend(days)
    return sendResponse(res, 200, 'Enrollment trend fetched successfully.', trend)
  } catch (error) {
    return sendResponse(res, 500, (error as Error).message)
  }
}

export const getPerformanceStats = async (req: Request, res: Response) => {
  try {
    const stats = await analyticsService.getPerformanceStats()
    return sendResponse(res, 200, 'Performance stats fetched successfully.', stats)
  } catch (error) {
    return sendResponse(res, 500, (error as Error).message)
  }
}

export const getAttendanceStats = async (req: Request, res: Response) => {
  try {
    const stats = await analyticsService.getAttendanceStats()
    return sendResponse(res, 200, 'Attendance stats fetched successfully.', stats)
  } catch (error) {
    return sendResponse(res, 500, (error as Error).message)
  }
}
