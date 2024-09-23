import mongoose from 'mongoose'
import { IUser } from '../types/userTypes'
import { EUserRole } from '../constant/userConstant'

const userSchema = new mongoose.Schema<IUser>(
    {
        name: {
            type: String,
            minlength: 2,
            maxlength: 72,
            required: true
        },
        emailAddress: {
            type: String,
            unique: true,
            required: true
        },
        phoneNumber: {
            _id: false,
            countryCode: {
                type: String,
                required: true
            },
            internationalNumber: {
                type: String,
                required: true
            },
            isoCode: {
                type: String,
                required: true
            }
        },
        timezone: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        role: {
            type: String,
            default: EUserRole.USER,
            enum: EUserRole,
            required: true
        },
        accountConfirmation: {
            _id: false,
            status: {
                type: Boolean,
                default: false,
                required: true
            },
            token: {
                type: String,
                required: true
            },
            code: {
                type: String,
                required: true
            },
            timestamp: {
                type: Date,
                default: null,
                required: false
            }
        },
        passwordReset: {
            _id: false,
            token: {
                type: String,
                default: null
            },
            expiry: {
                type: Number,
                default: null
            },
            lastResetAt: {
                type: Date,
                default: null
            }
        },
        lastLoginAt: {
            type: Date,
            required: false
        },
        consent: {
            type: Boolean,
            required: true
        }
    },
    { timestamps: true }
)

export default mongoose.model<IUser>('User', userSchema)

