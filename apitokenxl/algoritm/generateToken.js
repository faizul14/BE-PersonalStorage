const crypto = require('crypto');

function generateTokenXL(length) {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

function generateTokenCustomXL(uixToken, length) {
    const generateToken = crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
    const uinxTokenFix = uixToken.replaceAll(" ", "")
    return `${uinxTokenFix}-${generateToken}`
}

module.exports = { generateTokenXL, generateTokenCustomXL }