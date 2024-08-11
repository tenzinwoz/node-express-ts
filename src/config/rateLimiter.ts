import { Connection } from 'mongoose'
import { RateLimiterMongo } from 'rate-limiter-flexible'

const DURATION = 60 // per 60 second by
const POINTS = 5 // 5 requests

export let rateLimiterMongo: null | RateLimiterMongo = null
export const initRateLimiter = (mongooseConnection: Connection) => {
    rateLimiterMongo = new RateLimiterMongo({
        storeClient: mongooseConnection,
        points: POINTS,
        duration: DURATION
    })
}

