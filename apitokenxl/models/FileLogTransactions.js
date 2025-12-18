const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    username: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('logtransactions', fileSchema, 'logtransactions')