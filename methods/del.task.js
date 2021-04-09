const express = require('express')
const Router = express.Router()
const { Task } = require('../models')

const router = Router.delete('/task/:id', async (req, res) => {
    const taskId = req.params.id;
    await Task.destroy({ where: { uuid: taskId } })
    res.status(203).send()
})

module.exports = router