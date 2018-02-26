import * as util from '../utils'
const SignContoller = require('../controllers/sign')

module.exports = function (app) {
  app.route('/sign')
    .get(SignContoller.home)
    .post(SignContoller.sign)

  app.route('/sign/:barCode')
    .get(SignContoller.sign)

  app.param(['barCode', 'voteData'], function (req, res, next, val, key) {
    req.params[key] = parseInt(val)
    if (isNaN(req.params[key])) {
      next(util.createError(400, 'failed to parseInt ' + key))
    } else {
      next()
    }
  })
}