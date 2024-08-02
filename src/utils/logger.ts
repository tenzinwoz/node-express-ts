import { createLogger, format, transports } from 'winston'
import { ConsoleTransportInstance, FileTransportInstance } from 'winston/lib/winston/transports'
import util from 'util'
import { EApplicationEnvironment } from '../constant/application'
import config from '../config/config'
import path from 'path'
import * as sourceMapSupport from 'source-map-support'
import { blue, green, magenta, red, yellow } from 'colorette'
import 'winston-mongodb'
import { MongoDBTransportInstance } from 'winston-mongodb'

// Linking trace support
sourceMapSupport.install()

const colorizedLevel = (level: string): string => {
    switch (level) {
        case 'INFO':
            return blue(level)
        case 'ERROR':
            return red(level)
        case 'WARN':
            return yellow(level)
        default:
            return level
    }
}

const consolelogFormat = format.printf((info) => {
    const {
        timestamp,
        level,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        message,
        meta = {}
    } = info
    const customLevel = colorizedLevel(level.toUpperCase())
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const customTimestamp = green(timestamp as string)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const customMessage = message
    const customMeta = util.inspect(meta, { showHidden: false, depth: null, colors: true })
    const customLog = `${customLevel} [${customTimestamp}] ${customMessage}\n${magenta('META')} ${customMeta}\n`
    return customLog
})

const consoleTransport = (): Array<ConsoleTransportInstance> => {
    if (config.ENV === EApplicationEnvironment.DEVELOPMENT) {
        return [
            new transports.Console({
                level: 'info',
                format: format.combine(format.timestamp(), consolelogFormat)
            })
        ]
    }
    return []
}

const fileLogFormat = format.printf((info) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { timestamp, level, message, meta = {} } = info

    const logMeta: Record<string, unknown> = {}

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    for (const [key, value] of Object.entries(meta)) {
        if (value instanceof Error) {
            logMeta[key] = {
                name: value.name,
                message: value.message,
                trace: value.stack || ''
            }
        } else {
            logMeta[key] = value
        }
    }
    const logData = {
        level: level.toUpperCase(),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        message,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        timestamp,
        meta: logMeta
    }
    return JSON.stringify(logData, null, 4)
})

const fileTransport = (): Array<FileTransportInstance> => {
    return [
        new transports.File({
            filename: path.join(__dirname, '../', '../', 'logs', `${config.ENV}.log`),
            level: 'info',
            format: format.combine(format.timestamp(), fileLogFormat)
        })
    ]
}

const mongodbTransport = (): Array<MongoDBTransportInstance> => {
    return [
        new transports.MongoDB({
            level: 'info',
            db: config.DATABASE_URL as string,
            metaKey: 'meta',
            expireAfterSeconds: 3600 * 24 * 30, // 30 days
            collection: 'application-logs',
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        })
    ]
}

export default createLogger({
    defaultMeta: {
        meta: {}
    },
    transports: [...consoleTransport(), ...mongodbTransport(), ...fileTransport()]
})

