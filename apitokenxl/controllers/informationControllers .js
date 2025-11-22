const File = require('../models/FileInformation')

const createInformation = async (req, res) => {
    try {
        const { information } = req.body;
        const create = await File.create({
            information: information,
        })
        res
            .status(201)
            .json({
                message: 'Create information succes.'
            })
    } catch (err) {
        res
            .status(400)
            .json({
                message: 'Create information failed.',
                error: err.message
            })
    }
}

const getInformation = async (req, res) => {
    const files = await File.find().sort({ createdAt: -1 })
    res.status(200).json(files)
}

const updateInformation = async (req, res) => {
    try {
        const id = req.params.id;
        const { information } = req.body;

        const dataIsRequired = await File.findById(id)
        if (!dataIsRequired) {
            return res.status(401).json({
                message: 'Data id is not required.'
            })
        }
        const updateInformation = await File.findByIdAndUpdate(
            id,
            { information: information },
            { new: true }
        )
        return res.status(200).json({
            message: 'Update information succes.',
            data: updateInformation
        })
    } catch (err) {
        res.status(500).json({ message: 'Update information failed.' });
    }
}

const deleteInformation = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(401).json({ message: 'Id is required.' })
        const file = await File.findById(id);
        await file.deleteOne()

        return res.status(200).json({ message: 'Delete information succes.' })
    } catch (err) {
        res.status(500).json({ message: 'Delete infromation failed.' });
    }
}

module.exports = { getInformation, createInformation, deleteInformation, updateInformation }
