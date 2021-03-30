const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const klawSync = require('klaw-sync')
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


async function useControllers() {
    const paths = klawSync(`${__dirname}/methods`, {nodir: true});
    let controllersCount = 0;
    paths.forEach( (file) => {
        if (path.basename(file.path)[0] === '_' || path.basename(file.path)[0] === '.') return;
        app.use('/api/tasks', require(`${file.path}`));
        controllersCount++;
    });

    console.info(`Total controllers: ${controllersCount}`);
};


app.use(express.static('methods'));

useControllers()


app.listen(PORT, () => {
    console.log('Server has been started...')
})
