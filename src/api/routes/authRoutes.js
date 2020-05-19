const express = require('express')
const Router = express.Router()
const auth = require('../../controller/authController')
const middleware = require('../middleware/validator')
const authentication = require('../middleware/auth')

Router
    .post('/register', middleware.validate('user'), auth.registerUser)
    .patch('/update-user', authentication, auth.updateUser)
    .post('/login', middleware.validate('userLogin'), auth.userLogin)

module.exports = Router