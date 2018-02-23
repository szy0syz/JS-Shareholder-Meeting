import express from 'express'
// import winston    from 'winston'

const app = express()
app.use(express.static('./public'))
app.set('view engine', 'pug')
app.set('views', './views')

app.use((err, req, res, next) => {
  res.send('找不到此路由')
})

export default app
