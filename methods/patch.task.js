const fs = require('file-system')
const express = require('express')
const Router = express.Router()
const jsonParser = express.json()
const filePath = 'tasks.json'
const { body, validationResult } = require('express-validator')

const router = Router.patch('/:id', jsonParser, body('name').optional().isString(),
body('done').optional().isBoolean(), (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send('Task not created')
    }

    const taskId = req.params.id

    const content = fs.readFileSync(filePath, 'utf8')
    const tasks = JSON.parse(content) 
    const newTask = tasks.map(el => {
        if(el.uuid === Number(taskId)){
            return el = {...el, ...req.body}
        }
        return el
    })
    fs.writeFileSync('tasks.json', content)
    res.send(newTask)
})

module.exports = router