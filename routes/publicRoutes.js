const express = require('express')
const router = express.Router()
const upload = require('../cloudinary/upload')
const { uploadFile} = require('../controllers/fileControllers')


router.post('/upload', upload.single('file'), uploadFile)

module.exports = router
