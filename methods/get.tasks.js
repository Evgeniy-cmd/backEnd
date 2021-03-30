const fs = require('file-system')
const express = require('express')
const Router = express.Router()

const filePath = 'tasks.json'

const router = Router.get('/:id', (req, res) => {
    const taskId = req.params.id
    const content = fs.readFileSync(filePath, 'utf8')
    const tasks = JSON.parse(content)
    const task = tasks.filter(el => el.uuid === Number(taskId))
    if(task.length > 0) return res.send(task)
    res.status(404).send('Task not found')
    })

    module.exports = router