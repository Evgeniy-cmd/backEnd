const express = require('express')
const Router = express.Router()
const { Task } = require('../models')
const { body, validationResult } = require('express-validator')

const router = Router.patch('/task/:id',
    body('name').optional().isString(),
    body('done').optional().isBoolean(),
    async (req, res) => {

        const errors = validationResult(req);
        const taskId = req.params.id

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const task = await Task.update({
            name: req.body.name,
            done: req.body.done
        },
            { where: { uuid: taskId } }
        )
        res.send(task)
    })

module.exports = router