const HomeContoller = require('../controllers/home')

module.exports = function (app) {
  app.route('/').get(HomeContoller.home)

  app.route('/import_').get(HomeContoller.import)
}