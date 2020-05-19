const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const response = require('../globalHelper/globalHelper')

const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

//when you create, you can let a request to be empty. MongoDB will not create that property
exports.createUser = (userData) => {
    try {
        const newUser = new User()
        newUser.name = userData.name
        newUser.email = userData.email
        newUser.password = encryptPassword(userData.password)
        newUser.noKtp = userData.noKtp
        newUser.noNpwp = userData.noNpwp
        newUser.alamat = userData.alamat
        newUser.kecamatan = userData.kecamatan
        newUser.kelurahan = userData.kelurahan
        newUser.kodePos = userData.kodePos
        newUser.noHandphone = userData.noHandphone
        newUser.jenisKelamin = userData.jenisKelamin

        return response.successService(true, newUser)
    } catch (err) {
        return response.errorService(false, err.message)
    }
}

//when you update, you cannot let a request to be empty. MongoDb will set the existing data property to be empty
//when using findByIdAndUpdate, if it is an empty req, mongoDB will set the existing data property to be null
exports.updateUser = async (userData) => {
    try {
        const user = await User.findById(userData._id)
        if (!user) return response.errorService(false, 'User not found')

        //kalau set property = undefined, maka property di mongoDB akan hilang
        //kalau set property = null, maka value property akan menjadi null
        user.name = userData.name
        user.email = userData.email
        user.noKtp = userData.noKtp ? userData.noKtp : undefined
        user.noNpwp = userData.noNpwp
        user.alamat = userData.alamat
        user.kecamatan = userData.kecamatan
        user.kelurahan = userData.kelurahan
        user.kodePos = userData.kodePos
        user.noHandphone = userData.noHandphone
        user.jenisKelamin = userData.jenisKelamin

        // .save() ada validation ke Schema apakah dari required, enum, min max,
        // if using mongoose, it is better to use .save() than findByIdAndUpdate
        await user.save()

        return response.successService(true, user)

    } catch (err) {
        return response.errorService(false, err.message)
    }
}