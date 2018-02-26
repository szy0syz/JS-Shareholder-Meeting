const VoteContoller = require('../controllers/vote')

module.exports = function (app) {
  app.route('/vote')
    .get(VoteContoller.home)
    .post(VoteContoller.vote)

  app.route('/vote/:voteData')
    .get(VoteContoller.vote)
}