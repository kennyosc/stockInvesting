exports.epsPrediction = (inquiryDate, epsData, cagr) => {
    const arr = []
    const date = new Date(inquiryDate)
    let totalEps = 0
    let tempEps
    let eps

    for (var i = 0; i < 11; i++) {
        if (i === 0) {
            eps = epsData
            tempEps = epsData
        } else {
            eps = (tempEps * parseInt(cagr) / 100) + tempEps
            tempEps = eps
            totalEps += eps
        }
        const calc = {
            year: date.getFullYear() + i,
            eps: eps
        }
        arr.push(calc)
    }
    console.log(arr)
    return { arr, totalEps }
}