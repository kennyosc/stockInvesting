const express = require('express')
const Router = express.Router()
const inquiry = require('../../controller/inquiryController')
const middleware = require('../middleware/inquiryValidator')

Router
    .post('/inquiry', middleware.validate('inquiry'), inquiry.stockInquiry)

module.exports = Router