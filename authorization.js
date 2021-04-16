const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

module.exports.auth= (req, res, next) =>{
    try {
    const token = req.headers.token

    if (!token) return res.status(404).send('Access denied')
    let tokenData
        tokenData = jwt.verify(token, process.env.TOKEN_SECRET);
        res.locals.userId = tokenData.uuid
next()
    } catch (e) {
        return res.status(401).send('Invalid token')
    }
}
