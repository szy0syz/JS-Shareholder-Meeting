import R from 'ramda'
import { resolve } from 'path'
import express from './config/express'
const config = require('./config')

// 马上就要改咯~
const db = require('./middlewares/database')

// 合并绝对路径的
const r = path => resolve(__dirname, path)
// 声明需要加载的中间件
const MIDDLEWARES = ['database']

class APP {
  constructor() {
    this.app = express
    db.database(this.app)
  }

  async start() {
    this.app.listen(config.port, () => {
      console.log('Server started,', 'listening on port: ', config.port)
    })
  }
}

const app = new APP()

app.start()