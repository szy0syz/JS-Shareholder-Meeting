const VoteContoller = require('../controllers/vote')

module.exports = function (app) {
  app.route('/vote').get(VoteContoller.home)
}