import R from 'ramda'
import { resolve } from 'path'
import express from './config/express'
const config = require('./config')

const r = path => resolve(__dirname, path)

const MIDDLEWARES = config.middlewares

class APP {
  constructor() {
    this.app = express
    this.useMiddlewares(this.app)(MIDDLEWARES)
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