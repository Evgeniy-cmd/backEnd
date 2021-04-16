const { Task } = require('../models')
const express = require('express')
const { body, validationResult } = require('express-validator')
const jwt_decode = require('jwt-decode')
const { auth } = require('../authorization')
const Router = express.Router()


const router = Router.post('/task', auth,
    body('name').isString(),
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty) {
            return res.status(400).json({ errors: errors.array() })
        }
        
        const token = req.headers.token

        const decodeToken = jwt_decode(token)

        const checkName = await Task.findOne({ where: { 
            name: req.body.name,
            userId: decodeToken.uuid
         } })
        if (checkName) {
            return res.status(400).send('Task already exist')
        }
        const task = await Task.create({ 
            name: req.body.name, 
            userId: decodeToken.uuid
         })
        res.send({ task })
    })

module.exports = router