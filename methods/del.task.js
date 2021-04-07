const fs = require('file-system')
const express = require('express')
const Router = express.Router()
const filePath = 'tasks.json'

const router = Router.delete('/:id', (req, res) => {
    const taskId = req.params.id;
    const content = fs.readFileSync(filePath, 'utf8')
    const tasks = JSON.parse(content)
    const newTask = tasks.filter(el => el.uuid !== taskId)
    fs.writeFileSync('tasks.json', JSON.stringify(newTask))
    res.send(newTask)
})

module.exports = router