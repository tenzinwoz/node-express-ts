import express, { Application, NextFunction, Request, Response } from 'express'
import path from 'path'
import router from './router/apiRouter'
import globalErrorHandler from './middleware/globalErrorHandler'
import responseMessage from './constant/responseMessage'
import httpError from './utils/httpError'
import helmet from 'helmet'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { swaggerDocs } from './utils/swagger'

const app: Application = express()

//Middleware
app.use(helmet())
app.use(
    cors({
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
        origin: ['http://localhost:3000'],
        credentials: true
    })
)
app.use(express.json())
app.use(express.static(path.join(__dirname, '../', 'public')))

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use('/api/v1', router)

// 404 Handler
app.use((req: Request, _: Response, next: NextFunction) => {
    try {
        throw new Error(responseMessage.NOT_FOUND('route'))
    } catch (err) {
        httpError(next, err, req, 404)
    }
})

// Gloabl Error Handling
app.use(globalErrorHandler)

export default app

