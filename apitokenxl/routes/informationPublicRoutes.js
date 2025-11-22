const express = require('express')
const router = express.Router()
const { getInformation } = require('../controllers/informationControllers ')

router.get('/getinformation', getInformation)

module.exports = router
