const express = require('express')
const Router = express.Router()
const inquiry = require('../../controller/inquiryController')
const middleware = require('../middleware/validator')

Router
    .post('/inquiry', middleware.validate('inquiry'), inquiry.stockInquiry)
    .get('/list', inquiry.inquiryList)

module.exports = Router