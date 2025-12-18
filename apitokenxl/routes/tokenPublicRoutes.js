const express = require('express')
const router = express.Router()
const { checkTokenXL, publiccheckTokenXL, transactionsLimitInvoke } = require('../controllers/tokenControllers')



router.post('/checktoken', checkTokenXL)
router.post('/transactionslimitinvoke', transactionsLimitInvoke)
router.post('/publicchecktoken', publiccheckTokenXL)

module.exports = router
