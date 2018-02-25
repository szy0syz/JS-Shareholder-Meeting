const ReportContoller = require('../controllers/report')

module.exports = function (app) {
  app.route('/report').get(ReportContoller.index)
}