const express = require('express')
const Router = express.Router()
const auth = require('../../controller/authController')
const middleware = require('../middleware/validator')

Router
    .post('/create-user', middleware.validate('user'), auth.createUser)

module.exports = Router