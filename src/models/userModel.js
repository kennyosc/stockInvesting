const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    noKtp: String,
    noNpwp: String,
    alamat: String,
    kecamatan: String,
    kelurahan: String,
    kodePos: String,
    noHandphone: String,
    jenisKelamin: String,
    verification: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema, 'users')