
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')
const session = require('express-session')
const routes = require('../api/routes/routes')
require('dotenv/config')

exports.startServer = async () => {
    const app = express()

    app.get('/', (req, res) => {
        res.status(200).json({
            message: 'Success'
        })
    })

    app.use(bodyParser.json())
    app.use(
        bodyParser.urlencoded({
            limit: '50mb',
            parameterLimit: 100000000,
            extended: true
        })
    )
    app.use(session({
        name: process.env.nameSession,
        resave: false,
        saveUninitialized: false,
        secret: process.env.secretSession,
        cookie: {
            maxAge: 1000 * 60 * 60,
            sameSite: true,
            secure: false
        }
    }))
    app.use(morgan('combined'))
    app.use(cors())
    app.use(compression())
    app.use(helmet())
    routes(app)

    const port = process.env.PORT || 3000
    app.listen(port, async (err) => {
        if (err) {
            console.log(err)
            return
        }
        console.log(`Connected to port ${port}`)
    })

    return app
}

