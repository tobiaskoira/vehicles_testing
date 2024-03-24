const config = require('./utils/config')
const express = require('express')
const app = express()
const vehicles = require('./routes/vehicles')
const mongoose = require('mongoose')




// static assets
app.use(express.static('./public'))
// parse json
app.use(express.json())

// routes
app.use('/api/vehicles', vehicles)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

module.exports = app
