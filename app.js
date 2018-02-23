import express from './config/express'
const config = require('./config')
const db = require('./middlewares/database')

const app = express
db.database(app)

app.listen(config.port, () => {
  console.log('Server started,', 'listening on port: ', config.port)
})