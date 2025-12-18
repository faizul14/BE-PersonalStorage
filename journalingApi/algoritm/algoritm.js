const bcrypt = require('bcryptjs')

const decrypt = async (pass) => {
    return await bcrypt.hash(pass, 10)
}

const bcryptCompare = async (password, passwordEncrypt) => {
    return await bcrypt.compare(password, passwordEncrypt)
}

module.exports = { decrypt, bcryptCompare }