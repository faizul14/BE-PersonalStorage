const expiredTokenDate = (day) => {
    const expiredAt = new Date(Date.now() + day * 24 * 60 * 60 * 1000)
    return expiredAt
}


module.exports = { expiredTokenDate };