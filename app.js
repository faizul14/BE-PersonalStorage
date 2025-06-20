const express = require('express')
const cors = require('cors')
const fileRoutes = require('./routes/fileRoutes')
const usersRoutes = require('./routes/authRoutes')
const { authPermisionMiddleware } = require('./middleware/authMiddleware')

const app = express()

app.use(cors())
app.use(express.json())

// ✅ Test route
app.get('/', (req, res) => {
    res.send('Welcome to Faezol\'s File Storage API 🚀')
})

app.use('/auth', usersRoutes)
app.use('/api/files', authPermisionMiddleware, fileRoutes)

module.exports = app
