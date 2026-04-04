import { Router } from 'express'
import { prisma } from '../../config/database'
import { authenticate } from '../../middleware/authenticate'
import { authorize } from '../../middleware/authorize'
import { sendResponse } from '../../utils/response'

const router = Router()

// Routes CRUD
router.get('/routes', async (_req, res) => {
  const routes = await prisma.transportRoute.findMany({ include: { students: true, vehicles: true } })
  return sendResponse(res, 200, 'Transport routes fetched.', routes)
})

router.get('/routes/:id', async (req, res) => {
  const route = await prisma.transportRoute.findUnique({
    where: { id: String(req.params.id) },
    include: { students: true, vehicles: true },
  })
  return route ? sendResponse(res, 200, 'Transport route fetched.', route) : sendResponse(res, 404, 'Route not found.')
})

router.post('/routes', authenticate, authorize('ADMIN'), async (req, res) => {
  const route = await prisma.transportRoute.create({
    data: {
      routeName: req.body.routeName,
      stops: req.body.stops ?? [],
      departure: req.body.departure,
      busNumber: req.body.busNumber,
      driver: req.body.driver,
      capacity: Number(req.body.capacity ?? 40),
    },
  })
  return sendResponse(res, 201, 'Transport route created.', route)
})

router.put('/routes/:id', authenticate, authorize('ADMIN'), async (req, res) => {
  const route = await prisma.transportRoute.update({
    where: { id: String(req.params.id) },
    data: req.body,
    include: { students: true, vehicles: true },
  })
  return sendResponse(res, 200, 'Transport route updated.', route)
})

router.delete('/routes/:id', authenticate, authorize('ADMIN'), async (req, res) => {
  await prisma.transportRoute.delete({ where: { id: String(req.params.id) } })
  return sendResponse(res, 200, 'Transport route deleted.')
})

// Vehicles CRUD
router.get('/vehicles', async (_req, res) => {
  const vehicles = await prisma.vehicle.findMany({ include: { route: true, locationLogs: { take: 1, orderBy: { timestamp: 'desc' } } } })
  return sendResponse(res, 200, 'Vehicles fetched.', vehicles)
})

router.post('/vehicles', authenticate, authorize('ADMIN'), async (req, res) => {
  const vehicle = await prisma.vehicle.create({
    data: {
      number: req.body.number,
      driverName: req.body.driverName,
      capacity: Number(req.body.capacity),
      routeId: req.body.routeId,
    },
    include: { route: true }
  })
  return sendResponse(res, 201, 'Vehicle created.', vehicle)
})

router.put('/vehicles/:id', authenticate, authorize('ADMIN'), async (req, res) => {
  const vehicle = await prisma.vehicle.update({
    where: { id: String(req.params.id) },
    data: req.body,
    include: { route: true }
  })
  return sendResponse(res, 200, 'Vehicle updated.', vehicle)
})

router.delete('/vehicles/:id', authenticate, authorize('ADMIN'), async (req, res) => {
  await prisma.vehicle.delete({ where: { id: String(req.params.id) } })
  return sendResponse(res, 200, 'Vehicle deleted.')
})

// Location tracking
router.post('/vehicles/:id/location-log', authenticate, authorize('ADMIN'), async (req, res) => {
  const log = await prisma.locationLog.create({
    data: {
      vehicleId: String(req.params.id),
      latitude: Number(req.body.latitude),
      longitude: Number(req.body.longitude),
    },
    include: { vehicle: true }
  })
  return sendResponse(res, 201, 'Location logged.', log)
})

// Student enroll/unenroll
router.patch('/enroll', authenticate, authorize('ADMIN'), async (req, res) => {
  const student = await prisma.student.update({
    where: { id: req.body.studentId },
    data: { transportRouteId: req.body.routeId },
    include: { transportRoute: true },
  })
  return sendResponse(res, 200, 'Student assigned to route.', student)
})

router.patch('/unenroll/:studentId', authenticate, authorize('ADMIN'), async (req, res) => {
  const student = await prisma.student.update({
    where: { id: String(req.params.studentId) },
    data: { transportRouteId: null },
    include: { transportRoute: true },
  })
  return sendResponse(res, 200, 'Student unenrolled from route.', student)
})

export default router

