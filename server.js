require('dotenv').config()
const app = require('./app')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    })
    .catch(err => console.error(err))
