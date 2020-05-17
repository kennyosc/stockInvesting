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
