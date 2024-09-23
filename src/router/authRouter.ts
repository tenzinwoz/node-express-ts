import express from 'express'
const router = express.Router()
import authController from '../controller/authController'

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/register', authController.register)

export default router

