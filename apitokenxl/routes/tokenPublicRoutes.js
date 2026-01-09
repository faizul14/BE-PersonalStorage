const express = require('express')
const router = express.Router()
const { checkTokenXL, publiccheckTokenXL, transactionsLimitInvoke, getTokenLogTransactionsByUser } = require('../controllers/tokenControllers')



router.post('/checktoken', checkTokenXL)
router.post('/transactionslimitinvoke', transactionsLimitInvoke)
router.post('/publicchecktoken', publiccheckTokenXL)
router.post('/gettokenlogtransactionsbyuser', getTokenLogTransactionsByUser)

module.exports = router
