import express from './config/express'
let config = require('./config')
console.log(config)
const app = express


app.listen(config.port, () => {
  console.log('Server started ', 'listening on port: ', config.port)
})
