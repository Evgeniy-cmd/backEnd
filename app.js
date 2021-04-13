const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 3000
const morgan = require('morgan')
const klawSync = require('klaw-sync')
const path = require('path')
const cors = require('cors')
const db = require('./models/index')

app.use(cors())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
    );
    next();
  });
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


async function useControllers() {
    const paths = klawSync(`${__dirname}/methods`, {nodir: true});
    let controllersCount = 0;
    paths.forEach( (file) => {
        if (path.basename(file.path)[0] === '_' || path.basename(file.path)[0] === '.') return;
        app.use('/', require(`${file.path}`));
        controllersCount++;
    });

    console.info(`Total controllers: ${controllersCount}`);
};


app.use(express.static('methods'));

useControllers()


app.listen(PORT, () => {
    console.log(`Server has been started on port: ${PORT}`)
})
