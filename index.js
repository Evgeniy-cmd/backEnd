import expess from 'express'

const app = expess()
const PORT = 3000

app.get('/', (req, res) => {
    res.send('blblblblblb')
})

app.listen(PORT, () => {
    console.log('Server has been started...')
})