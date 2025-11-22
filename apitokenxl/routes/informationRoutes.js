const express = require('express')
const router = express.Router()
const { getInformation, createInformation, deleteInformation, updateInformation } = require('../controllers/informationControllers ')

router.get('/getinformation', getInformation)
router.post('/createinformation', createInformation)
router.put('/updateinformation/:id', updateInformation)
router.delete('/deleteinformation/:id', deleteInformation)
module.exports = router
