const inquiryRoutes = require('./inquiryRoutes')

module.exports = (app) => {
    app.use('/stock', inquiryRoutes)
}