const HomeContoller = require('../controllers/home')

module.exports = function (app) {
  app.route('/').get(HomeContoller.home)
}