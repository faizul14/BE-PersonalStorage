const express = require('express')
const cors = require('cors')
const fileRoutes = require('./routes/fileRoutes')

const app = express()

app.use(cors())
app.use(express.json())

// ✅ Test route
app.get('/', (req, res) => {
    res.send('Welcome to Faezol\'s File Storage API 🚀')
})

app.use('/api/files', fileRoutes)

module.exports = app
