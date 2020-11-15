const express = require('express')
const cors = require('cors')
const app = express()

const actuatorRoute = require('./routes/actuatorRoute')

app.use(cors())

app.use('/actuator', actuatorRoute)

module.exports = app