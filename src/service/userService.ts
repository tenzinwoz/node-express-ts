import userModel from '../model/userModel'
import { IUser } from '../types/userTypes'

export default {
    findUserByEmailAddress: async (emailAddress: string) => {
        return userModel.findOne({ emailAddress })
    },
    registerUser: async (user: IUser) => {
        return userModel.create(user)
    }
}

