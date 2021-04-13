const { Task } = require('../models')
const express = require('express')
const { body, validationResult } = require('express-validator')


const Router = express.Router()


const router = Router.post('/task',
    body('name').isString(),
    async (req, res) => {

        const errors = validationResult(req)
        if (!errors.isEmpty) {
            return res.status(400).json({ errors: errors.array() })
        }

        const checkName = await Task.findOne({ where: { name: req.body.name } })
        if (checkName) {
            return res.status(400).send('Task already exist')
        }
        const task = await Task.create({ name: req.body.name })
        res.send({ task })
    })

module.exports = router