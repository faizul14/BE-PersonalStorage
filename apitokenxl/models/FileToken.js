const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    username: String,
    token: String,
    isactive: Boolean,
    transactionslimit: {
        type: Number,
        default: 0
    },
    expiredAt: {
        type: Date,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('tokenxl', fileSchema, 'tokenxl')