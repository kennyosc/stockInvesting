require('dotenv/config')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const key = req.header('Authorization')
        if (!key) return res.status(401).json({ message: 'Unauthorized' })

        const auth = key.split(" ")[1]
        if (!auth) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const decoded = jwt.verify(auth, process.env.secretAuth)
        req.user = decoded
        console.log(decoded)
        next()

    } catch (err) {
        console.log(err)
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
}