const mongoose = require('mongoose')

const ActivityLogSchema = new mongoose.Schema({
    action: {
        type: String,
        required: true,
        enum: ['create', 'update', 'delete', 'login', 'logout']
    },
    targetType: {
        type: String,
        required: true,
        enum: ['research', 'category', 'user', 'auth']
    },
    targetId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    targetTitle: {
        type: String,
        default: ''
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: {
        type: String,
        default: 'Admin'
    },
    details: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    ipAddress: String
}, { timestamps: true })

// Indexes for efficient querying
ActivityLogSchema.index({ createdAt: -1 })
ActivityLogSchema.index({ action: 1 })
ActivityLogSchema.index({ targetType: 1 })

module.exports = mongoose.model('ActivityLog', ActivityLogSchema)
