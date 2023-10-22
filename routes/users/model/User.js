const mongoose = require('mongoose')
const { v4: uuid } = require('uuid')

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuid
    },
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    email: { 
        type: String, 
        unique: true 
    },
    cases: {
        type: Array,
        ref: 'Case',
        default: []
    }
})

module.exports = mongoose.model("User", userSchema)