import * as nodemailer from 'nodemailer'
import config from '../config/config'

const transporter = nodemailer.createTransport({
    service: config.EMAIL_SERVICE,
    auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASS
    }
})

export default {
    sendEmail: async (to: string[], subject: string, text: string) => {
        try {
            await transporter.sendMail({
                from: 'Tenzin Woeser <tenzin.woeser.work@gmail.com>',
                to,
                subject,
                html: text
            })
        } catch (error) {
            throw error
        }
    }
}

