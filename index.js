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
    const task = tasks.filter(el => el.id === Number(idTask))
    if(task.length > 0){
        res.send(task)
        console.log(task)
    } else {
        res.status(404).send('Not found')
    }})
    
app.post('/api/tasks', (req, res) => {
    if(!req.body) {
        return res.status(400).send()
    }
    let tasks = JSON.parse()
    const id = Math.floor(Math.random()*1000000000000000)
    
    let task = {
        name: req.body.name,
        uuid: id,
        done: false,
        createdAt: new Date()
    }
    tasks.push(task)
    fs.writeFileSync("tasks.json", data)
    res.send(user)
})

app.delete('/api/tasks/:id', (req, res) => {
    const idTask = req.params.id
    let content = fs.readFileSync(filePath, 'utf8')
    let tasks = JSON.parse(content)
    let index = -1
    for(let i = 0; i < tasks.lenght; i++){
        if(tasks[i].id == idTask){
            index = i
            break
        }
    }
    if(index > -1){
        const task = tasks.splice(index, 1)[0]
        content = JSON.stringify(tasks)
        fs.writeFileSync('tasks.json', content)
        res.send(task)
    } else {
        res.status(404).send('Not Found')
    }
})

app.patch('/api/tasks/:id', (req, res) => {
    if(!req.body) return res.status(404).send('Not Found')

    const idTask = req.params.id
    const content = fs.readFileSync(filePath, 'utf8')
    const tasks = JSON.parse(content) 
    const newTask = content.find(el => el.id == idTask)
    if(req.body.name !== null) {
        newTask.name = req.body.name
    }
    if(req.body.done !== null) {
        newTask.done = req.body.done
    }
    fs.writeFileSync('tasks.json', content)
    res.send(newTask)
})

app.listen(PORT, () => {
    console.log('Server has been started...')
})
