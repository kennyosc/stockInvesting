const authService = require('../services/authServices')
const { validatorErrors } = require('../globalHelper/globalHelper')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
require('dotenv/config')

exports.registerUser = async (req, res) => {
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
        const updateUser = await authService.updateUser(req.body)
        if (updateUser.status === false) return res.status(500).json({ message: updateUser.message })

        return res.status(200).json({ message: 'User updated' })

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

exports.userLogin = async (req, res) => {
    try {
        const errors = validatorErrors(req)
        if (errors) return res.status(400).json({ message: errors })

        let user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(400).json({ message: 'User not found' })
        
        const isPasswordValid = await authService.validatePassword(req.body.password, user.password)
        if (isPasswordValid.status === false) return res.status(400).json({ message: isPasswordValid.message })
        
        const token = jwt.sign({ _id: user._id }, process.env.secretAuth, { expiresIn: '1h' })

        // req.session.token = token
        // console.log(req.session)

        const selectedUserData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            verification: user.verification
        }

        return res.status(200).json({ message: 'Login successful', auth: token, user: selectedUserData })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: err.message })
    }
}

exports.userSession = async (req, res) => {
    // try {
    //     const sessionAuth = req.session.token ? req.session.token : null
    //     // console.log(req.session)
    //     return res.status(200).json({
    //         auth: sessionAuth
    //     })

    // } catch (err) {
    //     return res.status(500).json({ message: err.message })
    // }
}