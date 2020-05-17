const { startServer } = require('./src/loaders/express')
const { startMongoose } = require('./src/loaders/mongoose')

const start = async () => {
    try {
        await startMongoose()
        await startServer()
    } catch (err) {
        console.log(err)
    }
}
start()
