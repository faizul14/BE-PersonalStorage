const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    tittle: String,
    url: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Instrumentstorage', fileSchema, 'instrumentstorage')
