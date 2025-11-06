const express = require('express')
const router = express.Router()
const { checkTokenXL } = require('../controllers/tokenControllers')



router.post('/checktoken', checkTokenXL)

module.exports = router
