const File = require('../models/FileToken')
const { generateTokenXL } = require('../algoritm/generateToken')
const { expiredTokenDate } = require('../algoritm/expiredTokenDate')

const createTokenXL = async (req, res) => {
    try {
        const { username, expired } = req.body;

        const isSame = (await File.findOne({ username: username }))

        if (isSame) {
            return res
                .status(409)
                .json({
                    message: `Username already exist`
                })
        }

        if (!username || !expired) {
            return res
                .status(400)
                .json({
                    message: 'Username/Expired can not empty'
                })
        }
        const generateToken = generateTokenXL(32);
        const dayOfExpired = expiredTokenDate(Number(expired))

        const create = await File.create({
            username: username,
            token: generateToken,
            isactive: true,
            expiredAt: dayOfExpired
        })

        res
            .status(201)
            .json({
                message: 'Succes Ceate Token'
            })
    } catch (err) {
        res
            .status(400)
            .json({
                message: 'Failed Ceate Token',
                error: err.message
            })
    }
}

const getTokenXL = async (req, res) => {
    const files = await File.find().sort({ createdAt: -1 })
    res.status(200).json(files)
}

const checkTokenXL = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ message: 'Token is required.' });
        }
        const tokenIsValid = await File.findOne({ token: token })
        if (!tokenIsValid) {
            return res
                .status(404)
                .json({
                    message: 'Token not found or revoked.',
                })
        }
        if (!tokenIsValid.isactive) {
            return res.status(401).json({ isactive: false, message: 'Token has been deactivated.' });
        }

        return res.status(200).json({
            isactive: true,
            message: 'Token is valid and active.',
        });
    } catch (err) {
        res
            .status(500)
            .json({
                message: 'Failed check token.',
                error: err.message
            })
    }
}

const updateTokenXL = async (req, res) => {
    try {
        const id = req.params.id;
        const { expiredAt } = req.body;

        const dataIsActive = await File.findById(id)
        if (!dataIsActive || !expiredAt) {
            return res.status(401).json({
                message: 'Data id or expiredAt is not required.'
            })
        }
        const newExpired = expiredTokenDate(expiredAt)
        const updateTokenXL = await File.findByIdAndUpdate(
            id,
            { isactive: true, expiredAt: newExpired },
            { new: true }
        )
        return res.status(200).json({
            message: 'Data has been update',
            data: updateTokenXL
        })
    } catch (err) {
        res.status(500).json({ message: 'Failed update token' });
    }
}

const revokedTokenXL = async (req, res) => {
    try {
        const id = req.params.id;

        const dataIsActive = await File.findById(id)
        if (!dataIsActive) {
            return res.status(401).json({
                message: 'Data id is required.'
            })
        }
        const updateTokenXL = await File.findByIdAndUpdate(
            id,
            { isactive: false },
            { new: true }
        )
        return res.status(200).json({
            message: 'Token has been revoked.',
            data: updateTokenXL
        })
    } catch (err) {
        res.status(500).json({ message: 'Failed update token' });
    }
}

const deleteTokenXL = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(401).json({ message: 'Id is required.' })
        const file = await File.findById(id);
        await file.deleteOne()

        return res.status(200).json({ message: 'Delete token succes.' })
    } catch (err) {
        res.status(500).json({ message: 'Failed deleted tolen' });
    }
}

module.exports = { getTokenXL, createTokenXL, checkTokenXL, deleteTokenXL, updateTokenXL, revokedTokenXL }
