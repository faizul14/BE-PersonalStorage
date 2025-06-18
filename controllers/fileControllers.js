const File = require('../models/File')
const cloudinary = require('../cloudinary/cloudinary')

// const uploadFile = async (req, res) => {
//     try {
//         const file = req.file

//         const savedFile = await File.create({
//             filename: file.filename,
//             originalName: file.originalname,
//             size: file.size,
//             mimeType: file.mimetype,
//             url: `uploads/${file.filename}` // nanti ini bisa diganti link CDN
//         })

//         res.status(201).json(savedFile)
//     } catch (err) {
//         res.status(500).json({ message: err.message })
//     }
// }

const uploadFile = async (req, res) => {
    try {
        const file = req.file

        const savedFile = await File.create({
            filename: file.filename,
            originalName: file.originalname,
            size: file.size,
            mimeType: file.mimetype,
            url: file.path, // ini adalah URL public dari Cloudinary
            public_id: file.filename
        })

        res.status(201).json(savedFile)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Upload failed' })
    }
}

const getFiles = async (req, res) => {
    const files = await File.find().sort({ createdAt: -1 })
    res.json(files)
}

const deleteFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.id)

        if (!file) return res.status(404).json({ message: 'File not found' })

        let resourceType = 'image'
        if (file.mimeType.startsWith('video')) {
            resourceType = 'video'
        } else if (!file.mimeType.startsWith('image')) {
            resourceType = 'raw'
        }
        // Hapus dari Cloudinary
        await cloudinary.uploader.destroy(file.public_id, {
            resource_type: resourceType
        })

        // Hapus dari MongoDB
        await file.deleteOne()

        res.status(200).json({ message: 'File deleted successfully' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Delete failed' })
    }
}


module.exports = { uploadFile, getFiles, deleteFile }
