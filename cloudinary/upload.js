const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary = require('./cloudinary')

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'personal_storage', // folder di Cloudinary
        resource_type: 'auto', // biar bisa upload apa saja (jpg, pdf, zip, dll)
    },
})

const upload = multer({ storage })

module.exports = upload
