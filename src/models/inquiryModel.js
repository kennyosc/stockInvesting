const mongoose = require('mongoose')

const inquirySchema = new mongoose.Schema({
    kodePerusahaan: String,
    outstandingStock: Number,
    equity: Number,
    liability: Number,
    netProfit: Number,
    price: Number,
    financialDate: Date,
    bookValue: Number,
    marketCap: Number,
    eps: Number,
    roe: Number,
    pbv: Number,
    per: Number,
    der: Number,
    prediction: {
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
        marginOfSafety: Number
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        index: true
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Inquiry', inquirySchema, 'inquiries')