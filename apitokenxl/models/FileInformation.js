const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    information: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('informationxl', fileSchema, 'informationxl')