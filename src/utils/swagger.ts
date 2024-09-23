import swaggerjsdoc, { Options } from 'swagger-jsdoc'

const swaggerOptions: Options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Express App',
            description: 'Express app boilerplate',
            contact: {
                name: 'Tenzin Woeser'
            },
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1'
            }
        ]
    },
    apis: ['../router/*.ts']
}

export const swaggerDocs = swaggerjsdoc(swaggerOptions)

