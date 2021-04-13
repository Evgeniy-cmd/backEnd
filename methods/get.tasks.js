const express = require('express')
const Router = express.Router()
const { Task } = require('../models')
const { query } = require("express-validator");

const router = Router.get('/task',
    query("page").isNumeric(),
    async (req, res) => {
        const param = {
            where: {},
            order: [],
            offset: req.query.page * 5,
            limit: 5
        }

        if (req.query.done)
            param.where = { done: req.query.done }
        if (req.query.order)
            param.order.push(['createdAt', `${req.query.order}`])
        const task = await Task.findAndCountAll(param)
        res.send(task)
    })

module.exports = router