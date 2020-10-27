const inquiryService = require('../services/inquiryServices')
// const Inquiry = require('../models/inquiryModel')
const Inquiry = require('../dao/inquiryDao')
const { validatorErrors } = require('../globalHelper/globalHelper')

exports.stockInquiry = async (req, res) => {
    try {
        const errors = validatorErrors(req)
        if (errors) return res.status(400).json({ message: errors })

        const newInquiry = inquiryService.createInquiry(req.body)
        if (newInquiry.status === false) return res.status(400).json({ message: newInquiry.message })

        //save for left to right
        // await Promise.all([newInquiry.data.save()])
        await Promise.all([Inquiry.create(newInquiry.data)])

        const intrinsicValue = newInquiry.data.prediction.intrinsicValue.toLocaleString('IN')
        const mos = newInquiry.data.prediction.marginOfSafety.toLocaleString('IN')
        
        return res.status(200).json({ message: `Inquiry success with an intrinsicValue of ${intrinsicValue} and marginOfSafety of ${mos}` })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: err.message })
    }
}

exports.inquiryList = async (req, res) => {
    try {
        //.lend() - So its usually optimal for GET endpoints and .find() operations that don’t use .save() or virtuals.
        const inquiryList = await Inquiry.find().lean()
        // const inquiryList = await Inquiry.documentGet({ 'per': { $lte: 5 } })
        // const inquiryList = await Inquiry.filter([
        //     { $match: { 'per': { $lte: 5 } } }
        // ])

        // console.log(req.session)
        return res.status(200).json({ data: inquiryList })
        
    } catch (err) {
        return res.status(500).json({ message: err.message })
        // return res.json({ message: err.message })
    }
}