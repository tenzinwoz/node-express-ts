import joi from 'joi'
import { IRegisterRequestBody } from '../types/userTypes'

export const validateRegisterBody = joi.object<IRegisterRequestBody, true>({
    name: joi.string().min(2).max(72).trim().required(),
    emailAddress: joi.string().email().required(),
    phoneNumber: joi.string().min(4).max(20).required(),
    password: joi.string().min(8).max(24).trim().required(),
    consent: joi.boolean().valid(true).required()
})

export const validateJoiSchema = <T>(schema: joi.Schema, value: unknown) => {
    const result = schema.validate(value)
    return {
        value: result.value as T,
        error: result.error
    }
}

