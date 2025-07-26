const File = require('../models/FileJournaling')

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

const getJournalingDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const detailJournaling = await File.findOne({ _id: id })
        return res
            .status(200)
            .json(detailJournaling)
    } catch (err) {
        return res
            .status(404)
            .json({
                message: "Journaling not found."
            })
    }
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


module.exports = { createJournaling, getJournaling, deleteJournaling, getJournalingDetail }
