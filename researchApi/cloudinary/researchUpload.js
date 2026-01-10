const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary = require('../../cloudinary/cloudinary')

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'research_papers',
        resource_type: 'raw',
    },
})

const upload = multer({ storage })

module.exports = upload
