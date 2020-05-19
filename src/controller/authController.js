const authService = require('../services/authServices')
const { validatorErrors } = require('../globalHelper/globalHelper')

exports.addUser = async (req, res) => {
    try {
        const errors = validatorErrors(req)
        if (errors) return res.status(400).json({ message: errors })

        const newUser = authService.createUser(req.body)
        if (newUser.status === false) return res.status(500).json({ message: newUser.message })
        await newUser.data.save()

        return res.status(200).json({ message: 'User successfully created' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

exports.updateUser = async (req, res) => {
    try {
        console.log(req.body)
        const updateUser = await authService.updateUser(req.body)
        if (updateUser.status === false) return res.status(500).json({ message: updateUser.message })

        return res.status(200).json({ message: 'User updated' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}