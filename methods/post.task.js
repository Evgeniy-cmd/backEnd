const fs = require('file-system')
const express = require('express')
const Router = express.Router()
const jsonParser = express.json()
const filePath = 'tasks.json'
const { v4: uuidv4 } = require('uuid')
let uuid = uuidv4()
const { body, validationResult } = require('express-validator')

const router = Router.post('/', jsonParser, body('name').optional().isString(),
body('done').optional().isBoolean(), (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send('Invalid field in request');
    }


    const content = fs.readFileSync(filePath, 'utf8')
    const tasks = JSON.parse(content)
    const el = {
        uuid: uuid,
        createdAt: new Date(),
        done: false,
        name: req.body.name
    }

    tasks.push(el)    
    fs.writeFileSync("tasks.json", JSON.stringify(tasks))
    res.send(el)
})


module.exports = router