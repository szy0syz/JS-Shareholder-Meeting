const VoteContoller = require('../controllers/vote')

module.exports = function (app) {
  app.route('/vote')
    .get(VoteContoller.home)
    .post(VoteContoller.vote)

  app.route('/vote/:voteData')
    .get(VoteContoller.vote)

  // app.param('voteData', function (req, res, next, val, key) {
  //   req.params[key] = parseInt(val)
  //   if (isNaN(req.params[key])) {
  //     next(util.createError(400, 'failed to parseInt ' + key))
  //   } else {
  //     next()
  //   }
  // })
}