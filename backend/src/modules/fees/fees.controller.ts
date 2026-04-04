import type { Request, Response } from 'express'
import { feeService, type CreateFeeRecordData, type FeeStatus } from './fees.service'
import { sendResponse } from '../../utils/response'

export const getStudentFees = async (req: Request, res: Response) => {
  try {
    const fees = await feeService.getByStudent(String(req.params.studentId))
    return sendResponse(res, 200, 'Fees fetched successfully.', fees)
  } catch (error) {
    return sendResponse(res, 500, (error as Error).message)
  }
}

export const getFeeById = async (req: Request, res: Response) => {
  try {
    const fee = await feeService.getById(String(req.params.id))
    return sendResponse(res, 200, 'Fee record fetched successfully.', fee)
  } catch (error) {
    return sendResponse(res, 404, (error as Error).message)
  }
}

export const createFeeRecord = async (req: Request, res: Response) => {
  try {
    const data: CreateFeeRecordData = {
      studentId: req.body.studentId,
      semesterFee: Number(req.body.semesterFee),
      libraryFee: Number(req.body.libraryFee),
      hostFee: req.body.hostFee ? Number(req.body.hostFee) : undefined,
      transportFee: req.body.transportFee ? Number(req.body.transportFee) : undefined,
      description: req.body.description,
    }

    const feeRecord = await feeService.create(data)
    return sendResponse(res, 201, 'Fee record created successfully.', feeRecord)
  } catch (error) {
    return sendResponse(res, 400, (error as Error).message)
  }
}

export const updateFeeStatus = async (req: Request, res: Response) => {
  try {
    const status: FeeStatus = req.body.status
    const fee = await feeService.updateStatus(String(req.params.id), status, req.body.paidAmount)
    return sendResponse(res, 200, 'Fee status updated successfully.', fee)
  } catch (error) {
    return sendResponse(res, 400, (error as Error).message)
  }
}

export const recordFeePayment = async (req: Request, res: Response) => {
  try {
    const fee = await feeService.recordPayment(String(req.params.id), Number(req.body.amount))
    return sendResponse(res, 200, 'Payment recorded successfully.', fee)
  } catch (error) {
    return sendResponse(res, 400, (error as Error).message)
  }
}

export const getAllFees = async (req: Request, res: Response) => {
  try {
    const fees = await feeService.getAll()
    return sendResponse(res, 200, 'Fees fetched successfully.', fees)
  } catch (error) {
    return sendResponse(res, 500, (error as Error).message)
  }
}

export const getFeesByDepartment = async (req: Request, res: Response) => {
  try {
    const fees = await feeService.getByDepartment(String(req.params.departmentId))
    return sendResponse(res, 200, 'Fees fetched successfully.', fees)
  } catch (error) {
    return sendResponse(res, 500, (error as Error).message)
  }
}

export const getFeeStatistics = async (req: Request, res: Response) => {
  try {
    const stats = await feeService.getStatistics()
    return sendResponse(res, 200, 'Statistics fetched successfully.', stats)
  } catch (error) {
    return sendResponse(res, 500, (error as Error).message)
  }
}

export const deleteFee = async (req: Request, res: Response) => {
  try {
    const result = await feeService.delete(String(req.params.id))
    return sendResponse(res, 200, result.message)
  } catch (error) {
    return sendResponse(res, 400, (error as Error).message)
  }
}
