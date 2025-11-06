require('dotenv').config()
const app = require('./app')
const mongoose = require('mongoose')
const { scheduleTokenExpiry } = require('./apitokenxl/servicejob/expiredToken')

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        scheduleTokenExpiry(); // job
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
        // 🧠 Monitoring memory usage (optional)
        setInterval(() => {
            const used = process.memoryUsage();
            console.log(`[MEMORY] Heap: ${(used.heapUsed / 1024 / 1024).toFixed(2)} MB`);
        }, 3600000); // 60000 i menit
    })
    .catch(err => console.error(err))
