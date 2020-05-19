const response = require('../globalHelper/globalHelper')
const Inquiry = require('../models/inquiryModel')
const helper = require('../globalHelper/epsCalculation')
const epsCalculator = require('epscalculator')

exports.createInquiry = (inquiryData) => {
    try {
        const newInquiry = new Inquiry()
        newInquiry.kodePerusahaan = inquiryData.kodePerusahaan
        newInquiry.outstandingStock = inquiryData.outstandingStock
        newInquiry.equity = inquiryData.equity
        newInquiry.liability = inquiryData.liability
        newInquiry.netProfit = inquiryData.netProfit
        newInquiry.price = inquiryData.price
        newInquiry.financialDate = inquiryData.financialDate
        const bookValue = inquiryData.equity / inquiryData.outstandingStock
        newInquiry.bookValue = bookValue
        newInquiry.marketCap = inquiryData.outstandingStock * inquiryData.price
        const eps = inquiryData.netProfit / inquiryData.outstandingStock
        newInquiry.eps = eps

        let roeDateCalculation
        let perDateCalculation
        if (inquiryData.financialDate.includes('09')) {
            roeDateCalculation = 4 / 3
            perDateCalculation = 3 / 4
        } else if (inquiryData.financialDate.includes('06')) {
            roeDateCalculation = 2
            perDateCalculation = 1 / 2
        } else if (inquiryData.financialDate.includes('03')) {
            roeDateCalculation = 4
            perDateCalculation = 1 / 4
        }
        newInquiry.roe = inquiryData.netProfit / inquiryData.equity * 100 * roeDateCalculation
        newInquiry.pbv = newInquiry.marketCap / inquiryData.equity
        newInquiry.per = inquiryData.price / newInquiry.eps * perDateCalculation
        newInquiry.der = inquiryData.liability / inquiryData.equity

        const calcEps = epsCalculator.epsPrediction(inquiryData.financialDate, eps, inquiryData.cagr)
        const totalEpsInflation = calcEps.totalEps - (calcEps.totalEps * (inquiryData.inflation / 100))
        const intrinsicValue = totalEpsInflation + bookValue
        const predict = {
            inflation: inquiryData.inflation,
            cagr: inquiryData.cagr,
            percentageMos: inquiryData.percentageMos,
            // const calcEps : helper.epsPrediction(inquiryData.financialDate, eps, inquiryData.cagr)
            calculatedEps: calcEps.arr,
            totalEps: calcEps.totalEps,
            totalEpsInflation: totalEpsInflation,
            intrinsicValue: intrinsicValue,
            marginOfSafety: intrinsicValue * (1 - (inquiryData.percentageMos / 100)),
        }
        newInquiry.prediction = predict
        // await newInquiry.save()

        return response.successService(true, newInquiry)
    } catch (err) {
        return response.errorService(false, err.message)
    }
}