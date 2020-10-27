const mongoose = require('mongoose')
let inquirySchema = require('../models/inquiryModel')

//CRUD
inquirySchema.statics = {
    create: async function (data, cb) {
        const inquiry = new this(data)
        await inquiry.save(cb)
        return inquiry
    },

    documentGet: function (query, cb) {
        return this.find(query, cb)
    },

    leanGet: function (query, cb) {
        return this.find(query, cb).lean()
    },
    
    filter: function (query, cb) {
        return this.aggregate(query, cb)
    },

    updateOne: function (query, updateData, cb) {
        return this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb)
    },

    delete: function (query, cb) {
        return this.findOneAndDelete(query, cb)
    }
}

module.exports = mongoose.model('Inquiry', inquirySchema, 'inquiries')