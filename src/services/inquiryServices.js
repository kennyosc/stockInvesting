const response = require('../globalHelper/globalHelper')
const Inquiry = require('../models/inquiryModel')
const Prediction = require('../models/predictionModel')
const helper = require('../globalHelper/epsCalculation')

exports.createInquiry = async (inquiryData) => {
    try {
        const newInquiry = new Inquiry()
        newInquiry.outstandingStock = inquiryData.outstandingStock
        newInquiry.equity = inquiryData.equity
        newInquiry.liability = inquiryData.liability
        newInquiry.netProfit = inquiryData.netProfit
        newInquiry.price = inquiryData.price
        newInquiry.financialDate = inquiryData.financialDate
        newInquiry.bookValue = inquiryData.equity / inquiryData.outstandingStock
        newInquiry.marketCap = inquiryData.outstandingStock * inquiryData.price
        newInquiry.eps = inquiryData.netProfit / inquiryData.outstandingStock

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

        await newInquiry.save()

        return response.successService(true, newInquiry)
    } catch (err) {
        return response.errorService(false, err.message)
    }
}

exports.createPrediction = async (inquiry, data) => {
    try {
        const newPrediction = new Prediction()
        newPrediction.inflation = data.inflation
        newPrediction.cagr = data.cagr
        newPrediction.percentageMos = data.percentageMos
        const calcEps = helper.epsPrediction(inquiry.financialDate, inquiry.eps, data.cagr)
        newPrediction.calculatedEps = calcEps.arr
        newPrediction.totalEps = calcEps.totalEps
        newPrediction.totalEpsInflation = calcEps.totalEps - (calcEps.totalEps * (data.inflation / 100))
        newPrediction.intrinsicValue = newPrediction.totalEpsInflation + inquiry.bookValue
        newPrediction.marginOfSafety = newPrediction.intrinsicValue * (1 - (data.percentageMos / 100))
        newPrediction.inquiryId = inquiry._id
        await newPrediction.save()

        return response.successService(true, newPrediction)
    } catch (err) {
        return response.errorService(false, err.message)
    }
}