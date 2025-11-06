const express = require('express')
const router = express.Router()
const { checkTokenXL, publiccheckTokenXL } = require('../controllers/tokenControllers')



router.post('/checktoken', checkTokenXL)
router.post('/publicchecktoken', publiccheckTokenXL)

module.exports = router
