import dotenvFlow from 'dotenv-flow'

dotenvFlow.config()

export default {
    // General
    ENV: process.env.ENV,
    PORT: process.env.PORT,
    SERVER_URL: process.env.SERVER_URL,
    // Database
    DATABASE_URL: process.env.DATABASE_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    EMAIL_SERVICE: process.env.EMAIL_SERVICE,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS
}

