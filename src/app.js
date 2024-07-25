const cors = require('cors')
const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')
// const morgan = require('morgan')
const apiRoutes = require('./api')
const config = require('./config')
const { SendError } = require('./helpers')
// import path from 'path'
const bodyParser = require('body-parser')

const app = express()

// app.use(
//     morgan(function (tokens, req, res) {
//         return [tokens.method(req, res), tokens.url(req, res), tokens.status(req, res), '-', tokens['response-time'](req, res), 'ms'].join(' ')
//     }),
// )
app.use(helmet())

app.use(cors())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})
app.use(bodyParser.json({ limit: '50mb' }))

// Connect to Mongo DB
mongoose.set('strictQuery', false)
mongoose
    .connect(config.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: '6pm',
    })
    .then(() => {
        // eslint-disable-next-line no-console
        console.log('MongoDB Connected...')
    })
    // eslint-disable-next-line no-console
    .catch(err => console.log('Mongoose error: ', err))

// Routes
app.use(apiRoutes)

// Unmatched routes
app.all('*', (req, res) => SendError.NOT_FOUND(res, 'Ohh you are lost, read the API documentation to find your way back home :)'))

const errorHandler = (err, req, res, _next) => {
    const { status = 500, message = 'Sever error' } = err
    res.status(status).json({ code: status, success: false, message })
}

app.use(errorHandler)

const port = config.PORT
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Test CI/CD. Server runs on the port ${port}. Env : ${process.env.ENV}`))
