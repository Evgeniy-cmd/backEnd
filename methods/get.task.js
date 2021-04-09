const express = require('express')
const Router = express.Router()
const { Task } = require('../models')


const router = Router.get('/task/:id', (req, res) => {
    const taskId = req.params.id
    const task = Task.findAll({ where: { uuid: taskId } })
    res.send(task)
})

module.exports = router