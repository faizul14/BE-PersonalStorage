const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    author: String,
    emotional: String,
    tittle: String,
    keyword: String,
    phonetic: String, //need checking spelling
    content: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Journalingstorage', fileSchema, 'journalingstorage')
