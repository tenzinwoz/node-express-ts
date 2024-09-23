import { NextFunction, Request, Response } from 'express'
import httpResponse from '../utils/httpResponse'
import responseMessage from '../constant/responseMessage'
import httpError from '../utils/httpError'
import { IRegisterRequestBody, IUser } from '../types/userTypes'
import { validateJoiSchema, validateRegisterBody } from '../service/validationService'
import quicker from '../utils/quicker'
import userService from '../service/userService'
import { EUserRole } from '../constant/userConstant'
import emailService from '../service/emailService'
import logger from '../utils/logger'

interface IRegisterRequest extends Request {
    body: IRegisterRequestBody
}
export default {
    register: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { body } = req as IRegisterRequest

            const { error, value } = validateJoiSchema<IRegisterRequestBody>(validateRegisterBody, body)
            if (error) {
                return httpError(next, error, req, 422)
            }

            const { phoneNumber, emailAddress, password, name, consent } = value

            const { countryCode, internationalNumber, isoCode } = quicker.parsePhoneNumber('+' + phoneNumber)
            if (!countryCode || !internationalNumber || !isoCode) {
                return httpError(next, new Error(responseMessage.INVALID_PHONE_NUMVBER), req, 422)
            }
            const timezone = quicker.countryTimezone(isoCode)
            if (!timezone || timezone.length === 0) {
                return httpError(next, new Error(responseMessage.INVALID_PHONE_NUMVBER), req, 422)
            }

            const user = await userService.findUserByEmailAddress(emailAddress)
            if (user) {
                return httpError(next, new Error(responseMessage.ALREADY_EXIST('user', emailAddress)), req, 409)
            }

            const encryptedPassword = await quicker.hashPassword(password)

            const token = quicker.generateRandomId()
            const code = quicker.generateOtp(6)

            const payload: IUser = {
                name,
                emailAddress,
                phoneNumber: {
                    countryCode,
                    internationalNumber,
                    isoCode
                },
                accountConfirmation: {
                    status: false,
                    token,
                    code,
                    timestamp: null
                },
                passwordReset: {
                    token: null,
                    expiry: null,
                    lastResetAt: null
                },
                lastLoginAt: null,
                role: EUserRole.USER,
                timezone: timezone[0].name,
                password: encryptedPassword,
                consent
            }
            const newUser = await userService.registerUser(payload)

            const confirmationUrl = `${process.env.FRONTEND_URL}/confirmation/${token}?code=${code}`
            const to = [emailAddress]
            const subject = 'Confirm your account'
            const text = `Hey ${name},\n\nPlease confirm your account by clicking the link below:\n\n${confirmationUrl}\n\nThanks!`

            emailService.sendEmail(to, subject, text).catch((error) => {
                logger.error('EMAIL_SERVICE', {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    meta: error
                })
            })

            httpResponse(req, res, 201, responseMessage.SUCCESS, { _id: newUser._id })
        } catch (error) {
            httpError(next, error, req, 500)
        }
    }
}

