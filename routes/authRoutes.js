const express = require('express')
const router = express.Router()
const { createUsers, loginUsers } = require('../controllers/authControllers')


router.post('/signUp', createUsers)
router.post('/login', loginUsers)

module.exports = router
