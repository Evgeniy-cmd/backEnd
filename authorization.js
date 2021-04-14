const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

module.exports = function (req, res, next) {
    const token = req.headers.authorization
    if (!token) return res.status(404).send('Access denied')
    let tokenData
    try {
        tokenData = jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (e) {
        return res.status(401).send('Invalid token')
    }
}
res.locals.userId = tokenData.uuid
next()