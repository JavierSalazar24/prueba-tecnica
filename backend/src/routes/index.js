import { Router } from 'express'
import { getUnits, addEvents, getReports } from '../controllers/index.js'

const router = Router()

router.get('/units', getUnits)
router.get('/reports/:id', getReports)
router.post('/events/:id', addEvents)

export default router
