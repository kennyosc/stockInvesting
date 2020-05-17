const inquiryService = require('../services/inquiryServices')

exports.stockInquiry = async (req, res) => {
    try {
        const newInquiry = await inquiryService.createInquiry(req.body)
        if (newInquiry.status === false) return res.status(400).json({ message: newInquiry.message })

        const newPrediction = await inquiryService.createPrediction(newInquiry.data, req.body)
        if (newPrediction.status === false) return res.status(400).json({ message: newPrediction.message })

        return res.status(200).json({ message: `Inquiry berhasil dengan intrinsicValue sebesar ${newPrediction.data.intrinsicValue} dan marginOfSafety sebesar ${newPrediction.data.marginOfSafety}` })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: err.message })
    }
}