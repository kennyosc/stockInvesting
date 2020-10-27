const { body, check } = require('express-validator')
const User = require('../../models/userModel')

exports.validate = (method) => {
    try {
        switch (method) {
            case 'inquiry':
                return [
                    body('outstandingStock').exists().isFloat().withMessage('Please insert outstanding stock value'),
                    body('equity').exists().isFloat().withMessage('Please insert equity value'),
                    body('liability').exists().isFloat().withMessage('Please insert liability value'),
                    body('netProfit').exists().isFloat().withMessage('Please insert net profit value'),
                    body('price').exists().isFloat().withMessage('Please insert stock price'),
                    body('financialDate').exists().withMessage('Please insert your financial date'),
                    body('inflation').exists().isFloat().withMessage('Please insert inflation'),
                    body('cagr').exists().isFloat().withMessage('Please insert cagr'),
                    body('percentageMos').exists().isFloat().withMessage('Please insert your % margin of safety')
                ];
                break;

            case 'user':
                return [
                    body('name').exists().withMessage('Please insert your name'),
                    body('email').exists().custom(async val => {
                        const user = await User.findOne({ email: val })
                        if (user) throw new Error('Email already in use')
                    }),
                    body('password').exists().withMessage('Please insert password'),
                    body('noKtp').optional(),
                    body('noNpwp').optional(),
                    body('alamat').optional(),
                    body('kecamatan').optional(),
                    body('kelurahan').optional(),
                    body('kodePos').optional(),
                    body('noHandphone').exists().withMessage('Please insert your phone number').isNumeric().withMessage('Please insert your phone number with only numbers  '),
                    body('jenisKelamin').optional()
                ];
                break;

            case 'userLogin':
                return [
                    body('email').exists().withMessage('Please insert your email'),
                    body('password').exists().withMessage('Please insert your password')
                ]
        }
    } catch (err) {
        return next(err)
    }
}

exports.customValidate = (req, res, next) => {
    try {
        
        const { email, password } = req.body
        if (!email) return res.status(400).json({ message: 'Please insert your email to login' })
        if (!password) return res.status(400).json({ message: 'Please insert your password to login' })

        next()

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}