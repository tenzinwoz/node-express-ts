import express from 'express'
import healthController from '../controller/healthController'

const router = express.Router()

router.route('/').get(healthController.heatlh)

export default router

