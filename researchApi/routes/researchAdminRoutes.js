const express = require('express')
const router = express.Router()
const { getAdminResearch, createResearch, updateResearch, deleteResearch } = require('../controllers/researchControllers')
const upload = require('../cloudinary/researchUpload')

router.get('/', getAdminResearch)
router.post('/', upload.single('file'), createResearch)
router.put('/:id', upload.single('file'), updateResearch)
router.delete('/:id', deleteResearch)

module.exports = router
