import * as util from '../utils'
const SignContoller = require('../controllers/sign')

module.exports = function (app) {
  app.route('/sign')
    .get(SignContoller.home)
    .post(SignContoller.sign)

  app.route('/sign/:barCode')
    .get(SignContoller.sign)

  app.param('barCode', function (req, res, next, val, key) {
    console.log(val,key)
    req.params[key] = parseInt(val)
    console.log(req.params[key])
    if (isNaN(req.params[key])) {
      next(util.createError(400, 'failed to parseInt ' + key))
    } else {
      console.log('next')
      next()
    }
  })
}