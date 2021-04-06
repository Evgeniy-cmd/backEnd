const filePath = 'tasks.json'
const { v4: uuidv4 } = require('uuid')
const fs = require('file-system')
const express = require('express')
const { body, validationResult } = require('express-validator')


const Router = express.Router()


const router = Router.post('/', body('name').isString(), function(req,res){
    if(!req.body.name) return res.status(400).send("Dont name task")
    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() })
        }

        const newTask = {
            uuid: uuidv4(), 
            createdAt: new Date(), 
            done: false, 
            name: req.body.name
          }

        if(fs.existsSync(filePath)){
            const content  = fs.readFileSync(filePath, 'utf8')     
            const tasks = JSON.parse(content)
            tasks.push(newTask)

            fs.writeFileSync(filePath, JSON.stringify(tasks), err => {
                if(err){
                     res.send(err)
                }
            }) 
            res.send(newTask)  
        }
        else {
            fs.appendFile(filePath, JSON.stringify([newTask]), function (err) {
                if (err) throw err
                res.send(newTask) 
            })
        }
})

module.exports = router