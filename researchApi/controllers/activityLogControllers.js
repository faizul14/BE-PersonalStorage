const ActivityLog = require('../models/ActivityLog')

// ==========================================
// Helper Function
// ==========================================

// Log activity to database
const logActivity = async (data) => {
    try {
        await ActivityLog.create({
            action: data.action,
            targetType: data.targetType,
            targetId: data.targetId || null,
            targetTitle: data.targetTitle || '',
            userId: data.userId,
            userName: data.userName || 'Admin',
            details: data.details || {},
            ipAddress: data.ipAddress || ''
        })
    } catch (error) {
        // Log error but don't throw - activity logging should not break main operations
        console.error('Failed to log activity:', error.message)
    }
}

// ==========================================
// Admin Controllers
// ==========================================

// Get activity logs with pagination and filtering
const getActivityLogs = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 20,
            action,
            targetType,
            startDate,
            endDate
        } = req.query

        const query = {}

        // Apply filters
        if (action) {
            query.action = action
        }
        if (targetType) {
            query.targetType = targetType
        }
        if (startDate || endDate) {
            query.createdAt = {}
            if (startDate) {
                query.createdAt.$gte = new Date(startDate)
            }
            if (endDate) {
                query.createdAt.$lte = new Date(endDate)
            }
        }

        const skip = (parseInt(page) - 1) * parseInt(limit)

        const [logs, totalDocuments] = await Promise.all([
            ActivityLog.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit)),
            ActivityLog.countDocuments(query)
        ])

        const totalPages = Math.ceil(totalDocuments / parseInt(limit))

        res.status(200).json({
            success: true,
            data: logs,
            pagination: {
                currentPage: parseInt(page),
                totalPages,
                totalDocuments,
                limit: parseInt(limit)
            }
        })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch activity logs', error: error.message })
    }
}

module.exports = {
    logActivity,
    getActivityLogs
}
