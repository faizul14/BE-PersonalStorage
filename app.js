const express = require('express')
const cors = require('cors')
const fileRoutes = require('./routes/fileRoutes')
const usersRoutes = require('./routes/authRoutes')
const publicRoutes = require('./routes/publicRoutes')
const journalingRoutes = require('./journalingApi/routes/journalingRoutes')
const publicjournalingRoutes = require('./journalingApi/routes/publicjournalingRoutes')
const { authPermisionMiddleware } = require('./middleware/authMiddleware')

const app = express()

app.use(cors())
app.use(express.json())

// ✅ Test route
app.get('/', (req, res) => {
    res.send('Welcome to Faezol\'s File Storage API 🚀')
})

// 🚀 Api for personal storage
app.use('/auth', usersRoutes)
app.use('/api/files', authPermisionMiddleware, fileRoutes)
app.use('/api/public/files', publicRoutes)


// 🚀 Api for journaling
app.use('/api/public/journaling', publicjournalingRoutes)
app.use('/api/journaling', authPermisionMiddleware ,journalingRoutes)

module.exports = app
