const express = require('express')
const router = express.Router()
// const upload = require('../cloudinary/upload')
const { createJournaling, getJournaling, deleteJournaling} = require('../controllers/journalingControllers')
// const { uploadFile } = require('../controllers/fileControllers')


router.post('/createfiles', createJournaling)
router.delete('/deletefiles/:id', deleteJournaling)
router.get('/getfiles', getJournaling)
router.get('/', getJournaling)

module.exports = router
