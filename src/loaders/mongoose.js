const mongoose = require('mongoose')

exports.startMongoose = async () => {
    try {
        const connection = await mongoose.connect('mongodb://127.0.0.1:27017/investingProject', {
            // Menggunakan url parser yang baru
            useNewUrlParser: true,
            // Menggunakan method baru 'CreateIndex' untuk membuat index stiap kali kita input sebuah data
            useCreateIndex: true,
            // Menggunakan method baru untuk proses findOneAndUpdate()
            useFindAndModify: false,
            // Menggunakan engine mongoDB baru
            useUnifiedTopology: true
        })
        console.log('MongoDB database connected successfully')
        return connection
    } catch (err) {
        console.log(err)
        return
    }
}