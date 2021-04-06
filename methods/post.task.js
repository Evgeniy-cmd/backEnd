const fs = require('file-system')
const express = require('express')
const Router = express.Router()
const jsonParser = express.json()
const filePath = 'tasks.json'
const { v4: uuidv4 } = require('uuid')

const { body, validationResult } = require('express-validator')

const router = Router.post('/', jsonParser, body('name').optional().isString(),
body('done').optional().isBoolean(), (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send('Invalid field in request');
    }

    const el = {
        uuid: uuidv4(),
        createdAt: new Date(),
        done: false,
        name: req.body.name
    }

    if(fs.existsSync(filePath)){
      const content = fs.readFileSync(filePath, 'utf8')
      const tasks = JSON.parse(content)
      const newTask = tasks.push(el)
      fs.writeFileSync(filePath, JSON.stringify(tasks))
      res.send(newTask)
    } else {
      fs.appendFile(filePath, JSON.stringify([newTask]))
      res.send(newTask)
    }
})


module.exports = router