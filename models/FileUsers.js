const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    username: String,
    password: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', fileSchema, 'user')
