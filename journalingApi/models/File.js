const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    filename: String,
    originalName: String,
    size: Number,
    mimeType: String,
    url: String,
    public_id: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Personalstorage', fileSchema, 'personalstorage')
