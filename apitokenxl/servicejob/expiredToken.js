const cron = require('node-cron');
const File = require('../models/FileToken')

function scheduleTokenExpiry() {
    cron.schedule('0 0 * * *', async () => {
        console.log("🕛 [CRON] Cek token expired...");

        const now = new Date;

        try {
            const expiredToken = await File.updateMany(
                { expiredAt: { $lte: now }, isactive: true },
                { $set: { isactive: false } }
            )
            console.log(`✅ Token dinonaktifkan: ${expiredToken.modifiedCount}`);
        } catch (err) {
            console.error("❌ Cron error:", err.message);
        }
    })
}

module.exports = { scheduleTokenExpiry };