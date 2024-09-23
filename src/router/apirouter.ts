import express from 'express'
import healthRouter from './healthRouter'
import authRouter from './authRouter'

const router = express.Router()

router.use('/health', healthRouter)
router.use('/auth', authRouter)

export default router

