const fs = require('file-system')
const express = require('express')
const Router = express.Router()

const filePath = 'tasks.json'

const router = Router.get('/', (req, res) => {
    const content = fs.readFileSync(filePath, 'utf8')
    const tasks = JSON.parse(content)
    res.send(tasks)
    if(tasks.length > 0) return res.send(tasks)
    res.status(404).send("Task not found")
})

module.exports = router