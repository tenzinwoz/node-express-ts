import { EUserRole } from '../constant/userConstant'

export interface IRegisterRequestBody {
    name: string
    emailAddress: string
    phoneNumber: string
    password: string
    consent: boolean
}

export interface IUser {
    name: string
    emailAddress: string
    phoneNumber: {
        countryCode: string
        internationalNumber: string
        isoCode: string
    }
    timezone: string
    password: string
    role: EUserRole
    accountConfirmation: {
        status: boolean
        token: string
        code: string
        timestamp: Date | null
    }
    passwordReset: {
        token: string | null
        expiry: number | null
        lastResetAt: Date | null
    }
    lastLoginAt: Date | null
    consent: boolean
}

