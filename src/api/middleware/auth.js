require('dotenv/config')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const auth = req.header('Authorization').split(" ")[1]
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