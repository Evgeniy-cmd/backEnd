const express = require('express')
const Router = express.Router()
const { Task } = require('../models')
const limitOfTasks = 5


const router = Router.get('/task',
    async (req, res) => {
        const param = {
            where: {},
            order: [],
            offset: (req.query.page - 1) * limitOfTasks,
            limit: limitOfTasks
        }
        console.log(req.query)
        if (req.query.done)
            param.where = { done: req.query.done }
        if (req.query.order)
            param.order.push(['createdAt', `${req.query.order}`])
        const task = await Task.findAndCountAll(param)
        res.send(task)
    })

module.exports = router