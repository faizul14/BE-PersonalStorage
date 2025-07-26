const File = require('../models/FileJournaling')
// const cloudinary = require('../cloudinary/cloudinary')

// const uploadFile = async (req, res) => {
//     try {
//         const file = req.file

//         const savedFile = await File.create({
//             filename: file.filename,
//             originalName: file.originalname,
//             size: file.size,
//             mimeType: file.mimetype,
//             url: file.path,
//             public_id: file.filename
//         })

//         res.status(201).json(savedFile)
//     } catch (err) {
//         console.error(err)
//         res.status(500).json({ message: 'Upload failed' })
//     }
// }

// const getFiles = async (req, res) => {
//     const files = await File.find().sort({ createdAt: -1 })
//     res.json(files)
// }

// const deleteFile = async (req, res) => {
//     try {
//         const file = await File.findById(req.params.id)

//         if (!file) return res.status(404).json({ message: 'File not found' })

//         let resourceType = 'image'
//         if (file.mimeType.startsWith('video')) {
//             resourceType = 'video'
//         } else if (!file.mimeType.startsWith('image')) {
//             resourceType = 'raw'
//         }
//         // Hapus dari Cloudinary
//         await cloudinary.uploader.destroy(file.public_id, {
//             resource_type: resourceType
//         })

//         // Hapus dari MongoDB
//         await file.deleteOne()

//         res.status(200).json({ message: 'File deleted successfully' })
//     } catch (err) {
//         console.error(err)
//         res.status(500).json({ message: 'Delete failed' })
//     }
// }

// const createUsers = async (req, res) => {
//     try {
//         const { username, password } = req.body

//         if (!username || !password) {
//             return res.status(400).json({ message: 'Username dan password wajib diisi' })
//         }

//         const checkIsExist = await File.findOne({ 'username': username })
//         if (checkIsExist) return res.status(400).json({
//             message: 'Username already exist'
//         })

//         const passDcrypt = await decrypt(password)

//         const signUp = await File.create({
//             username: username,
//             password: passDcrypt,
//         })

//         res.status(201).json({
//             message: 'SignUp succesful'
//         })
//     } catch (err) {
//         console.error(err)
//         res.status(500).json({ message: 'SignUp failed' })
//     }
// }

const createJournaling = async (req, res) => {
    try {
        const { author, emotional, tittle, keyword, content } = req.body;

        if (!tittle || !keyword || !content) {
            return res
                .status(400)
                .json({
                    message: 'Tittle, Keyword, and Content can not empty'
                })
        }
        const create = await File.create({
            author: author,
            emotional: emotional,
            tittle: tittle,
            keyword: keyword,
            phonetic: 'phonetic',
            content: content
        })

        res
            .status(201)
            .json({
                message: 'Succes Ceate Journaling'
            })
    } catch (err) {
        res
            .status(500)
            .json({
                message: 'Failed Ceate Journaling',
                error: err.message
            })
    }
}

const getJournaling = async (req, res) => {
    const files = await File.find().sort({ createdAt: -1 })
    res.status(200).json(files)
}

const deleteJournaling = async (req, res) => {
    try {
        const file = await File.findById(req.params.id)

        if (!file) return res.status(404).json({ message: 'Journaling file not found' })

        // Hapus dari MongoDB
        await file.deleteOne()

        res.status(200).json({ message: 'Journaling deleted successfully' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Journaling delete failed' })
    }
}


module.exports = { createJournaling, getJournaling, deleteJournaling }
