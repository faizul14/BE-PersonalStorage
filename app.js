const express = require('express')
const cors = require('cors')
const fileRoutes = require('./routes/fileRoutes')
const usersRoutes = require('./routes/authRoutes')
const publicRoutes = require('./routes/publicRoutes')
const journalingRoutes = require('./journalingApi/routes/journalingRoutes')
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
app.use('/api/public/files', publicRoutes)

app.use('/api/journaling', journalingRoutes)

module.exports = app
