import express from './config/express'
import database from './middlewares/database'
console.log('~~~~~',database)
const config = require('./config')

const app = express

database(app)

app.listen(config.port, () => {
  console.log('Server started ', 'listening on port: ', config.port)
})
