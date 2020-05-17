const mongoose = require('mongoose')

const inquirySchema = new mongoose.Schema({
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
    der: Number
}, {
    timestamps: true
})

module.exports = mongoose.model('Inquiry', inquirySchema, 'inquiries')