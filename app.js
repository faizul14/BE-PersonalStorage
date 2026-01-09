const express = require('express')
const cors = require('cors')
const fileRoutes = require('./routes/fileRoutes')
const usersRoutes = require('./routes/authRoutes')
const publicRoutes = require('./routes/publicRoutes')
const journalingRoutes = require('./journalingApi/routes/journalingRoutes')
const publicjournalingRoutes = require('./journalingApi/routes/publicjournalingRoutes')
const xltoken = require('./apitokenxl/routes/tokenRoutes')
const publicxltoken = require('./apitokenxl/routes/tokenPublicRoutes')
const xlinformation = require('./apitokenxl/routes/informationRoutes')
const publicxlinformation = require('./apitokenxl/routes/informationPublicRoutes')
const researchPublicRoutes = require('./researchApi/routes/researchPublicRoutes')
const researchAdminRoutes = require('./researchApi/routes/researchAdminRoutes')
const { authPermisionMiddleware } = require('./middleware/authMiddleware')

const app = express()

app.use(cors())
app.use(express.json())

// ✅ Test route
app.get('/', (req, res) => {
    res.send('Welcome to Faezol\'s Service API 🚀')
})

// 🚀 Api for personal storage
app.use('/auth', usersRoutes)
app.use('/api/files', authPermisionMiddleware, fileRoutes)
app.use('/api/public/files', publicRoutes)


// 🚀 Api for journaling
app.use('/api/public/journaling', publicjournalingRoutes)
app.use('/api/journaling', authPermisionMiddleware, journalingRoutes)

// 🚀 Api for xl terminal
app.use('/api/xltoken', authPermisionMiddleware, xltoken)
app.use('/api/public/xltoken', publicxltoken)
app.use('/api/xlinformation', authPermisionMiddleware, xlinformation)
app.use('/api/public/xlinformation', publicxlinformation)

// 🚀 Api for research
app.use('/api/v1', researchPublicRoutes)
app.use('/api/v1/admin/research', authPermisionMiddleware, researchAdminRoutes)

module.exports = app
