const mongoose = require('mongoose')

const researchSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true
    },
    description: String,
    category: {
        type: String,
        index: true
    },
    pdf_url: String,
    cloudinary_public_id: String,
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    }
}, { timestamps: true })

module.exports = mongoose.model('Research', researchSchema)
