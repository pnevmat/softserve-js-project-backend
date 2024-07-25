const yup = require('yup')
const { SendError } = require('../helpers/sendResponse')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validation = schema => {
    return async (req, res, next) => {
        try {
            await schema.validate(req.body)
            return next()
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                return SendError.BAD_REQUEST(res, err.message)
            }
        }
    }
}

module.exports = validation
