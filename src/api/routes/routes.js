const inquiryRoutes = require('./inquiryRoutes')
const authRoutes = require('./authRoutes')

module.exports = (app) => {
    app.use('/stock', inquiryRoutes)
    app.use('/auth', authRoutes)
}