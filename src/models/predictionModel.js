const mongoose = require('mongoose')

const predictionSchema = new mongoose.Schema({
    inflation: Number,
    cagr: Number,
    calculatedEps: [{
        year: Number,
        eps: Number
    }],
    totalEps: Number,
    totalEpsInflation: Number,
    intrinsicValue: Number,
    percentageMos: Number,
    marginOfSafety: Number,
    inquiryId: {
        type: mongoose.Types.ObjectId,
        ref: 'Inquiry'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Prediction', predictionSchema, 'predictions')