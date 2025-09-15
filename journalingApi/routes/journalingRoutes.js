const express = require('express')
const router = express.Router()
const { createJournaling, getJournaling, deleteJournaling, getJournalingDetail } = require('../controllers/journalingControllers')


router.post('/createfiles', createJournaling)
router.delete('/deletefiles/:id', deleteJournaling)
router.get('/getdetailfiles/:id', getJournalingDetail)
// router.get('/getfiles', getJournaling)
// router.get('/', getJournaling)

module.exports = router
