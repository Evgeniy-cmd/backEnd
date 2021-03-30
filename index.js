// const fs = require('file-system')
const express = require('express')
// const { v4: uuidv4 } = require('uuid')
// const { body, validationResult } = require('express-validator')
const app = express()
// const jsonParser = express.json()
const PORT = 3000
// const filePath = 'tasks.json'

// let uuid = uuidv4()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/tasks", require('./methods/get.tasks'));
app.use("/api/tasks", require('./methods/post.task'));

app.use("/api/tasks", require('./methods/patch.task'));
app.use("/api/tasks", require('./methods/get.task'));
app.use("/api/tasks", require('./methods/del.task'));


app.listen(PORT, () => {
    console.log('Server has been started...')
})
