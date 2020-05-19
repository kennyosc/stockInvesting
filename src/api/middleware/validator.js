const { body, check } = require('express-validator')
const User = require('../../models/userModel')

exports.validate = (method) => {
    try {
        switch (method) {
            case 'inquiry':
                return [
                    body('outstandingStock').exists().isFloat(),
                    body('equity').exists().isFloat(),
                    body('liability').exists().isFloat(),
                    body('netProfit').exists().isFloat(),
                    body('price').exists().isFloat(),
                    body('financialDate').exists(),
                    body('inflation').exists().isFloat(),
                    body('cagr').exists().isFloat(),
                    body('percentageMos').exists().isFloat()
                ];
                break;
            case 'user':
                return [
                    body('name').exists().isAlpha,
                    body('email').exists().custom(async val => {
                        const user = await User.findOne({ email: val.email })
                        if (user) return Promise.reject('Email sudah digunakan')
                    }),
                    body('password').exists(),
                    body('noKtp').optional(),
                    body('noNpwp').optional(),
                    body('alamat').optional(),
                    body('kecamatan').optional(),
                    body('kelurahan').optional(),
                    body('kodePos').optional(),
                    body('noHandphone').exists().isNumeric(),
                    body('jenisKelamin').optional()
                ];
                break;
        }
    } catch (err) {
        return next(err)
    }
}