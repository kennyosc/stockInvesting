const { validationResult } = require('express-validator')

exports.successService = (status, data) => {
    return {
        status,
        data
    }
}

exports.errorService = (status, message) => {
    return {
        status,
        message
    }
}

exports.validatorErrors = (req) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return `${errors.array()[0].msg}`
    } else {
        return false
    }
}