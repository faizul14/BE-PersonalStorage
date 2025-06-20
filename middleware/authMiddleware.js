require('dotenv').config()
const jwt = require('jsonwebtoken')
const File = require('../models/FileUsers')



const generateJwt = (users) => {
    const payload = {
        username: users.username,
        password: users.password
    }

    const option = {
        expiresIn: '1d',
    }

    const token = jwt.sign(payload, process.env.SECRET_KEY, option)
    return token
}

const verifyJwt = (token) => {
    try {
        const check = jwt.verify(token, process.env.SECRET_KEY)
        return check
    } catch (error) {
        console.log(`Error in verify token: ${error.message}`)
        return null
    }
}

const authPermisionMiddleware = async (req, res, next) => {
    const token = req.headers.bearer
    if (!token) return res.status(400).json({
        message: 'Can not acces'
    })

    const decodeToken = verifyJwt(token)
    if (decodeToken) {
        const user = await File.findOne({ 'username': decodeToken.username })
        if (!user) return res.status(404).json({
            message: 'User has ben deleted',
        })
        next()
        return
    }

    return res.status(401).json({
        message: 'token invalid'
    })

}
module.exports = { generateJwt, verifyJwt, authPermisionMiddleware }