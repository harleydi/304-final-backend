const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            bufferCommands: false
        })
        console.log('MongoDB Connected...')
    } catch (error) {
        console.error('DB connection error: ', error)
        process.exit(1)
    }
}

module.exports = connectDB