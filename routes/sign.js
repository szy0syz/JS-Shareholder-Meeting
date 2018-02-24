const SignContoller = require('../controllers/sign')

module.exports = function (app) {
  app.route('/sign').get(SignContoller.home)
}