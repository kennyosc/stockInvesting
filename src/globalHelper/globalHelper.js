const { validationResult } = require('express-validator')

class globalHelper {
    static successService(status, data) {
        return {
            status,
            data
        }
    }

    static errorService(status, message) {
        return {
            status,
            messsage
        }
    }

    static validatorErrors(req) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return `${errors.array()[0].msg}`

        return false
    }
}

// module.exports = {
//     globalHelper : globalHelper,
//     // someClass : someClass
// }

module.exports = globalHelper