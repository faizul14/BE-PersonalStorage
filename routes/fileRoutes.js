const express = require('express')
const router = express.Router()
const upload = require('../cloudinary/upload')
const { uploadFile, getFiles, deleteFile } = require('../controllers/fileControllers')


// Storage (sementara lokal)
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, 'uploads/'),
//     filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
// })
// const upload = multer({ storage })

router.post('/upload', upload.single('file'), uploadFile)
router.get('/', getFiles)
router.delete('/:id', deleteFile)

module.exports = router
