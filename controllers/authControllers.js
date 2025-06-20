const File = require('../models/FileUsers')
const { decrypt, bcryptCompare } = require('../algoritm/algoritm')
const { generateJwt, verifyJwt } = require('../middleware/authMiddleware')

const createUsers = async (req, res) => {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            return res.status(400).json({ message: 'Username dan password wajib diisi' })
        }

        const checkIsExist = await File.findOne({ 'username': username })
        if (checkIsExist) return res.status(400).json({
            message: 'Username already exist'
        })

        const passDcrypt = await decrypt(password)

        const signUp = await File.create({
            username: username,
            password: passDcrypt,
        })

        res.status(201).json({
            message: 'SignUp succesful'
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'SignUp failed' })
    }
}

const loginUsers = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({
            message: 'Username dan password wajib diisi'
        })
    }

    const users = await File.findOne({ username })

    if (!users) {
        return res.status(404).json({
            message: 'Username not found'
        })
    }

    const isValid = await bcryptCompare(password, users.password)
    if (!isValid) return res.status(401).json({
        message: 'Password salah'
    })

    const generateToken = generateJwt(users)
    return res.status(201).json({
        message: 'Login Succes',
        token: generateToken
    }
    )
}

const getFiles = async (req, res) => {
    const files = await File.find().sort({ createdAt: -1 })
    res.json(files)
}


module.exports = { createUsers, loginUsers }
