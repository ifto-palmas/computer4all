const routes = require('express').Router()
const software = require('./software')
  
routes.use('/software', software)

module.exports = routes
