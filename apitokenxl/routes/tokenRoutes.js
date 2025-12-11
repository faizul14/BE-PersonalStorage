const express = require('express')
const router = express.Router()
const { getTokenXL, createTokenXL, checkTokenXL, deleteTokenXL, updateTokenXL, revokedTokenXL, createTokenCustomXL } = require('../controllers/tokenControllers')


router.get('/gettoken', getTokenXL)
router.post('/createtoken', createTokenXL)
router.post('/createtokencustom', createTokenCustomXL)
router.post('/checktoken', checkTokenXL)
router.put('/updatetoken/:id', updateTokenXL)
router.put('/revoketoken/:id', revokedTokenXL)
router.delete('/deletetoken/:id', deleteTokenXL)
module.exports = router
