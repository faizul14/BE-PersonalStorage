const express = require('express')
const router = express.Router()
const { getAllResearch, getResearchBySlug } = require('../controllers/researchControllers')
const { getPublicCategories } = require('../controllers/categoryControllers')

router.get('/research', getAllResearch)
router.get('/research/:slug', getResearchBySlug)
router.get('/categories', getPublicCategories)

module.exports = router
