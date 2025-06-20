const express = require('express')
const router = express.Router()
const upload = require('../cloudinary/upload')
const { uploadFile, getFiles, deleteFile } = require('../controllers/fileControllers')

router.get('/', getFiles)
router.delete('/:id', deleteFile)

module.exports = router
