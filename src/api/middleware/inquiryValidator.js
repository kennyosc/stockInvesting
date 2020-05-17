const { body } = require('express-validator')

exports.validate = (method) => {
    try {
        switch (method) {
            case 'inquiry': {
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
                ]
            }
        }
    } catch (err) {
        return next(err)
    }
}