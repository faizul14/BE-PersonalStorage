const express = require('express')
const router = express.Router()
const { getActivityLogs } = require('../controllers/activityLogControllers')

router.get('/', getActivityLogs)

module.exports = router
