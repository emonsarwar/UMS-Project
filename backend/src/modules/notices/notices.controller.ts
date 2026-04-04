import type { Request, Response } from 'express'
import { noticeService, type NoticeData } from './notices.service'
import { sendResponse } from '../../utils/response'

export const getAllNotices = async (req: Request, res: Response) => {
  try {
    const departmentId = req.query.departmentId ? String(req.query.departmentId) : undefined
    const notices = await noticeService.getAll(departmentId)
    return sendResponse(res, 200, 'Notices fetched successfully.', notices)
  } catch (error) {
    return sendResponse(res, 500, (error as Error).message)
  }
}

export const getNoticeById = async (req: Request, res: Response) => {
  try {
    const notice = await noticeService.getById(String(req.params.id))
    return sendResponse(res, 200, 'Notice fetched successfully.', notice)
  } catch (error) {
    return sendResponse(res, 404, (error as Error).message)
  }
}

export const createNotice = async (req: Request, res: Response) => {
  try {
    const data: NoticeData = {
      title: req.body.title,
      content: req.body.content,
      departmentId: req.body.departmentId,
      priority: req.body.priority || 'MEDIUM',
    }

    const notice = await noticeService.create(data)
    return sendResponse(res, 201, 'Notice created successfully.', notice)
  } catch (error) {
    return sendResponse(res, 400, (error as Error).message)
  }
}

export const updateNotice = async (req: Request, res: Response) => {
  try {
    const data: Partial<NoticeData> = {
      title: req.body.title,
      content: req.body.content,
      departmentId: req.body.departmentId,
      priority: req.body.priority,
    }

    const notice = await noticeService.update(String(req.params.id), data)
    return sendResponse(res, 200, 'Notice updated successfully.', notice)
  } catch (error) {
    return sendResponse(res, 400, (error as Error).message)
  }
}

export const deleteNotice = async (req: Request, res: Response) => {
  try {
    const result = await noticeService.delete(String(req.params.id))
    return sendResponse(res, 200, result.message)
  } catch (error) {
    return sendResponse(res, 400, (error as Error).message)
  }
}

export const getRecentNotices = async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : 10
    const notices = await noticeService.getRecent(limit)
    return sendResponse(res, 200, 'Recent notices fetched successfully.', notices)
  } catch (error) {
    return sendResponse(res, 500, (error as Error).message)
  }
}
