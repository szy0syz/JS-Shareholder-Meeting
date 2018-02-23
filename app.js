import R from 'ramda'
import { resolve } from 'path'
import express from './config/express'
const config = require('./config')

// 马上就要改咯~
// const db = require('./middlewares/database')

// 合并绝对路径的
const r = path => resolve(__dirname, path)
// 声明需要加载的中间件
const MIDDLEWARES = ['database']

class APP {
  constructor() {
    this.app = express
    this.useMiddlewares(this.app)(MIDDLEWARES)
    // db.database(this.app)
  }

  useMiddlewares(app) {
    //原来使用方法：
    //  app.use(mid1)
    //  app.use(mid2)
    //  app.use(mid3)
    return R.map()(R.compose(
      R.map(i => i(app)),
      require,
      i => `${r('./middlewares')}/${i}`
    ))
  }

  async start() {
    this.app.listen(config.port, () => {
      console.log('Server started,', 'listening on port: ', config.port)
    })
  }
}

const app = new APP()

app.start()