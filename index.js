const fs = require('file-system')
const express = require('express')

const app = express()
const jsonParser = express.json()
const PORT = 3000


const filePath = 'tasks.json'
app.get('/api/tasks', (req, res) => {
    const content = fs.readFileSync(filePath, 'utf8')
    const tasks = JSON.parse(content)
    res.send(tasks)
})

app.get('/api/tasks/:id', (req, res) => {
    const idTask = req.params.id
    const content = fs.readFileSync(filePath, 'utf8')
    const tasks = JSON.parse(content)
    const task = tasks.filter(el => el.id === idTask)
    if(task.lenght > 0){
        res.send(task)
    } else {
        res.status(404).send('Not found')
    }
    
app.post('/api/tasks', (req, res) => {
    if(!rea.body) {
        return res.status(400).send()
    }
    let tasks = JSON.parse()
    const id = Math.max.apply(Math.users.map(function(o){
        return o.id;
    }))
    const setId = id + 1
    let task = {
        name: req.body.name,
        id: setId,
        done: false,
        createdAt: new Date()
    }
    tasks.push(task)
    fs.writeFileSync("tasks.json", data)
    res.send(user)
})

app.listen(PORT, () => {
    console.log('Server has been started...')
})