import type { Request, Response } from 'express'
import { resultService, type UploadResultData } from './results.service'
import { sendResponse } from '../../utils/response'

export const getStudentResults = async (req: Request, res: Response) => {
  try {
    const courseId = req.query.courseId ? String(req.query.courseId) : undefined
    const results = await resultService.getByStudent(String(req.params.studentId), courseId)
    return sendResponse(res, 200, 'Results fetched successfully.', results)
  } catch (error) {
    return sendResponse(res, 500, (error as Error).message)
  }
}

export const getCourseResults = async (req: Request, res: Response) => {
  try {
    const results = await resultService.getByCourse(String(req.params.courseId))
    return sendResponse(res, 200, 'Results fetched successfully.', results)
  } catch (error) {
    return sendResponse(res, 500, (error as Error).message)
  }
}

export const uploadResult = async (req: Request, res: Response) => {
  try {
    const data: UploadResultData = {
      studentId: req.body.studentId,
      courseId: req.body.courseId,
      score: Number(req.body.score),
    }

    const result = await resultService.uploadResult(data)
    return sendResponse(res, 201, 'Result uploaded successfully.', result)
  } catch (error) {
    return sendResponse(res, 400, (error as Error).message)
  }
}

export const uploadBulkResults = async (req: Request, res: Response) => {
  try {
    const results = await resultService.uploadBulkResults(
      String(req.params.courseId),
      req.body.results,
    )
    return sendResponse(res, 201, 'Results uploaded successfully.', results)
  } catch (error) {
    return sendResponse(res, 400, (error as Error).message)
  }
}

export const updateResult = async (req: Request, res: Response) => {
  try {
    const result = await resultService.updateResult(String(req.params.id), Number(req.body.score))
    return sendResponse(res, 200, 'Result updated successfully.', result)
  } catch (error) {
    return sendResponse(res, 400, (error as Error).message)
  }
}

export const getStudentGPA = async (req: Request, res: Response) => {
  try {
    const gpa = await resultService.getStudentGPA(String(req.params.studentId))
    return sendResponse(res, 200, 'GPA fetched successfully.', gpa)
  } catch (error) {
    return sendResponse(res, 500, (error as Error).message)
  }
}

export const getTranscript = async (req: Request, res: Response) => {
  try {
    const transcript = await resultService.getTranscript(String(req.params.studentId))
    return sendResponse(res, 200, 'Transcript fetched successfully.', transcript)
  } catch (error) {
    return sendResponse(res, 404, (error as Error).message)
  }
}

export const deleteResult = async (req: Request, res: Response) => {
  try {
    const result = await resultService.delete(String(req.params.id))
    return sendResponse(res, 200, result.message)
  } catch (error) {
    return sendResponse(res, 400, (error as Error).message)
  }
}
