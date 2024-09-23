export default {
    SUCCESS: 'The operation was successful',
    SOMETHING_WENT_WRONG: 'Something went wrong',
    NOT_FOUND: (entity: string) => `The ${entity} was not found`,
    TOO_MANY_REQUEST: `Too many requests`,
    INVALID_PHONE_NUMVBER: `Invalid phone number`,
    ALREADY_EXIST: (entity: string, indentifier: string) => {
        return `The ${entity} with ${indentifier} already exist`
    }
}

